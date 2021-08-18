import '../styles/App.css'
import React from 'react';

export const AddPin = ({ toggle }) => {
  return (
    <div className ='toggleDropPin'>
      <form>
        <label>Drop pin</label>
        <input onClick={toggle} type='checkbox' value='Drop pin' className="add-pin"></input>
      </form>
    </div>
  )
}
