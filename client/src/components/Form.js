import React from "react";
import HikeDataService from '../services/hike.js'

export const Form = ({ setPins, pins, location, onAdd, setMarkers }) => {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [lng, setLng] = React.useState(location.lng);
  const [lat, setLat] = React.useState(location.lat);

  const addPin = async (pin) => {
   HikeDataService.createHike(pin)
    setPins([...pins, pin])
  }

  const onSubmit = (e) => {
    e.preventDefault();
    onAdd({ title, description, lng, lat })
    addPin({"title": title, "description": description, "lng": lng, "lat": lat})
    setTitle('')
    setLng('')
    setLat('')
    setDescription('')
    setMarkers([])
  }

  return (
    <form className="form" onSubmit={onSubmit} >
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css" integrity={`${process.env.FONT_AWESOME_CDN}`} crossorigin="anonymous" />

      <input required className="form-title" type ='text' name='title' placeholder='Enter title...' value={title} onChange={(e) => setTitle(e.target.value)}></input>
      <textarea required className="form-text-field" name ='description' id="description" type="text" rows="5"
        placeholder="Enter a description of your hike" value={description} onChange={(e) => setDescription(e.target.value)}>
      </textarea>

      <br />

      <div className="form-footer">

        <div className="form-logo-container">
          <label htmlFor="photo" className="form-footer-photo-label">
            Upload - 
            <div><i class="fas fa-camera fa-1x form-footer-logo"></i></div>
          </label>
          <input type="file" id="photo" style={{display: "none"}} />
        </div>

        <div className="form-submit-container">
          <button type="submit" className="btn form-submit">Submit</button>
        </div>

      </div>
    </form>
  )
}

export default Form
