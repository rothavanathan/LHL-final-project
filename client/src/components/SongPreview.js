import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { CardContent, CardMedia, IconButton, Typography, Grid, Button, Box } from '@material-ui/core';
import { SkipPrevious, PlayArrow, SkipNext } from '@material-ui/icons';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Link, Redirect } from "react-router-dom";
import NewProject from "./NewProject"



const useStyles = makeStyles((theme) => ({
  root: {

  },
  main: {
    marginBottom: 100
  },
  header: {
    marginTop: 20,
    marginBottom: 40,
    display: "flex",
    color: "var(--white)",
    alignItems: "center"
  },
  backArrow: {
    fontSize: "large",
    padding: 10,
    marginLeft: 10,
    // marginTop: 10
  },
  card: {
    minHeight: "70vh",
    width: "calc(100%-20)",
    marginLeft: 10,
    marginRight: 10,
    padding: 20,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: "center",
    backgroundColor: "var(--white)"

  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: "spacce-around",
    padding: 0
  },
  cover: {
    height: "auto",
    width: "95%",
    // margin: "auto"
  },
  controls: {
    selfAlign: "flex-end",
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),

    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  audio: {
    border: "2px solid rgb(80, 32, 28)",
    borderRadius: "10px"
  }
}));

export default function SongPreview(props) {
  const { trackName, previewUrl, artistName, artworkUrl100, trackId } = props.results;
  const classes = useStyles();
  const theme = useTheme();

  const handlePreview = () => {
    //do some stuff
    console.log(previewUrl);
  }

  const handleClick = () => {
    props.setSong({})
  }
  console.log(`artwork url is`, artworkUrl100)

  return (
    <div>
      <Box className={classes.main}>

        <header className={classes.header}>

          <ArrowBackIosIcon
            className={classes.backArrow}
            onClick={handleClick}
          >Back to Home
            </ArrowBackIosIcon>


          <Box className={classes.titleBox}>

            <Typography component="h1" variant="h5">
              Search
          </Typography>

          </Box>
        </header>

        <Grid item key={props.id} xs={12}>
          <Card className={classes.card}>

            <CardContent className={classes.content}>
              <CardMedia
                component="img"
                alt={`artwork for ${trackName}`}
                className={classes.cover}
                image={artworkUrl100}
              // title={trackName}
              // style={useStyles.media}
              />
              <Typography component="h2" variant="h5">
                {trackName}
              </Typography>
              <Typography component="h3" variant="subtitle1" color="textSecondary">
                {artistName}
              </Typography>
              {/* <div className={classes.controls}>
            <IconButton aria-label="previous">
            {theme.direction === 'rtl' ? <SkipNext /> : <SkipPrevious />}
            </IconButton>
            <IconButton aria-label="play/pause">
            <PlayArrow className={classes.playIcon} onClick={handlePreview} />
            </IconButton>
            <IconButton aria-label="next">
            {theme.direction === 'rtl' ? <SkipPrevious /> : <SkipNext />}
            </IconButton>
          </div> */}
              <CardMedia className={classes.audio}
                component="audio"
                image={previewUrl}
                title='title'
                controls
              />
            </CardContent>
          </Card >
        </Grid >
        <NewProject songId={trackId} user={props.user} />
      </Box>

    </div>
  );
}