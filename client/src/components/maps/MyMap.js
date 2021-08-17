import React from "react";
import "../../styles/App.css";
import mapStyle from '../../styles/mapStyle.js'
//import { Hikes } from '../Hikes.js'
import { Form } from '../Form.js'
import { Button } from '../Button.js'
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api"

const libraries =["places"]
const mapContainerStyle = {
  width: 'calc(100vw - 14.5px)', 
  height: 'calc(100vh - 69px)'
}

const center = {
  lat: 55.378052,
  lng: -3.435973
}

export const MyMap = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  })
  const [markers, setMarkers] = React.useState([])
  const [pins, setPins] = React.useState([])
  const [selected, setSelected] = React.useState(null)
  const [selectedHike, setSelectedHike] = React.useState(null)

  const fetchPins = async () => {
    const res = await fetch('http://localhost:3002/pins')
    const pins = await res.json()
    return pins
  }

  React.useEffect(() => {
    fetchPins().then(u => setPins(u))
  }, [])

  const onClickNewMarker = (event) => {
    setPins([])
    setMarkers(() => [
      {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
        time: new Date(),
      }
  
    ])
  }

  if (loadError) return "Error handling maps";
  if (!isLoaded) return "Loading Maps";

  const addNewPin = (pin) => {
    const id = Math.floor(Math.random() * 10000) + 1
    const newPin = { id, ...pins }
    setPins([...pins, newPin])
  }
  
  const clicked = () => {
    setTimeout(() => {
      setMarkers([])
     return () => {setSelected(null)}
    }, 100)
  }

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
      {pins.map((hike) => (
        <Marker
          key={ hike.id} 
          position={{ "lat": parseFloat(hike.lat), "lng": parseFloat(hike.lng) }} 
          icon={{
            url: "https://img.icons8.com/color/48/000000/camping-tent.png",
            scaledSize: new window.google.maps.Size(45,45),
            anchor: new window.google.maps.Point(20,20)
          }}
      
        onClick={() => {
          setSelectedHike(hike);
        }}
      />
      ))}

          <div className="hike-window">
          {selectedHike ? (
          <InfoWindow 
            position={{ "lat": parseFloat(selectedHike.lat), "lng": parseFloat(selectedHike.lng) }}
            onCloseClick={() => {setSelectedHike(null)}}
          >
            <div>
              <h1>Title - { selectedHike.title } </h1>
              <h2>Description - { selectedHike.description } </h2>
              <img src="https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/happy-campers-live-here-unknown.jpg" alt="" height="260px" width="250px"></img>
            </div>
          </InfoWindow>) : null }
          </div>

            {markers.map(marker => {
              return <Marker key={marker.time.toISOString()}
              position={{lat: marker.lat, lng: marker.lng}} 
              icon={{
                url: 'https://i.ibb.co/tCHT1g1/pin-my-hike-trial-0.png',
                scaledSize: new window.google.maps.Size(75,75),
                anchor: new window.google.maps.Point(35,60),
              }}
              onClick={() => {
                setSelected(marker);
              }}
            />
            })}
          
              <Button />
              {selected ? ( <div><Form pins={pins} setPins={setPins} onCloseClick={ clicked } onAdd={addNewPin} location={{lat: selected.lat, lng: selected.lng}} /></div> ) : null  }
            </GoogleMap>
            
  )
}
