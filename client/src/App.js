import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';
import Project from "./components/Project";
import Entry from "./components/Entry";
import Login from "./components/Login";
import Gear from "./components/Gear";
import Search from "./components/Search";
import Register from "./components/Register";
import Library from "./components/Library";
import Home from "./components/Home";
import Collection from "./components/Collection";

let theme = createMuiTheme({
  palette: {
    primary: {
      main: "rgb(245, 103, 93)",
    },
    secondary: {
      main: "rgb(244, 240, 234)",
    },
    layersWhite: {
      main: "rgb(244, 240, 234)",
    }
  },
  typography: {
    color: "var(--white)"
  },
});
theme = responsiveFontSizes(theme);


export default function App() {
  const userInStorage = useState(localStorage.getItem("user"));
  const [user, setUser] = useState(userInStorage ? userInStorage : null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const localUser = localStorage.getItem("user")
    setUser(localUser)
  }, [])
  useEffect(() => {
    localStorage.setItem("user", user)
  }, [user])

  return (

    <Router>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Switch>
            <Route path="/gear">
              <Gear isLoggedIn={user} setUser={setUser} />
            </Route>
            <Route path="/home">
              <Home isLoggedIn={user} refresh={refresh} setRefresh={setRefresh} />
            </Route>
            <Route path="/library">
              <Library isLoggedIn={user} />
            </Route>
            <Route path="/collection/:id">
              <Collection isLoggedIn={user} setRefresh={setRefresh} />
            </Route>
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
      </ThemeProvider>
    </Router>
  );
}
