import React from "react";
//import "./styles/App.css";
import { Hikes } from "./components/Hikes";
import { MyMap } from "./components/maps/MyMap.js";
<<<<<<< HEAD
import { Button } from "./components/Button.js";
//import { Form } from "./components/Form.js";

=======
import { Form } from "./components/Form.js";
import hikes from './dummyHikes.json'
>>>>>>> 3f3b58f850650e5b5e35275e279b2d506f82f9c2
require("dotenv").config();

export default function App() {

  return (
    <div className ='app'>
      <div className="title-overlay">
        <img className="PMH-logo" 
          src="https://i.ibb.co/mBJ38W9/pin-my-hike-logo-trial.png"
        />
      </div>
      
      <div className="maps-container">
        <MyMap hikes={hikes} />
      
      </div>
      <Hikes />
      <Button /> 
    </div>
  );
}

