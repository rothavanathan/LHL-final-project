import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import Nav from "./Nav";
import Results from "./Results";
import NewProject from "./NewProject";
import SongPreview from "./SongPreview";
import { Redirect } from "react-router-dom";
import { DialogTitle, TextField, Grid, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  }
}));

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
        axios.get(`api/content/search/${term.toLowerCase()}`)
          .then(data2 => {
            console.log(`data1 is: `, data1.data.results)
            console.log(`you hit the search content route. data2 is: `, data2.data)
            const response = []
            if (data2.data.length > 0) {
              const data2formatted = data2.data.map(entry => {
                return {
                  trackId: entry.id,
                  artistName: entry.artist,
                  artworkUrl100: entry.url_album_artwork,
                  trackName: entry.title,
                  collectionName: entry.album,
                  url_full_song_preview: entry.url_full_song_preview
                }
              })
              response.push(...data2formatted)
            }
            response.push(...data1.data.results)
            console.log(`response is `, response)
            setResults(response)
          })
          .catch(err => console.log(err))
      })
  }, [term])

  const handleChange = (event) => {
    setTerm(event.target.value)
  }

  // const { trackName, url_full_song_preview, artistName, artworkUrl100 } = results[0];
  // console.log("RESULTSSSSS: ", results)

  const songId = 1;
  const classes = useStyles();
  return isLoggedIn ? (
    <div>
      <h1>I AM Search</h1>
      <TextField variant="filled" value={term} onChange={handleChange} color="primary"></TextField>
      {/* <p>{results}</p> */}
      <NewProject songId={songId} user={isLoggedIn}/>
      <Container className={classes.cardGrid} maxWidth="md" id="projects">
        <Grid container spacing={4}>
          <Results results={results}></Results>
        </Grid>
      </Container>
      {/* const { thumbnail, title, previewTrack, artist } = props; */}
      { results.length > 0 && (<SongPreview results = {results[0]}/>) }
      <Nav />
    </div>
  ) : (
      <Redirect to="/" />
    );
}