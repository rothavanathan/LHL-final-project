import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { CardContent, CardMedia, Typography, Grid, Box, Container } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import NewProject from "./NewProject"

const useStyles = makeStyles((theme) => ({
  root: {

  },
  main: {
    marginBottom: 100
  },
  mainHeader: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    // paddingLeft: 20,
    // paddingRight: 40,
    marginTop: 40,
    // marginBottom: "1em",
  },
  headerGrid: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(5),
  },
  cardGrid: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(5),
  },
  backArrow: {
    fontSize: "large",
    paddingLeft: 5,
    paddingRight: 5,
    marginLeft: 10,
    "&:hover": {
      color: "var(--primary-color)",
    },
    "&:active": {
      color: "var(--primary-color)",
    },
  },
  card: {
    minHeight: "70vh",
    maxHeight: "90vh",
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
    justifyContent: "space-around",
    padding: 0
  },
  cover: {
    height: "auto",
    width: "90%",
    border: "2px solid rgba(80, 32, 28, 0.1)",
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
    border: "2px solid rgba(80, 32, 28, 0.1)",
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

  const handleClick = () => {
    props.setSong({})
  }

  return (
    <div>
      <Box className={classes.main}>
        <Container className={classes.headerGrid} maxWidth="md" id="header">

          <header className={classes.mainHeader}>

            <ArrowBackIosIcon
              className={classes.backArrow}
              onClick={handleClick}
            >Back to Home
            </ArrowBackIosIcon>

            <Box className={classes.titleBox}>

              <Typography component="h1" variant="h4">
                Search
          </Typography>

            </Box>
          </header>
        </Container>
        <Container className={classes.cardHeader} maxWidth="md" id="header">

          <Grid item key={props.id} xs={12} sm={9} lg={9}>
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
                <NewProject songId={trackId} defaultTitle={trackName} user={props.user} />
              </CardContent>
            </Card >
          </Grid >
        </Container>
      </Box>

    </div>
  );
}