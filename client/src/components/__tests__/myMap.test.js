import React from "react";
//import { render, screen, cleanup } from "@testing-library/react";
import { withScriptjs, withGoogleMap } from "react-google-maps";
import renderer from "react-test-renderer";
import MyMap from '../maps/MyMap'
const WrappedMap = withScriptjs(withGoogleMap(MyMap));

// afterEach(() => {
//   cleanup();
// });

test("should render the component", () => {
  const tree = renderer
    .create(<WrappedMap 
      googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${
        process.env.REACT_APP_MAPS_API_KEY
      }`} 
      loadingElement={<div style={{ height: "100%" }} />}
      containerElement={<div style={{ height: "100%" }} />}
      mapElement={<div style={{ height: "100%" }} />}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});