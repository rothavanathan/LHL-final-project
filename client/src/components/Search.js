import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from "./Nav";
import SideDrawer from "./SideDrawer";
import Results from "./Results";
import SongPreview from "./SongPreview";
import { TextField, Grid, Container, Typography, useMediaQuery } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useDebounce from "../hooks/useDebounce";

const useStyles = makeStyles((theme) => ({
  mainWindow: {
    width: "100%",
    margin: "auto"
  },
  mainHeader: {
    display: "flex",
    justifyContent: "space-between",
    // alignItems: "flex-end",
    width: "80%",
    // paddingLeft: 20,
    // paddingRight: 40,
    marginTop: 40,
    // marginRight: 40
  },
  cardHeader: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(5),
  },
  mainHeading: {
    marginRight: 40,
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
    width: "80%",
    position: 'relative',
    top: -12,
  },
  input: {
    color: "white"
  }
}));

export default function Search(props) {
  // const theme = useTheme();
  const matches = useMediaQuery('(min-width:960px)');

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
    <div style={{ display: "flex" }}>
      {matches && <SideDrawer />}

      <div className={classes.mainWindow}>
        <Container className={classes.cardHeader} maxWidth="md" id="header">

          <header className={classes.mainHeader}>

            <Typography
              className={classes.mainHeading}
              component="h1"
              variant="h4"
              color="var(--white)">
              Search
               </Typography>
            {matches && <TextField
              autoFocus
              variant="filled"
              value={term}
              onChange={handleChange}
              className={classes.searchBox}
              InputProps={{
                className: classes.input
              }} />}
          </header>

        </Container>
        {!matches && <TextField
          variant="filled"
          value={term}
          onChange={handleChange}
          className={classes.searchBox}
          InputProps={{
            className: classes.input
          }} />}
        <Container className={classes.cardGrid} maxWidth="md" id="results">
          <Grid container spacing={4}>
            <Results results={results} setSong={setIsSongSelected}></Results>
          </Grid>
        </Container>
      </div>
      {!matches && <Nav />}
    </div >
  ) : (
      <div style={{ display: "flex" }}>
        {matches && <SideDrawer />}
        <div className={classes.mainWindow}>
          <SongPreview results={isSongSelected} setSong={setIsSongSelected} user={isLoggedIn} />
        </div>
        {!matches && <Nav />}
      </div>
    )
}