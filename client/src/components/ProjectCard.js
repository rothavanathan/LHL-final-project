import React from "react";
import { Card, CardActions, CardActionArea, CardContent, CardMedia, Grid, Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";

import classnames from "classnames";

const useStyles = makeStyles((theme) => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: "all .25s linear",
    boxShadow: "none",
    '&:hover': {
      boxShadow: "-1px 10px 29px 0px rgb(245, 103, 93)"
   },
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
    flexGrow: 1,
  },
  cardContent: {
    flexGrow: 1,
    color: "black"
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
        {/* <CardActionArea href={props.link}> */}
        <Link to={props.link} >
          <CardMedia
            className={classes.cardMedia}
            image={props.thumbnail}
            title={props.title}
            style={useStyles.media}
          />
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="h5" component="h2">
              {props.title}
            </Typography>
            <Typography>
              {props.songTitle}
            </Typography>
            <Typography>
              {props.songArtist}
            </Typography>
          </CardContent>
        {/* </CardActionArea> */}
        </Link>
      </Card>
    </Grid>
  )
}
