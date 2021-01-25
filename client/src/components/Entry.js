import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography, Box } from "@material-ui/core";
import logo from "../public/LAYERS_crop.png";

const useStyles = makeStyles((theme) => ({
  mainBox: {
    maxWidth: "20em",
    margin: "auto",
  },
  formDiv: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "50%",
  },

  heading: {
    marginTop: "2.5em",
    marginBottom: "0.5em",
  },

  heading2: {
    fontSize: 15,
    margin: "1.5em",

    textAlign: "center",
  },
  logButton: {
    display: "flex",
    background: "var(--primary-color)",
    width: "60%",
    margin: "1.5em",
    "&:hover": {
      backgroundColor: "var(--white)",
      color: "var(--black)",
    },
    "&:active": {
      backgroundColor: "var(--quad-color)",
    },
  },

  back: {
    flexGrow: 1,
    display: "flex",
  },
  homeImg: {
    marginTop: "6em",
    width: "14em",
    height: "14em",
  },
}));

export default function Entry(props) {
  const classes = useStyles();

  return (
    <Box className={classes.mainBox}>
      <img src={logo} className={classes.homeImg} alt="Layers logo" />

      <Typography
        component="h2"
        variant="subtitle2"
        className={classes.heading2}
        texttAlign="left"
      >
        With Layers you can isolate the parts of a track to teach or learn.
        Drums, guitar, vocals, or a combination of a few?
      </Typography>
      <Typography
        component="h2"
        variant="subtitle2"
        className={classes.heading2}
        fontStyle="oblique"
      >
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
    </Box>
  );
}
