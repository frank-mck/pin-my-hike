/* eslint-disable no-unused-vars */
import React from "react";
import Form from './Form.js'

export const Hikes = () => {
  const [pins, setPins] = React.useState([]);
  const [addPins, setAddPins] = React.useState(false);

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

  return (
    <div data-testid="hikes">
      
    </div>
  )
};
