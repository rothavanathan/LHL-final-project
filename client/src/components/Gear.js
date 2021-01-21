import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Nav from "./Nav";
import { FormControl, Button } from "@material-ui/core";

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
        // console.log(`user is logged out. check cookies to confirm!`);
        setUser(null);
        localStorage.clear();
      })
      .catch((err) => console.log(err));
  };

  const useStyles = makeStyles((theme) => ({
    main: {
      display: "flex",
      flexDirection: "row",
      alignItems: "baseline",
      justifyContent: "center",
      color: "antiquewhite",
    },

    logButton: {
      fontFamily: "Noto Sans",
      display: "flex",
      background: "#044a10",
      width: "60%",
      margin: "40px",
      color: "antiquewhite",
    },
  }));

  const classes = useStyles();

  return isLoggedIn ? (
    <div>
      <div className={classes.main}>
        <Link to="/home">
          <ArrowBackIosIcon className={classes.backArrow}>
            Back to Home
          </ArrowBackIosIcon>
        </Link>
        <h1>Settings</h1>
      </div>

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