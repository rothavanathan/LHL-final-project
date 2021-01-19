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


  //SEARCH QUERY
  useEffect(() => {
    axios({
      //gets fill data from itunes
      method: 'get',
      url: `https://itunes.apple.com/search?term=${term.toLowerCase()}&country=CA&media=music&entity=song`
    })
      //gets our actual db data
      .then(data1 => {
        axios.get(`api/content/${term.toLowerCase}`)
          .then(data2 => {
            // console.log(`data1 is: `, data1.data.results)
            console.log(`data2 is: `, data1.data.results)

            const response = { ...data1, ...data2 }
            setResults(data1.data.results)
          })
          .catch(err => console.log(err))
      })
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