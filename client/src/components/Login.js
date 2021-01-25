import { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { FormControl, Button, Typography, Box } from "@material-ui/core";
import LoginError from "./LoginError"

const useStyles = makeStyles((theme) => ({
  mainBox: {
    maxWidth: "20em",
    margin: "auto",
  },
  main: {
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "center",
  },
  backArrow: {
    fontSize: 20,
    paddingLeft: 10,
    "&:hover": {
      color: "var(--primary-color)",
    },
    "&:active": {
      color: "var(--primary-color)",
    },
  },
  heading: {
    marginTop: "2.5em",
    marginBottom: "0.5em"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "50%",
  },
  inputText: {
    color: "var(--white)",
    display: "flex",
    backgroundColor: "var(--black)",
    border: "none",
    borderBottom: "var(--tertiary-color) 2px solid",
    marginTop: "30px",
    outline: "none",
    alignSelf: "center",
    width: "16em",
    fontSize: "15px",
  },
  logButton: {
    display: "flex",
    background: "var(--primary-color)",
    width: "60%",
    marginTop: "40px",
    marginBottom: "40px",
    color: "var(--white)",
    "&:hover": {
      backgroundColor: "var(--white)",
      color: "black"

    },
    "&:active": {
      backgroundColor: "var(--quad-color)",
    },
  },

  back: {
    flexGrow: 1,
    display: "flex",
  },
  regLink: {
    textDecoration: "none",
    "&:hover": {
      color: "var(--primary-color)"

    },
    "&:active": {
      color: "var(--primary-color)",
    },
  },
  subtitle1: {
    fontStyle: "oblique",
  }
}));

export default function Login(props) {
  const { setUser, isLoggedIn } = props;
  const [emailData, setEmailData] = useState("");
  const [passwordData, setPasswordData] = useState("");
  const [open, setOpen] = useState(false);
  const [passError, setPassError] = useState("");
  const [emailError, setEmailError] = useState("");
  const classes = useStyles();

  const loginUser = () => {
    axios
      .post("/api/users/login", {
        email: emailData,
        password: passwordData,
      })
      .then((res) => {
        if (res.data.userId) {
          setUser(res.data.userId);
        } else {
          setEmailError(res.data) || setPassError(res.data)
          setOpen(true)
          setTimeout(function () { setOpen(false); }, 2000);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    loginUser();
  };

  const handleEmail = (event) => {
    setEmailData(event.target.value);
  };

  const handlePassword = (event) => {
    setPasswordData(event.target.value);
  };

  const handleErrorOpen = () => {
    setOpen(true);
  };

  const handleErrorClosed = () => {
    setOpen(false);
  };

  return !isLoggedIn ? (
    <Box className={classes.mainBox}>

      <div className={classes.main}>

        <Typography
          component="h1"
          variant="h2"
          className={classes.heading}
        >
          You're Back!
        </Typography>

        <LoginError
          open={open}
          setOpen={setOpen}
          handleErrorOpen={handleErrorOpen}
          handleErrorClosed={handleErrorClosed}
          emailError={emailError}
          passError={passError}
        />
      </div>
      <Typography component="h2" variant="subtitle2" className={classes.heading2} texttAlign="left">
        Let's get you logged in
      </Typography>

      <div className={classes.formDiv}>
        <form className={classes.form} onSubmit={handleSubmit}>
          <FormControl >
            <input
              className={classes.inputText}
              value={emailData}
              onChange={handleEmail}
              type="email"
              name="email"
              placeholder="Email"
              aria-label="email"
            ></input>
          </FormControl>

          <FormControl>
            <input
              className={classes.inputText}
              value={passwordData}
              onChange={handlePassword}
              type="password"
              name="password"
              placeholder="Password"
              aria-label="password"
            ></input>
          </FormControl>

          <Button className={classes.logButton} type="submit">
            Login
          </Button>
        </form>
        <Link to="/register" className={classes.regLink}>
          <Typography component="subtitle1"
            className={classes.subtitle1}
          >
            Don't have an account? Register here
          </Typography>

        </Link>
      </div>
    </Box>
  ) : (
      <Redirect to="/home" />
    );
}