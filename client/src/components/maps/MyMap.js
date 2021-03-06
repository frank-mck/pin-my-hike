import React from "react";
import "../../styles/App.css";
import { AddPin } from "../AddPin.js";
import { Form } from "../Form.js";
import { Button } from "./Button.js";
import { Confirmation } from "../Confirmation.js";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import mapStyle from "../../styles/mapStyle.js";
import HikeDataService from "../../services/hike.js";
import Search from "./Search";

const libraries = ["places"];

const mapContainerStyle = {
  width: "calc(100vw )",
  height: "calc(100vh)",
};

export const MyMap = () => {
  const [markers, setMarkers] = React.useState([]);
  const [latitude, setLatitude] = React.useState(
    markers.length === 0 ? parseFloat(55.378052) : markers.map((n) => n.lat)
  );
  const [longitude, setLongitude] = React.useState(
    markers.length === 0 ? parseFloat(-3.435973) : markers.map((n) => n.lng)
  );
  const [zoom, setZoom] = React.useState(8);
  const [pins, setPins] = React.useState([]);
  const [selected, setSelected] = React.useState(null);
  const [selectedHike, setSelectedHike] = React.useState(null);
  const [dropPin, setDropPin] = React.useState(false);
  const [current, setCurrent] = React.useState([]);

  // Zooming into the user's location

  function zoomIn(value) {
    setZoom(value);
  }

  // Takes in lat and lng to set the user's position

  function positionSetter(latitude, longitude) {
    setLatitude(latitude);
    setLongitude(longitude);
  }

  // Getting coordinates from Browser, permission will be asked and needs to be granted

  function getCoordinates() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          positionSetter(position.coords.latitude, position.coords.longitude);
          resolve(position);
        });
      } else {
        reject(alert("Geolocation has not been enabled in this browser."));
      }
    });
  }

  // Function to push the recieved coordinates into the markers array
  // the promise resolves the zoomIn function

  function processCoordinates(response) {
    return new Promise((resolve, reject) => {
      setCurrent((current) => [
        {
          lat: response.coords.latitude,
          lng: response.coords.longitude,
          time: new Date(),
        },
      ]);
      resolve(zoomIn(15));
    });
  }

  // This function is activated when the button "Pin My Hike" is pressed,
  // and it initiates the process of getting the coordinates,
  //  to then push them into the markers array

  async function getPosition() {
    try {
      const response = await getCoordinates();
      await processCoordinates(response);
    } catch (err) {
      console.log(err);
    }
  }
  const mapRef = React.useRef();

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  // Loads API key and any additional libraries.

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  // Fetches all pins from the DB.

  React.useEffect(() => {
    fetchPins();
  }, []);

  const fetchPins = () => {
    HikeDataService.getAll()
      .then((response) => {
        setPins(response.data.hikes);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // Sets Marker position based off the click event on the map.

  const onClickNewMarker = (event) => {
    if (dropPin === true) {
      setMarkers(() => [
        {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
          time: new Date(),
        },
      ]);
    } else {
      return null;
    }
  };

  // Toggle enables user to drop a pin on the map.

  const toggle = () => {
    setTimeout(() => {
      setDropPin(() => setDropPin(!dropPin));
    }, 10);
    if (dropPin) setMarkers([]);
  };

  if (loadError) return "Error handling maps";
  if (!isLoaded) return "Loading Maps";

  const addNewPin = (pin) => {
    const id = Math.floor(Math.random() * 10000) + 1;
    const newPin = { id, ...pins };
    setPins([...pins, newPin]);
    setSelected(null);
  };

  // Initializes Google map with preset values.

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={zoom}
      center={{ lat: latitude, lng: longitude }}
      options={{
        styles: mapStyle,
        disableDefaultUI: true,
        zoomControl: true,
        minZoom: 4,
        maxZoom: 28,
      }}
      onClick={onClickNewMarker}
    >
      {pins.map((hike) => (
        // Maps hikes, setting their position based off lat and lng stored in DB.

        <Marker
          key={hike._id}
          position={{ lat: hike.lat, lng: hike.lng }}
          icon={{
            url: "https://img.icons8.com/color/48/000000/camping-tent.png",
            scaledSize: new window.google.maps.Size(45, 45),
            anchor: new window.google.maps.Point(20, 20),
          }}
          onClick={() => {
            setSelectedHike(hike);
          }}
        />
      ))}

      <div>
        <Search
          lat={latitude}
          lng={longitude}
          positionSetter={positionSetter}
          zoomIn={zoomIn}
        />
      </div>

      <div>
        {selectedHike ? (
          // InfoWindow to display each hikes attributes.

          <InfoWindow
            className="info-window"
            position={{
              lat: parseFloat(selectedHike.lat),
              lng: parseFloat(selectedHike.lng),
            }}
            onCloseClick={() => {
              setSelectedHike(null);
            }}
          >
            <div className="pin-description">
              <h2> {selectedHike.title} </h2>
              <p> {selectedHike.description} </p>

              {selectedHike.image ? (
                <div>
                  <img
                    src={selectedHike.image}
                    alt=""
                    height="260px"
                    width="250px"
                  ></img>
                </div>
              ) : (
                <div>
                  <img
                    src="https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"
                    alt=""
                    height="260px"
                    width="250px"
                  ></img>
                </div>
              )}
            </div>
          </InfoWindow>
        ) : null}
      </div>

      {markers.map((marker) => {
        return (
          <Marker
            key={marker.time.toISOString()}
            position={{ lat: marker.lat, lng: marker.lng }}
            icon={{
              url: "https://i.ibb.co/jk3HWvB/pin-my-hike-trial.png",
              scaledSize: new window.google.maps.Size(75, 75),
              anchor: new window.google.maps.Point(35, 60),
            }}
          />
        );
      })}

      {current.map((marker) => {
        return (
          <Marker
            key={marker.time.toISOString()}
            className="button-container"
            position={{ lat: marker.lat, lng: marker.lng }}
            zoom={zoom}
            icon={{
              url: "https://image.flaticon.com/icons/png/512/4985/4985836.png",
              scaledSize: new window.google.maps.Size(45, 45),
              anchor: new window.google.maps.Point(20, 45),
            }}
          />
        );
      })}

      {selected ? (
        <div>
          <Form
            setSelected={setSelected}
            pins={pins}
            setPins={setPins}
            onAdd={addNewPin}
            setMarkers={setMarkers}
            location={{ lat: selected.lat, lng: selected.lng }}
          />
        </div>
      ) : null}

      <Button getPosition={getPosition} />

      <AddPin toggle={toggle} />
      {markers.length > 0 && (
        <Confirmation
          toggle={toggle}
          setMarkers={setMarkers}
          confirm={() => setSelected(markers[0])}
        />
      )}
    </GoogleMap>
  );
};