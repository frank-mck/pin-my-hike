import React from "react";
//import "./styles/App.css";
import { Hikes } from "./components/Hikes";
import { MyMap } from "./components/maps/MyMap.js";
import { Form } from "./components/Form.js";

require("dotenv").config();

export default function App() {

  return (
    <div className ='app'>
      <h1>Pin My Hike</h1> 
      <div className="maps-container">
        <MyMap />
      </div>
      <Form location={"53.374378, -1.711401"} />
      <Hikes />  
    </div>
  );
}

