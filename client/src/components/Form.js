import React from "react";

export const Form = ({ location, onAdd }) => {
  const [pins, setPins] = React.useState([]);
  const [addPins, setAddPins] = React.useState([]);
  const [text, setText] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [lng, setLng] = React.useState(location.lng);
  const [lat, setLat] = React.useState(location.lat);

  React.useEffect(() => {
    const getPins = async () => {
      const pinsFromServer = await fetchPins()
      setPins(pinsFromServer)
    }
    getPins();
  }, []);

  React.useEffect(() => {
    fetchPins().then(u => setPins(u))
  }, [])

  const fetchPins = async () => {
    const res = await fetch('http://localhost:3002/pins')
    const pins = await res.json()
    return pins
  }

  const addPin = async (pin) => {
    const res = await fetch('http://localhost:3002/pins', { 
      method: 'POST', 
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(pin)
    })
    const data = await res.json()

    setAddPins([...addPins, data])
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
      <button type="submit" className="btn">Submit</button>
    </form>
  )
}

export default Form
