import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import Nav from "./Nav";
import Results from "./Results";
import NewProject from "./NewProject";
import NewCollection from "./NewCollection";
import SongPreview from "./SongPreview";
import { Redirect } from "react-router-dom";
import { TextField, Grid, Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import useDebounce from "../hooks/useDebounce";
import { TextFormatTwoTone } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  mainHeader: {
    display: "flex",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 40,
    marginTop: 40,
    marginBottom: 40
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },

  searchBox: {
    color: "white",
    backgroundColor: "var(--black)",
    border: "none",
    borderBottom: "var(--tertiary-color) 2px solid",
    width: "80%"
  },
  input: {
    color: "white"
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
            //construct 600x600 URL from artworkURL100
            const hiResItunes = data1.data.results.map(entry => {
              const newURL = entry.artworkUrl100.replace('100x100bb.jpg', '600x600bb.jpg')
              entry.artworkUrl100 = newURL
              return entry;

            })
            console.log(hiResItunes)

            response.push(...hiResItunes)
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

  const classes = useStyles();
  return !isSongSelected.trackName ? (
    <div>
      <header className={classes.mainHeader}>
        <Typography
          component="h1"
          variant="h4"
          color="var(--white)">
          Search
          </Typography>
      </header>
      <TextField
        variant="filled"
        value={term}
        onChange={handleChange}
        className={classes.searchBox}
        InputProps={{
          className: classes.input
        }} />
      <Container className={classes.cardGrid} maxWidth="md" id="projects">
        <Grid container spacing={4}>
          <Results results={results} setSong={setIsSongSelected}></Results>
        </Grid>
      </Container>
      <Nav />
    </div >
  ) : (
      <div>
        <SongPreview results={isSongSelected} setSong={setIsSongSelected} user={isLoggedIn} />
        <Nav />
      </div>
    )
}