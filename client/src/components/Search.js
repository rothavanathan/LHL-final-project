import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import Nav from "./Nav";
import Results from "./Results";
import NewProject from "./NewProject";
import NewCollection from "./NewCollection";
import SongPreview from "./SongPreview";
import { Redirect } from "react-router-dom";
import { DialogTitle, TextField, Grid, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import useDebounce from "../hooks/useDebounce";
import { TextFormatTwoTone } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },

  searchBox: {
    color: "white",
    backgroundColor: "#1a1a1a",
    border: "none",
    borderBottom: "var(--tertiary-color) 4px solid",
    width: "80%"
  }
}));

export default function Search(props) {
  const { isLoggedIn } = props;
  const [term, setTerm] = useState("");
  const [results, setResults] = useState([]);
  const [isSongSelected, setIsSongSelected] = useState({});
  const [isSearching, setIsSearching] = useState(false);

  const debouncedSearchTerm = useDebounce(term, 200);

  useEffect(
    () => {
      // Make sure we have a value (user has entered something in input)
      if (debouncedSearchTerm) {
        setIsSearching(true);
        // setTerm(term)
      }
    }, [debouncedSearchTerm]);


  //SEARCH QUERY
  useEffect(() => {
    axios({
      //gets fill data from itunes
      method: 'get',
      url: `https://itunes.apple.com/search?term=${term.toLowerCase()}&country=CA&media=music&entity=song`
    })
      //gets our actual db data
      .catch(err => console.log(err))
      .then(data1 => {
        axios.get(`api/content/search/${term.toLowerCase()}`)
          .then(data2 => {
            // console.log(`data1 is: `, data1.data.results)
            // console.log(`you hit the search content route. data2 is: `, data2.data)
            const response = []
            if (data2.data.length > 0) {
              const data2formatted = data2.data.map(entry => {
                return {
                  trackId: entry.id,
                  artistName: entry.artist,
                  artworkUrl100: entry.url_album_artwork,
                  trackName: entry.title,
                  collectionName: entry.album,
                  previewUrl: entry.url_full_song_preview
                }
              })
              response.push(...data2formatted)
            }
            response.push(...data1.data.results)
            setResults(response);
            //once we have results
            setIsSearching(false);
          })
          .catch(err => console.log(err))
      })
  }, [debouncedSearchTerm])

  const handleChange = (event) => {
    setTerm(event.target.value)
  }

  // console.log("RESULTS------------", results)

  // const { trackName, url_full_song_preview, artistName, artworkUrl100 } = results[0];
  // console.log("RESULTSSSSS: ", results)

  // const songId = 1;
  const classes = useStyles();
  return !isSongSelected.trackName ? (
    <div>
      <h1>Search</h1>
      <TextField variant="filled" value={term} onChange={handleChange} className={classes.searchBox} />
      {/* <p>{results}</p> */}
      {/* <NewProject songId={songId} user={isLoggedIn} /> */}
      {/* <NewCollection songId={songId} user={isLoggedIn} /> */}
      <Container className={classes.cardGrid} maxWidth="md" id="projects">
        <Grid container spacing={4}>
          <Results results={results} setSong={setIsSongSelected}></Results>
        </Grid>
      </Container>
      {/* const { thumbnail, title, previewTrack, artist } = props; */}

      <Nav />
    </div >
  ) : (
      <div>
        <SongPreview results={isSongSelected} setSong={setIsSongSelected} user={isLoggedIn} />
        <Nav />
      </div>

    )
}