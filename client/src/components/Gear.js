import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Nav from "./Nav";
import { FormControl, Button, Typography } from "@material-ui/core";

const notoFont = "'Noto Sans', sans-serif";
const useStyles = makeStyles((theme) => ({
  header: {
    marginTop: 20,
    marginBottom: 40,
    display: "flex",
    color: "var(--white)",
    alignItems: "center",
  },
  backArrow: {
    fontSize: "large",
    padding: 10,
    marginLeft: 10,
    marginTop: 10,
  },
  logButton: {
    fontFamily: notoFont,
    display: "flex",
    background: "var(--primary-color)",
    width: "60%",
    margin: "40px",
    color: "var(--white)",
  },
}));

export default function Gear(props) {
  const { isLoggedIn, setUser } = props;

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(`in handleSubmit. event is `, event);
    logoutUser();
  };

  const logoutUser = () => {
    axios
      .get("/api/users/logout")
      .then((res) => {
        // console.log(`user is logged out. check cookies to confirm!----------`, res);
        setUser(null);
        localStorage.clear();
      })
      .catch((err) => console.log(err));
  };

  const classes = useStyles();

  return isLoggedIn ? (
    <div>
      <header className={classes.header}>
        <Link to="/home">
          <ArrowBackIosIcon className={classes.backArrow}>
            Back to Home
          </ArrowBackIosIcon>
        </Link>
        <Typography component="h1" variant="h5">
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