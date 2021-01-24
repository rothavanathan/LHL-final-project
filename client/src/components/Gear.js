import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Nav from "./Nav";
import { FormControl, Button, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  header: {
    marginTop: 40,
    marginBottom: 40,
    display: "flex",
    color: "var(--white)",
    alignItems: "center",
  },
  backArrow: {
    fontSize: "large",
    paddingLeft: 10,
    paddingRight: 5,
    marginLeft: 10,
    // marginTop: 10,
  },
  logButton: {
    display: "flex",
    background: "var(--primary-color)",
    width: "10em",
    margin: "40px",
    color: "var(--white)",
    "&:hover": {
      backgroundColor: "var(--white)",
      color: "var(--black)",
    },
  },
}));

export default function Gear(props) {
  const { isLoggedIn, setUser } = props;
  const classes = useStyles();

  const handleSubmit = (event) => {
    event.preventDefault();
    logoutUser();
  };

  const logoutUser = () => {
    axios
      .get("/api/users/logout")
      .then((res) => {
        setUser(null);
        localStorage.clear();
      })
      .catch((err) => console.log(err));
  };

  return isLoggedIn ? (
    <div>
      <header className={classes.header}>
        <Link to="/home">
          <ArrowBackIosIcon className={classes.backArrow}>
            Back to Home
          </ArrowBackIosIcon>
        </Link>
        <Typography component="h1" variant="h4">
          Settings
        </Typography>
      </header>

      <FormControl className={classes.passwordInput}>
        <form onSubmit={handleSubmit}>
          <Button className={classes.logButton} type="submit">
            Logout
          </Button>
        </form>
      </FormControl>

      <Nav />
    </div>
  ) : (
      <Redirect to="/" />
    );
}