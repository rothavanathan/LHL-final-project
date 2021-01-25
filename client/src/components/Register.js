import { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { FormControl, Button, Typography, Box } from "@material-ui/core";
import RegError from "./RegError"

const useStyles = makeStyles((theme) => ({
  mainBox: {
    maxWidth: "20em",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  main: {
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "center",
  },
  heading: {
    marginTop: "2.5em",
    marginBottom: "0.5em"
  },
  heading2: {
    marginBottom: "1em"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: "24em",
  },
  formControl: {
    width: "100%",
    maxWidth: "16em",
  },
  inputText: {
    color: "var(--white)",
    backgroundColor: "var(--black)",
    border: "none",
    borderBottom: "var(--tertiary-color) 2px solid",
    marginTop: "20px",
    marginBottom: "20px",
    outline: "none",
    alignSelf: "center",
    width: "100%",
    fontSize: "15px",
  },
  input: {
    color: "var(--white)",
  },
  regButton: {
    display: "flex",
    background: "var(--primary-color)",
    width: "60%",
    marginTop: "30px",
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
      color: "var(--primary-color)",
    },
    "&:active": {
      color: "var(--primary-color)",
    },
  },
  subtitle1: {
    fontStyle: "oblique",
  }
}));

export default function Register(props) {
  const { setUser, isLoggedIn } = props;
  const [nameData, setNameData] = useState("");
  const [emailData, setEmailData] = useState("");
  const [passwordData, setPasswordData] = useState("");
  const [open, setOpen] = useState(false);
  const [passError, setPassError] = useState("");
  const [emailError, setEmailError] = useState("");
  const classes = useStyles();

  const saveUser = () => {
    axios
      .post("/api/users", {
        first_name: nameData,
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
          Welcome!
        </Typography>

      </div>

      <RegError
        open={open}
        setOpen={setOpen}
        handleErrorOpen={handleErrorOpen}
        handleErrorClosed={handleErrorClosed}
        emailError={emailError}
        passError={passError}
      />
      <Typography component="h2" variant="subtitle2" className={classes.heading2} texttAlign="left">
        Let's get you signed up
      </Typography>

      <form
        autocomplete="off"
        className={classes.form}
        onSubmit={handleSubmit}
      >
        <FormControl className={classes.formControl}>
          <input
            className={classes.inputText}
            onChange={handleName}
            type="first_name"
            value={nameData}
            name="first_name"
            placeholder="Beethoven? Drake? Is that you?"
            aria-label="first_name"
          ></input>
        </FormControl>
        <FormControl className={classes.formControl}>
          <input
            className={classes.inputText}
            value={emailData}
            onChange={handleEmail}
            type="email"
            name="email"
            placeholder="example@gmail.com"
            aria-label="email"
          ></input>
        </FormControl>
        <FormControl className={classes.formControl}>
          <input
            className={classes.inputText}
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
        <Typography component="subtitle1"
          className={classes.subtitle1}
        >
          Already registered? Login here
        </Typography>
      </Link>

    </Box>
  ) : (
      <Redirect to="/home" />
    );
}
