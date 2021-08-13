

export const Form = ({ location }) => {
  return (
    <div className="form">
      <form action ='http://localhost:3002/hike' method ='POST'>
      <input style={{display: "none"}} type="text" name="location" id="location" value={`${location.lat} ${location.lng}`} />
      <br />
      <input type ='text' name='title' placeholder='Enter title...'></input>
      <textarea name ='description' id="description" type="text" cols="40" rows="5"
        placeholder="Enter a description of your hike" className="text-field">
      </textarea>
      <br />
      <label htmlFor="photo">Upload a photo</label>
      <input id="photo" className="btn" type="file" accept="image/png, image/jpeg" />
      <br />
      <button type="submit" className="btn">Submit</button>
      </form>
    </div>
  )
}

export default Form


