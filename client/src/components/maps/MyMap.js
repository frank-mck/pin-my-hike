import React from "react";
import "../../styles/App.css";
import mapStyle from '../../styles/mapStyle.js'
import { Hikes } from '../Hikes.js'
import { Form } from '../Form.js'
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api"
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
  const [selected, setSelected] = React.useState(null)

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
           position={{lat: marker.lat, lng: marker.lng}} 
           title={'hello world'}
           icon={{
            url: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Map_pin_icon_green.svg',
            scaledSize: new window.google.maps.Size(30,30),
            anchor: new window.google.maps.Point(15,15)
          }}
          onClick={() => {
            setSelected(marker);
          }}
          
           />
          }
        )}
          {selected ? (
          <InfoWindow position={{lat: selected.lat, lng: selected.lng}}>
            <div>
              <h2>Hiker Spotted</h2>
              
                <Form location={{lat: selected.lat, lng: selected.lng}} />
                
              <Hikes />
            </div>
          </InfoWindow>) : null }
        </GoogleMap>
  )
}