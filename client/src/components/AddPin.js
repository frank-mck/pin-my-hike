import '../styles/App.css'
import React from 'react';

export const AddPin = ({ toggle }) => {
  return (
    <div className ='toggleDropPin'>
      <form>
        <label>Pin Hike</label>
        <input  onClick={toggle} type='checkbox' value='Pin location' className="add-pin "></input>
      </form>
    </div>
  )
}
