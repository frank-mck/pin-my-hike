import { useEffect, useState } from "react";
import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps";
require('dotenv').config();



function MyMap() {
  return (
  <GoogleMap 
  defaultZoom={6}
  defaultCenter={{ lat: 55.378052, lng: -3.435973 }} 
  />
  )
}

const WrappedMap = withScriptjs(withGoogleMap(MyMap));


function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message)
      ).catch(error => console.log(error));
  }, []);


  return (
    <div className="App">
        <p>{!data ? "Loading..." : data}</p>

        <div className="mapps-container" 
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