import React from "react";
import "./styles/App.css";
import { Hikes } from "./components/Hikes";
import { withScriptjs, withGoogleMap } from "react-google-maps";
import MyMap from "./components/maps/MyMap";
const WrappedMap = withScriptjs(withGoogleMap(MyMap));
require("dotenv").config();

function App() {
  return (
    <div className ='app'>
      <div className="maps-container">
        <WrappedMap
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_MAPS_API_KEY}`}
          loadingElement={<div style={{ height: "100%" }} />}
          containerElement={<div style={{ height: "100%" }} />}
          mapElement={<div style={{ height: "100%" }} />}
        />
      </div>
      <Hikes />     
    </div>
  );
}

export default App;

// style={{ width: '80vw', height: '80vh', borderStyle: 'solid'}}
