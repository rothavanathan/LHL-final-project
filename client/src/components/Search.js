import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import Nav from "./Nav";
import Results from "./Results";
import { Redirect } from "react-router-dom";
import { TextField } from '@material-ui/core';



export default function Search(props) {
  const { isLoggedIn } = props;
  const [term, setTerm] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios({
      method: 'get',
      url: `https://itunes.apple.com/search?term=${term.toLowerCase()}&country=CA&media=music&entity=song`
    })
      .then(response => {
        // console.log(response.data.results)
        setResults(response.data.results)
      })
      .catch(err => console.log(err))
  }, [term])

  const handleChange = (event) => {
    setTerm(event.target.value)
  }

  return isLoggedIn ? (
    <div>
      <h1>I AM Search</h1>
      <TextField variant="filled" value={term} onChange={handleChange} color="primary"></TextField>
      {/* <p>{results}</p> */}
      <Results results={results}></Results>
      <Nav />
    </div>
  ) : (
      <Redirect to="/" />
    );
}