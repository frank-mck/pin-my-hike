import React from "react";

export const Form = ({ setPins, pins, location, onAdd, setMarkers }) => {
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
    setMarkers([])
  }

  return (
    <div className="form" onSubmit={onSubmit} >
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css" integrity={`${process.env.FONT_AWESOME_CDN}`} crossorigin="anonymous" />
      <form action ='http://localhost:3002/pins' method ='POST'>
        <input style={{display: "none"}} type="text" name="lng" id="location" value={`${location.lng}`} />
        <input style={{display: "none"}} type="text" name="lat" id="location" value={`${location.lat}`} />
        <input required type ='text' name='title' className="form-title" placeholder='Enter title...' value={text} onChange={(e) => setText(e.target.value)}></input>
        <br />
        <textarea required name="description" id="description" type="text" cols="40" rows="5"
          placeholder="Enter a description of your hike" className="form-text-field" value={description} onChange={(e) => setDescription(e.target.value)}>
        </textarea>
        <br />
        <label htmlFor="photo" className="form-photo-label">
          <div><a><i class="fas fa-camera fa-3x form-logo"></i></a></div>
        </label>
      <button type="submit" className="btn form-submit">Submit</button>
    </form>
  )
}

export default Form
