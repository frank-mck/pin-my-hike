import React from "react";

export const Form = ({ setPins, pins, location, onAdd, onCloseClick }) => {
  const [text, setText] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [lng, setLng] = React.useState(location.lng);
  const [lat, setLat] = React.useState(location.lat);

  const addPin = async (pin) => {
    const res = await fetch('http://localhost:3002/pins', { 
      method: 'POST', 
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(pin)
    })
    const data = await res.json()

    setPins([...pins, data])
  }

  const onSubmit = (e) => {
    e.preventDefault();
    onAdd({ text, description, lng, lat })
    addPin({"text": text, "description": description, "lng": lng, "lat": lat})
    setText('')
    setLng('')
    setLat('')
    setDescription('')
  }

  return (
    <form className="form" onSubmit={onSubmit} >
      <br />
      <input required type ='text' name='title' placeholder='Enter title...' value={text} onChange={(e) => setText(e.target.value)}></input>
      <textarea required name ='description' id="description" type="text" cols="40" rows="5"
        placeholder="Enter a description of your hike" className="text-field" value={description} onChange={(e) => setDescription(e.target.value)}>
      </textarea>
      <br />
      <label htmlFor="photo">Upload a photo</label>
      <input id="photo" className="btn" type="file" accept="image/png, image/jpeg" />
      <br />
      <button type="submit" className="btn" onCloseClick={onCloseClick} >Submit</button>
    </form>
  )
}

export default Form
