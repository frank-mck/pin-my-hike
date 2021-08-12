/* eslint-disable no-unused-vars */
import React from "react";

export const Hikes = () => {
  const [pins, setPins] = React.useState([]);

  React.useEffect(() => {
    const getPins = async () => {
      const pinsFromServer = await fetchPins()
      setPins(pinsFromServer)
    }
    getPins();
  }, []);

  const fetchPins = async () => {
    const res = await fetch('http://localhost:3002/location')
    const pins = await res.json()

    return pins
  }
  return (
    <div>
      {pins.name}
    </div>
  )

};
