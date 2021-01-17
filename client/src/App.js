import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";


import Player from "./components/Player";

// hardcoded track data
// const oldtracks = [
//   {
//     id: 0,
//     title: "Guitar",
//     url:
//       "https://rykabrown.com/wp-content/uploads/2021/01/BURIAL-GROUND_guitar_main.mp3",
//   },
//   {
//     id: 1,
//     title: "DRUMS",
//     url:
//       "https://rykabrown.com/wp-content/uploads/2021/01/BURIAL_GROUND_drums.mp3",
//   },
//   {
//     id: 2,
//     title: "LEAD VOCALS",
//     url:
//       "https://rykabrown.com/wp-content/uploads/2021/01/BURIAL-GROUND_lead_vocal.mp3",
//   },
//   {
//     id: 2,
//     title: "BASS",
//     url:
//       "https://rykabrown.com/wp-content/uploads/2021/01/BURIAL_GROUND_bass.mp3",
//   },
// ];



export default function App() {
  const [tracks, setTracks] = useState([])

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/stems`)
      .then((res) => {
        // console.log(`from get request`, res.data.stems)
        setTracks(res.data.stems)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <div className="App">

      <Player tracks={tracks} />
      <br />

    </div>
  );
}
