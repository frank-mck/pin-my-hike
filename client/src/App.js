import React from "react";
import "./styles/App.css";
import { Hikes } from "./components/Hikes";
import { MyMap } from "./components/maps/MyMap.js";

require("dotenv").config();

export default function App() {

  return (
    <div className ='app'>
      <div className="maps-container">
        <MyMap />
      </div>
      <Hikes />     
    </div>
  );
}

