import React, { useState } from "react";
import "./App.css";


import Player from "./components/Player";

// const url = "https://www.mfiles.co.uk/mp3-downloads/gs-cd-track2.mp3";

const tracks = [
  {
    id: 0,
    title: "Guitar",
    url:
      "https://rykabrown.com/wp-content/uploads/2021/01/BURIAL-GROUND_guitar_main.mp3",
  },
  {
    id: 1,
    title: "DRUMS",
    url:
      "https://rykabrown.com/wp-content/uploads/2021/01/BURIAL_GROUND_drums.mp3",
  },
  {
    id: 2,
    title: "LEAD VOCALS",
    url:
      "https://rykabrown.com/wp-content/uploads/2021/01/BURIAL-GROUND_lead_vocal.mp3",
  },
  {
    id: 2,
    title: "BASS",
    url:
      "https://rykabrown.com/wp-content/uploads/2021/01/BURIAL_GROUND_bass.mp3",
  },
];

export default function App() {
  return (
    <div className="App">

      <Player tracks={tracks} />
      <br />

    </div>
  );
}
