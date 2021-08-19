import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
  ComboboxOptionText,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

function Search({ lat, lng, positionSetter, zoomIn }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => lat, lng: () => lng },
      radius: 200 * 1000,
    },
  });

  return (
    <div className="search">
      <script
        src="https://kit.fontawesome.com/1fc4ea1c6a.js"
        crossorigin="anonymous"
      />
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.15.4/css/all.css"
        integrity={`${process.env.FONT_AWESOME_CDN}`}
        crossorigin="anonymous"
      />
      <Combobox
        className="search-box"
        onSelect={async (address) => {
          setValue(address, false);
          clearSuggestions();
          try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            positionSetter(lat, lng);
            zoomIn(10);
          } catch (error) {
            console.log(error);
          }
          console.log(address);
        }}
      >
        <button class="btn-search">
          <i class="fas fa-search"></i>
        </button>

        <ComboboxInput
          className="input-search"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          disabled={!ready}
          placeholder="Enter an address"
        />
        <ComboboxPopover portal={false}>
          {data.length > 0 ? (
            <ComboboxList className="search-results">
              {status === "OK" &&
                data.map(({ id, description }) => (
                  <ComboboxOption key={id} value={description} />
                ))}
            </ComboboxList>
          ) : (
            <p
              style={{
                margin: 0,
                color: "#454545",
                padding: "0.25rem 1rem 0.75rem 1rem",
                fontStyle: "italic",
              }}
            >
              No results
            </p>
          )}
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}

export default Search;
