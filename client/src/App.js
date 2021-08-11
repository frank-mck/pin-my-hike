import { withScriptjs, withGoogleMap } from "react-google-maps";
import MyMap from './components/maps/MyMap'
const WrappedMap = withScriptjs(withGoogleMap(MyMap));
require('dotenv').config();
import React from "react";
import "./App.css";

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{!data ? "Loading..." : data}</p>

        <div className="maps-container" 
        style={{
        width: '80vw', 
        height: '80vh',
        borderStyle: 'solid'}}>

        <WrappedMap 
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${
          process.env.REACT_APP_MAPS_API_KEY
        }`} 
        loadingElement={<div style={{ height: "100%" }} />}
        containerElement={<div style={{ height: "100%" }} />}
        mapElement={<div style={{ height: "100%" }} />}


        />
        </div>
    </div>

  );
}



export default App;