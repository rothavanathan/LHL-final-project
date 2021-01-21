import { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { FormControl, Button } from "@material-ui/core";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';


export default function Register(props) {
  const { setUser, isLoggedIn } = props;
  const [nameData, setNameData] = useState("");
  const [emailData, setEmailData] = useState("");
  const [passwordData, setPasswordData] = useState("");

  const saveUser = () => {
    axios
      .post("/api/users", {
        first_name: nameData,
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
    console.log(`in handleSubmit. event is `, event);
    saveUser();
  };

  const handleName = (event) => {
    setNameData(event.target.value);
  };

  const handleEmail = (event) => {
    setEmailData(event.target.value);
  };

  const handlePassword = (event) => {
    setPasswordData(event.target.value);
  };

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

    name: {
      width: "80%",
      color: "white",
      display: "flex",
      flexDirection: "column",
    },
    
    nameText: {
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

    regButton: {
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
      
      <div className={classes.main}>
          <Link to="/entry">
            <ArrowBackIosIcon>
            </ArrowBackIosIcon>
          </Link>      
          <h1 className={classes.main}>Welcome!</h1>
      </div>

      <h2 className={classes.heading2}>Let's get you signed up</h2>

      <div className={classes.formDiv}>
        <form
          autocomplete="off"
          className={classes.form}
          onSubmit={handleSubmit}
        >
          <FormControl className={classes.emailInput}>
            <input
              className={classes.nameText}
              onChange={handleName}
              type="first_name"
              value={nameData}
              name="first_name"
              placeholder="Beethoven? Drake? Is that you?"
              aria-label="first_name"
            ></input>
          </FormControl>
          <FormControl className={classes.emailInput}>
            <input
              className={classes.emailText}
              value={emailData}
              onChange={handleEmail}
              type="email"
              name="email"
              placeholder="example@gmail.com"
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
              placeholder="Password... is not a great password"
              aria-label="password"
            ></input>
          </FormControl>

          <Button className={classes.regButton} type="submit">
            Sign up
          </Button>
        </form>

        <Link to="/login" className={classes.regLink}>
          <href className={classes.regLink}>
            Already registered? Login here
          </href>
        </Link>
      </div>
    </div>
  ) : (
    <Redirect to="/home" />
  );
}