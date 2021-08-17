import React from "react";

export const Form = ({ location }) => {
  return (
    <div className="form">
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css" integrity={`${process.env.FONT_AWESOME_CDN}`} crossorigin="anonymous" />
      <form action ='http://localhost:3002/pins' method ='POST'>
        <input style={{display: "none"}} type="text" name="lng" id="location" value={`${location.lng}`} />
        <input style={{display: "none"}} type="text" name="lat" id="location" value={`${location.lat}`} />
        <input type ='text' name='title' className="form-title" placeholder='Enter title...'></input>
        <br />
        <textarea name ='description' id="description" type="text" cols="40" rows="5"
          placeholder="Enter a description of your hike" className="form-text-field">
        </textarea>
        <br />
        <label htmlFor="photo" className="form-photo-label">
          <div><a><i class="fas fa-camera fa-3x form-upload-image"></i></a></div>
        </label>
        <input id="photo" className="btn form-photo-button" type="file" accept="image/png, image/jpeg" 
          style={{display: "none"}}/>
        <br />
        <button type="submit" className="btn form-submit">Submit</button>
      </form>
    </div>
  )
}

export default Form
