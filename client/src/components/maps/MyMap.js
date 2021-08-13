import React from "react";
import "../../styles/App.css";
import mapStyle from '../../styles/mapStyle.js'
import { Hikes } from '../Hikes.js'
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api"
import * as hikeData from '../../dummyHikes.json'

//const Hikes = require('./../models/hikes')
//import { fomatRelative } from "date-fns";

console.log(hikeData)


const libraries =["places"]
const mapContainerStyle = {
  width: '100vw', 
  height: '100vh'
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
  const [hikes, setHikes] = React.useState([])
  const [markers, setMarkers] = React.useState([])
  const [selected, setSelected] = React.useState(null)

  const onClickNewMarker = (event) => {
    setMarkers((current) => [
      ...current,
      {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
        time: new Date(),
      }
    ])
  }

  if (loadError) return "Error handling maps";
  if (!isLoaded) return "Loading Maps";

  // const savePinAndRedirect = (path) => {
  //   return async (req, res) => {
  //     let hike = req.hike
  //     markers.map(mark => {
  //       hike.location = mark.lat
  //       hike.location = mark.lng
  //     })
  //     try {
  //       hike = await hike.save()
  //       res.redirect(`/hikes`)
  //     } catch (e) {
  //       res.render(`hikes/${path}`, { hike: hike })
  //     }
  //   }
  // }

console.log(markers)
  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={8}
      center={center}
      options={{ 
        styles: mapStyle,
        disableDefaultUI: true,
        zoomControl: true,
       }}
      onClick={onClickNewMarker}
      >

      {hikeData.hikes.map((hikes) => (
      
      <Marker 
      key={hikes.id} 
      position={hikes.location} 
      >
      </Marker>
      
      ))}

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
          <InfoWindow position={{lat: selected.lat, lng: selected.lng}}
          onCloseClick={() => {setSelected(null)}}
          >
            <div>
              <h2>Hiker Spotted</h2>

              <p>Spotted {(selected.title)}</p>

              <Hikes />

            </div>
          </InfoWindow>) : null }
        </GoogleMap>
  )
}