import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";
import "./App.css";

import Project from "./components/Project";
import Entry from "./components/Entry";
import Login from "./components/Login";
import Gear from "./components/Gear";
import Search from "./components/Search";
import Register from "./components/Register";
import Library from "./components/Library";
import Home from "./components/Home";
import Collection from "./components/Collection";

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
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/stems`)
      .then((res) => {
        // console.log(`from get request`, res.data.stems)
        setTracks(res.data.stems);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/gear">
            <Gear />
          </Route>
          <Route path="/library">
            <Library />
          </Route>
          <Route path="/collection">
            <Collection />
          </Route>
          <Route path="/search">
            <Search />
          </Route>
          <Route path="/project">
            <Project tracks={tracks} />
          </Route>
          <Route path="/">
            <Entry />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
