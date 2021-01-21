import React from "react";
import { Card, CardActions, CardContent, CardMedia, Grid, Typography, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import classnames from "classnames";

const useStyles = makeStyles((theme) => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: "all .25s linear",
    boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.4)",
    '&:hover': {
      boxShadow: "-1px 10px 29px 0px rgba(0,0,0,0.8)"
   },
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
    flexGrow: 1
  },
  cardContent: {
    flexGrow: 1
  },
}));

export default function Album(props) {
  // const albumInfoClass = classnames("album__info", {
  //   "album__info--explicit": props.collectionExplicitness === "explicit"
  // });


  const handleClick = () => {

  }

  const classes = useStyles();
  return (
    <Grid item key={props.key} xs={6} sm={6} md={4} className={classes.card} >
      <Card className={classes.card} onClick={handleClick}>
        <CardMedia
          className={classes.cardMedia}
          image={props.artworkUrl100}
          title={props.trackName}
          style={useStyles.media}
        />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h2">
            {props.trackName}
          </Typography>
          <Typography>
            {props.artistName}
          </Typography>
          <Typography>
            {props.collectionName}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  )
}
