import React from "react";
import "./styles/App.css";
import { MyMap } from "./components/maps/MyMap.js";
import { Logo } from "./components/Logo.js";
require("dotenv").config();

export default function App() {
  return (
    <div className="app">
      <div className="title-overlay">
        <Logo />
      </div>

      <div className="maps-container">
        <MyMap />
      </div>
    </div>
  );
}
