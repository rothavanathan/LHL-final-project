import { Card, CardContent, CardMedia, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: "all .15s linear",
    background: "rgb(3, 3, 3)",
    backgroundImage: `url("https://www.transparenttextures.com/patterns/otis-redding.png")`,
    boxShadow: "0px 2px 2px 0px rgba(244, 240, 234, 0.4)",
    opacity: 0.9,
    '&:hover': {
      boxShadow: "2px 3px 4px 1px rgba(244, 240, 234, 0.5)",
      opacity: 1.0,

    }
  },
  cardMedia: {
    paddingTop: '56.25%',
    flexGrow: 1,
    backgroundColor: "var(--black)",
  },
  cardContent: {
    flexGrow: 1,
    color: "var(--white)",
    fontSize: ".6rem"
  },
  cardText: {
    fontSize: ".75rem"
  },
  link: {
    textDecoration: "none"
  }
}));

export default function Album(props) {
  const handleClick = () => {

  }

  const classes = useStyles();
  return (
    <Grid item key={props.key} xs={6} sm={6} md={4} >
      <Card className={classes.card} onClick={handleClick}>
        <Link to={props.link} className={classes.link}>
          <CardMedia
            className={classes.cardMedia}
            image={props.thumbnail}
            title={props.title}
            style={useStyles.media}
          />
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom component="h2">
              {props.title}
            </Typography>
            <Typography className={classes.cardText}>
              {props.songTitle}
            </Typography>
            <Typography className={classes.cardText}>
              {props.songArtist}
            </Typography>
          </CardContent>
        </Link>
      </Card>
    </Grid>
  )
}
