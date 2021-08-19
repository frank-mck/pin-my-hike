import '../styles/App.css'
import React from 'react';

export const Confirmation = ({ confirm, setMarkers, toggle }) => {
  const closeConfirm = () => {
    setMarkers([])
  }

  return (
    <section className='confirm-window'>
      <div className ='confirmation'>
        <h2>Drop it?</h2>
        <div>
          <button onClick={confirm}  onChange={closeConfirm}>Yes</button>
          <button onChange={toggle} onClick={closeConfirm}>No</button>
        </div>
      </div>
    </section>
  )
}