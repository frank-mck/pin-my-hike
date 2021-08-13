import React from "react";
//import "./styles/App.css";
import { Hikes } from "./components/Hikes";
import { MyMap } from "./components/maps/MyMap.js";
import { Button } from "./components/Button.js";
//import { Form } from "./components/Form.js";

require("dotenv").config();

export default function App() {

  return (
    <div className ='app'>
      <h1>Pin My Hike</h1> 
      <div className="maps-container">
        <MyMap />
      </div>
      <Hikes />
      <Button /> 
    </div>
  );
}

