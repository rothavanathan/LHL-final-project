import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { CardContent, CardMedia, Typography, Grid, Box } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
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
    border: "2px solid var(--tertiary-color)",
    borderRadius: "10px",
    marginTop: ".75em"
  },
  h2: {
    paddingTop: ".75em"
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
              />
              <Typography className={classes.h2} component="h2" variant="h5">
                {trackName}
              </Typography>
              <Typography component="h3" variant="subtitle1" color="textSecondary">
                {artistName}
              </Typography>

              <CardMedia className={classes.audio}
                component="audio"
                image={previewUrl}
                title='title'
                controls
              />
              <NewProject songId={trackId} user={props.user} />
            </CardContent>
          </Card >
        </Grid >
      </Box>

    </div>
  );
}