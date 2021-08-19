import '../styles/App.css'

export const Logo = () => {
  return (
    <div className ='logo' >
      <div className ='logo-img'><img src ='https://i.ibb.co/74nnLy7/pin-my-hike-trial.png' alt ='logo'></img></div>
      <svg width="0" height="0">
        <defs>
          <clipPath id="myCurve" clipPathUnits="objectBoundingBox">
            <path d="M 0,1
                    L 0,0
                    L 1,0
                    L 1,1
                    C .45 1, .60 .5, 0 1
                    Z" />
          </clipPath>
        </defs>
     </svg>
     
      <div className ='logo-text'>
        <h1>PIN MY HIKE</h1>
        <span>Don't follow the crowd. Follow the pin!</span>
      </div>
    </div>
  )
}
