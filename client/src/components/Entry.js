import { Link, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography, Box } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  mainBox: {
    maxWidth: "20em",
    margin: "auto",
  },
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

    fontFamily: "Noto Sans",
    marginTop: "2.5em",
  },

  heading2: {

    fontFamily: "Noto Sans",
    fontSize: 15,
    margin: "1.5em",

    textAlign: "center"
  },
  logButton: {
    fontFamily: "Noto Sans",
    display: "flex",
    background: "var(--primary-color)",
    width: "60%",
    margin: "1.5em",
  },

  back: {
    flexGrow: 1,
    display: "flex",
  },
}));
// maybe on rerender this page should clear cookies/local?
export default function Entry(props) {


  const classes = useStyles();

  return (
    <Box className={classes.mainBox}>

    <div className={classes.entryImage}>
      <Typography component="h1" variant="h2" className={classes.heading}>
        Layers

      </Typography>

      <Typography component="h2" variant="subtitle2" className={classes.heading2} texttAlign="left">

        With Layers you can isolate the parts of a track to teach or learn. Drums, guitar, vocals, or a combination of a few?
        
      </Typography>
      <Typography component="h2" variant="subtitle2" className={classes.heading2} fontStyle="oblique">
      It's really up to you.

    </Typography>
      
      
      <div className={classes.formDiv}>
        <Button to="/register" component={Link} className={classes.logButton}>
        Sign up
        </Button>

        <Button to="/login" component={Link} className={classes.logButton}>
        Login
        </Button>
      </div>
    </div >
    </Box>
  );
}

