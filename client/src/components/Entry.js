import { Link, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

// maybe on rerender this page should clear cookies/local?
export default function Entry(props) {
  const useStyles = makeStyles((theme) => ({
    entryImage: {
      backgroundImage: `url(${"https://unsplash.com/photos/MEL-jJnm7RQ"})`,
    },

    formDiv: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
      height: "50%",
    },

    heading: {
      color: "antiquewhite",
      fontFamily: "Noto Sans",
      margin: "50px",
    },

    heading2: {
      color: "antiquewhite",
      fontFamily: "Noto Sans",
      fontSize: 15,
      margin: "40px",
    },

    logButton: {
      fontFamily: "Noto Sans",
      display: "flex",
      background: "rgb(245, 103, 93)",
      width: "60%",
      margin: "25px",
      color: "antiquewhite",
    },

    back: {
      flexGrow: 1,
      display: "flex",
    },
  }));

  const classes = useStyles();

  return (
    <div className={classes.entryImage}>

      <h1 className={classes.heading}>Layers</h1>

      <h2 className={classes.heading2}>
        With Layers you can isolate the parts of a track to teach or learn.
        Drums, guitar, vocals, or a combination of a few? It's really up to you.
      </h2>

      <div className={classes.formDiv}>
        <Button to="/register" component={Link} className={classes.logButton}>
          Sign up
        </Button>

        <Button to="/login" component={Link} className={classes.logButton}>
          Login
        </Button>
      </div>
    </div>
  );
}

