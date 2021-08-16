import React, { useEffect, useState } from "react";
import "../../styles/App.css";
import mapStyle from "../../styles/mapStyle.js";
import { Hikes } from "../Hikes.js";
import { Form } from "../Form.js";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
//import * as hikeData from '../../dummyHikes.json'

//const Hikes = require('./../models/hikes')
//import { fomatRelative } from "date-fns";

const libraries = ["places"];
const mapContainerStyle = {
  width: "100vw",
  height: "100vh",
};

// const center = {
//   lat: 55.378052,
//   lng: -3.435973,
// };

export const MyMap = () => {
  const [latitude, setLatitude] = useState({});
  const [longitude, setLongitude] = useState({});

  function getPosition() {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
      console.log(longitude);
      console.log(latitude);
    });
  }

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  const [markers, setMarkers] = React.useState([]);
  const [pins, setPins] = React.useState([]);
  const [selected, setSelected] = React.useState(null);
  const [selectedHike, setSelectedHike] = React.useState(null);

  const fetchPins = async () => {
    const res = await fetch("http://localhost:3002/pins");
    const pins = await res.json();
    return pins;
  };

  React.useEffect(() => {
    fetchPins().then((u) => setPins(u));
  }, []);

  const onClickNewMarker = (event) => {
    setMarkers((current) => [
      ...current,
      {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
        time: new Date(),
      },
    ]);
  };

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

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={8}
      center={{ lat: latitude, lng: longitude }}
      options={{
        styles: mapStyle,
        disableDefaultUI: true,
        zoomControl: true,
      }}
      onClick={onClickNewMarker}
    >
      {pins.map((hike) => (
        <Marker
          key={hike.id}
          position={{ lat: parseFloat(hike.lat), lng: parseFloat(hike.lng) }}
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

      {selectedHike ? (
        <InfoWindow
          position={{
            lat: parseFloat(selectedHike.lat),
            lng: parseFloat(selectedHike.lng),
          }}
          onCloseClick={() => {
            setSelectedHike(null);
          }}
        >
          <div>
            <h1>Title - {selectedHike.title} </h1>
            <h2>Description - {selectedHike.description} </h2>
            <img
              src="https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/happy-campers-live-here-unknown.jpg"
              alt=""
              height="500px"
              width="400px"
            ></img>
          </div>
        </InfoWindow>
      ) : null}

      {markers.map((marker) => {
        return (
          <Marker
            key={marker.time.toISOString()}
            position={{ lat: marker.lat, lng: marker.lng }}
            icon={{
              url: "https://i.ibb.co/tCHT1g1/pin-my-hike-trial-0.png",
              scaledSize: new window.google.maps.Size(75, 75),
              anchor: new window.google.maps.Point(35, 60),
            }}
            onClick={() => {
              setSelected(marker);
            }}
          />
        );
      })}

      {selected ? (
        <InfoWindow
          position={{ lat: selected.lat, lng: selected.lng }}
          onCloseClick={() => {
            setSelected(null);
          }}
        >
          <div>
            <h2>Hiker Spotted</h2>

            <Form location={{ lat: selected.lat, lng: selected.lng }} />

            <Hikes />
          </div>
        </InfoWindow>
      ) : null}
      <button className="button" onClick={getPosition}>
        Pin my hike
      </button>
    </GoogleMap>
  );
};
