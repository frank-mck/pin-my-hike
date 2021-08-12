import React from "react";
import "../../styles/App.css";
import mapStyle from '../../styles/mapStyle.js'
import { GoogleMap, useLoadScript, Marker, /*InfoWindow*/ } from "@react-google-maps/api"
//const Hikes = require('./../models/hikes')
//import { fomatRelative } from "date-fns";

const libraries =["places"]
const mapContainerStyle = {
  width: '80vw', 
  height: '80vh'
}
const center = {
  lat: 55.378052,
  lng: -3.435973
}

export const MyMap = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsapiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  })
  const [markers, setMarkers] = React.useState([])

  if (loadError) return "Error handling maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={8}
      center={center}
      defaultOptions={{ styles: mapStyle }}
      onClick={(event) => {
        setMarkers((current) => [
          ...current,
          {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
            time: new Date(),
          }
        ])
      }}
      >
        {markers.map(marker => {
          return <Marker key={marker.time.toISOString()}
           position ={{lat: marker.lat, lng: marker.lng}} 
           title={'hello world'}
           />
          }
        )}
        
    </GoogleMap>
  )
}