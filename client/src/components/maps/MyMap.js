import React from "react";
import "../../styles/App.css";
import { AddPin } from '../AddPin.js'
import { Form } from '../Form.js'
import { Confirmation } from '../Confirmation.js'
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api"
import mapStyle from "../../styles/mapStyle.js";
import HikeDataService from '../../services/hike.js'
const libraries = ["places"];

const mapContainerStyle = {
  width: 'calc(100vw )', 
  height: 'calc(100vh)'
}

export const MyMap = () => {
  const [latitude, setLatitude] = React.useState(55.378052);
  const [longitude, setLongitude] = React.useState(-3.435973);
  const [markers, setMarkers] = React.useState([]);
  const [pins, setPins] = React.useState([]);
  const [selected, setSelected] = React.useState(null);
  const [selectedHike, setSelectedHike] = React.useState(null);
  const [dropPin, setDropPin] = React.useState(false);

  // Getting coordinates from Browser, permission will be asked and needs to be granted

  function getCoordinates() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          resolve(position);
        });
      } else {
        reject(alert("Geolocation has not been enabled in this browser."));
      }
    });
  }

  // Function to push the recieved coordinates into the markers array

  function processCoordinates(response) {
    return new Promise((resolve, reject) => {
      setMarkers((current) => [
        {
          lat: response.coords.latitude,
          lng: response.coords.longitude,
          time: new Date(),
        },
      ]);
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

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  React.useEffect(() => {
    fetchPins();
  }, [])

  const fetchPins = () => {
     HikeDataService.getAll()
      .then(response => {
        setPins(response.data.hikes);  
      })
      .catch(e => {
        console.log(e);
      });
  }


  const onClickNewMarker = (event) => {
      if (dropPin === true) {
        setMarkers(() => [
          {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
            time: new Date(),
          }
        ])
    } else {
      return null;
    }
  }

  const toggle = () => {
    setTimeout(() => {
      setDropPin(() => setDropPin(!dropPin))
    }, 10)
    if (dropPin) setMarkers([])
  }

  if (loadError) return "Error handling maps";
  if (!isLoaded) return "Loading Maps";

  const addNewPin = (pin) => {
    const id = Math.floor(Math.random() * 10000) + 1
    const newPin = { id, ...pins }
    setPins([...pins, newPin])
    setSelected(null)
  }

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={8}
      center={{ lat: latitude, lng: longitude }}
      options={{
        styles: mapStyle,
        disableDefaultUI: true,
        zoomControl: true,
        minZoom: 4,
        maxZoom: 18,
       }}
        onClick={onClickNewMarker}
      >
      
      {pins.map((hike) => (
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
          {selectedHike ? (
          <InfoWindow
            position={{ "lat": parseFloat(selectedHike.lat), "lng": parseFloat(selectedHike.lng) }}
            onCloseClick={() => {setSelectedHike(null)}}
          >

            <div className ='pin-description'>
              <h2>Title - { selectedHike.title } </h2>
              <p>Description - { selectedHike.description } </p>
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
              
            />
            })}

              {selected ? ( <div><Form setSelected={setSelected} pins={pins} setPins={setPins} onAdd={addNewPin}
               setMarkers={setMarkers} location={{lat: selected.lat, lng: selected.lng}} /></div> ) : null  }

               <button className="button" onClick={getPosition}></button>
               {/* <input type='checkbox' value='Drop pin' onClick={toggle} className="add-pin"></input> */}
               <AddPin toggle={toggle} />
                { markers.length > 0 && <Confirmation toggle={toggle} setMarkers={setMarkers} confirm={() => setSelected(markers[0])}  />}
            </GoogleMap>
            
  )
}

