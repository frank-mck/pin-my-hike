import React from "react";
import HikeDataService from '../services/hike.js'

export const Form = ({ setPins, pins, location, onAdd, setMarkers }) => {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [lng, setLng] = React.useState(location.lng);
  const [lat, setLat] = React.useState(location.lat);
  const [image, setImage] = React.useState("");

  const addPin = async (pin) => {
   HikeDataService.createHike(pin)
    setPins([...pins, pin])
  }

  const onSubmit = (e) => {
    e.preventDefault();
    onAdd({ title, description, lng, lat, image })
    addPin({"title": title, "description": description, "lng": lng, "lat": lat, "image": image })
    setTitle('')
    setLng('')
    setLat('')
    setDescription('')
    setImage('')
    setMarkers([])
  }

  return (
    <form className="form" encType="multipart/form-data" onSubmit={onSubmit} >
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css" integrity={`${process.env.FONT_AWESOME_CDN}`} crossorigin="anonymous" />
      <input required className="form-title" type ='text' name='title' placeholder='Enter title...' value={title} onChange={(e) => setTitle(e.target.value)}></input>
      <textarea required className="form-text-field" name ='description' id="description" type="text" cols="40" rows="5"
        placeholder="Enter a description of your hike" value={description} onChange={(e) => setDescription(e.target.value)}>
      </textarea>
      <br />
      <label htmlFor="photo" className="form-photo-label">
        <input type="file" name="image" accept="image/*" onChange={(e) => setImage(e.target.value)}></input>
        console.log(image)
        <div><i class="fas fa-camera fa-3x form-upload-image"></i></div>
      </label>
      <button type="submit" className="btn form-submit">Submit</button>
    </form>
  )
}

export default Form
