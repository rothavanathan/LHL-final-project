import { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { FormControl, Button } from "@material-ui/core";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import LoginError from "./LoginError"

const useStyles = makeStyles((theme) => ({
  main: {
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "center",
    color: "antiquewhite",
    fontFamily: "Noto Sans",
    margin: "20px",

  },

  heading2: {
    color: "antiquewhite",
    fontFamily: "Noto Sans",
    fontSize: 15,
    margin: "30px",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "50%",
  },

  email: {
    width: "80%",
    color: "white",
    display: "flex",
    flexDirection: "column",
  },

  emailText: {
    color: "var(--white)",
    display: "flex",
    backgroundColor: "var(--black)",
    border: "none",
    borderBottom: "var(--tertiary-color) 4px solid",
    backgroundImage: `url(${"https://www.transparenttextures.com/patterns/otis-redding.png"})`,
    margin: "30px",
    outline: "none",
    alignSelf: "center",
    width: "100%",
    fontSize: "15px",
  },

  password: {
    width: "80%",
    color: "white",
    display: "flex",
    flexDirection: "column",
  },

  passwordText: {
    color: "var(--white)",
    display: "flex",
    backgroundColor: "var(--black)",
    border: "none",
    borderBottom: "var(--tertiary-color) 4px solid",
    backgroundImage: `url(${"https://www.transparenttextures.com/patterns/otis-redding.png"})`,
    margin: "30px",
    outline: "none",
    width: "100%",
    alignSelf: "center",
    fontSize: "15px",
  },

  logButton: {
    fontFamily: "Noto Sans",
    display: "flex",
    background: "var(--primary-color)",
    width: "60%",
    margin: "40px",
    color: "var(--white)",
  },

  back: {
    flexGrow: 1,
    display: "flex",
  },

  regLink: {
    color: "antiquewhite",
    textDecoration: "none",
  },
}));


export default function Login(props) {
  const { setUser, isLoggedIn } = props;
  const [emailData, setEmailData] = useState("");
  const [passwordData, setPasswordData] = useState("");
  const [open, setOpen] = useState(false);
  const [passError, setPassError] = useState("")
  const [emailError, setEmailError] = useState("")
  const classes = useStyles();

  const loginUser = () => {
    axios
      .post("/api/users/login", {
        email: emailData,
        password: passwordData,
      })
      .then((res) => {
        if (res.data === "that email doesn't exist" || "incorrect password") {
          console.log("FIND ERROR----------->", res.data)
          setEmailError(res.data)
          setOpen(true)
          setTimeout(function(){ setOpen(false); }, 2000);
        }
        setUser(res.data.userId);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(`Event has been submitted from form-control----> `, event);
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
    <div>
      <div className={classes.main}>
        <Link to="/entry">
          <ArrowBackIosIcon>
          </ArrowBackIosIcon>
        </Link>
        <h1 className={classes.main}>Welcome Back!</h1>

      <LoginError
        open={open}
        setOpen={setOpen}
        handleErrorOpen={handleErrorOpen}
        handleErrorOpen={handleErrorClosed}
        emailError={emailError}
        passError={passError}

      />
      </div>

      <h2 className={classes.heading2}>Let's get you logged in</h2>

      <div className={classes.formDiv}>
        <form className={classes.form} onSubmit={handleSubmit}>
          <FormControl className={classes.emailInput}>
            <input
              className={classes.emailText}
              value={emailData}
              onChange={handleEmail}
              type="email"
              name="email"
              placeholder="Email"
              aria-label="email"
            ></input>
          </FormControl>

          <FormControl className={classes.passwordInput}>
            <input
              className={classes.passwordText}
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
          <href className={classes.regLink}>
            Don't have an account? Register here
          </href>
        </Link>
      </div>
    </div>
  ) : (
      <Redirect to="/home" />
    );
}
