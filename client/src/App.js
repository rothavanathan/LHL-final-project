import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom";
// import UserInfo from '../UserInfo';
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
import SongPreview from "./components/SongPreview"

export default function App() {
  const [tracks, setTracks] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const localUser = localStorage.getItem("user") || null
    setUser(localUser)
  }, [])
  // instead of local, have use effect thatt uses on mount to send axios req to backend
  useEffect(() => {
    localStorage.setItem("user", user)
  }, [user])

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/home">
            <Home isLoggedIn={user} />
          </Route>
          <Route path="/gear">
            <Gear isLoggedIn={user} setUser={setUser} />
          </Route>
          <Route path="/library">
            <Library isLoggedIn={user} />
          </Route>
          <Route path="/collection">
            <Collection isLoggedIn={user} />
          </Route>
          {/* <Route path="/song">
            <SongPreview isLoggedIn={user} />
          </Route> */}
          <Route path="/search">
            <Search isLoggedIn={user} />
          </Route>
          <Route path="/project/:id">
            <Project isLoggedIn={user} />
          </Route>
          <Route path="/login">
            <Login isLoggedIn={user} setUser={setUser} />
          </Route>
          <Route path="/register">
            <Register isLoggedIn={user} setUser={setUser} />
          </Route>
          <Route path="/">
            <Entry />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

// routing system that usee state