import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { CardContent, CardMedia, IconButton, Typography, Grid, Button } from '@material-ui/core';
import { SkipPrevious, PlayArrow, SkipNext } from '@material-ui/icons';
import { Link, Redirect } from "react-router-dom";
import NewProject from "./NewProject"


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
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

  return (
    <Grid item key={props.id} xs={12}>
      <Card className={classes.root}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <CardMedia
              className={classes.cover}
              image={artworkUrl100}
              title={trackName}
            />
            <Typography component="h5" variant="h5">
              {trackName}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {artistName}
            </Typography>
          </CardContent>
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
          <CardMedia
            component="audio"
            image={previewUrl}
            title='title'
            controls
          />
        </div>
        <button class="btn-btn danger" onClick={handleClick}>Cancel</button>

        <NewProject songId={trackId} user={props.user} />

      </Card >
    </Grid >
  );
}