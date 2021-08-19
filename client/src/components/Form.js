import React from "react";
import HikeDataService from '../services/hike.js'

export const Form = ({ setPins, pins, location, onAdd, setMarkers, setSelected }) => {
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
    addPin({"title": title, "description": description, "lng": lng, "lat": lat, "image": image})
    setTitle('')
    setLng('')
    setLat('')
    setDescription('')
    setImage('')
    setMarkers([])
  }

  const close = (e) => {
    setMarkers([])
    setSelected(null)
  }

  return (
    <body>
      <form className="form" onSubmit={onSubmit} >
        <header>
          <img alt ='hiking logo' src ='https://image.flaticon.com/icons/png/512/3373/3373903.png'></img>
          <h2>Add your pin</h2>
          <button className='close-btn' onClick={close}></button>
        </header>
        
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css" integrity={`${process.env.FONT_AWESOME_CDN}`} crossorigin="anonymous" />

        <input  className="form-title" type ='text' name='title' placeholder='Enter title...' value={title} onChange={(e) => setTitle(e.target.value)}></input>
        <textarea  className="form-text-field" name ='description' id="description" type="text" rows="5"
          placeholder="Enter description for location, distance ect." value={description} onChange={(e) => setDescription(e.target.value)}>
        </textarea>
        <input  className="form-title" type ='text' name='image' placeholder='Enter an image URL' value={image} onChange={(e) => setImage(e.target.value)}></input>
        <br />

        <div className="form-footer">
          <div className="form-footer-submit-container">
            <button type="submit" className="btn form-submit">Submit</button>
          </div>

        </div>
      </form>
    </body>
  )
}

export default Form
