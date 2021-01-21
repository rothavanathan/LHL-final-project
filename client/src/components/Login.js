import { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { FormControl, Button } from "@material-ui/core";

export default function Login(props) {
  const { setUser, isLoggedIn } = props;
  const [emailData, setEmailData] = useState("");
  const [passwordData, setPasswordData] = useState("");

  const loginUser = () => {
    axios
      .post("/api/users/login", {
        email: emailData,
        password: passwordData,
      })
      .then((res) => {
        setUser(res.data.userId);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Event has been submitted from form-control----> `, event);
    loginUser();
  };

  const handleEmail = (event) => {
    setEmailData(event.target.value);
  };

  const handlePassword = (event) => {
    setPasswordData(event.target.value);
  };

  const useStyles = makeStyles((theme) => ({
    formDiv: {
      height: "60%",
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
      color: "white",
      display: "flex",
      backgroundColor: " #000821",
      border: "none",
      borderBottom: " #3b2c13 4px solid",
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
      color: "white",
      display: "flex",
      backgroundColor: " #000821",
      border: "none",
      borderBottom: " #3b2c13 4px solid",
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
      background: "#044a10",
      width: "60%",
      margin: "40px",
      color: "antiquewhite",
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

  const classes = useStyles();

  return !isLoggedIn ? (
    <div>
      <h1 className={classes.heading}>Look who's back</h1>
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
