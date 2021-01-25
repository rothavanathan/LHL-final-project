import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Nav from "./Nav";
import SideDrawer from "./SideDrawer";
import { FormControl, Button, Typography, Container, useMediaQuery } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  mainWindow: {
    width: "100%",
    margin: "auto"
  },
  mainHeader: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    // paddingLeft: 20,
    // paddingRight: 40,
    marginTop: 40,
    // marginBottom: "1em",
  },
  headerGrid: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(5),
  },
  backArrow: {
    fontSize: "large",
    paddingLeft: 5,
    paddingRight: 5,
    marginLeft: 10,
    "&:hover": {
      color: "var(--primary-color)",
    },
  },
  icon: {
    "&:active": {
      color: "var(--primary-color)",
    },
  },
  logButton: {
    display: "flex",
    background: "var(--primary-color)",
    width: "60%",
    minWidth: "12em",
    maxWidth: "14em",
    margin: "auto",
    marginTop: "8em",
    color: "var(--white)",
    "&:hover": {
      backgroundColor: "var(--white)",
      color: "var(--black)",
    },
    "&:active": {
      backgroundColor: "var(--quad-color)",
    },
  },
}));

export default function Gear(props) {
  const matches = useMediaQuery('(min-width:960px)');
  const classes = useStyles();

  const { isLoggedIn, setUser } = props;

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
    <div style={{ display: "flex" }}>
      {matches && <SideDrawer />}
      <div className={classes.mainWindow}>
        <Container className={classes.headerGrid} maxWidth="md" id="mainHeader">

          <header className={classes.mainHeader}>
            <Link to="/home" className={classes.backArrow}>
              <ArrowBackIosIcon className={classes.icon} >
                Back to Home
              </ArrowBackIosIcon>
            </Link>
            <Typography component="h1" variant="h4">
              Settings
           </Typography>
          </header>
        </Container>

        <FormControl className={classes.passwordInput}>
          <form onSubmit={handleSubmit}>
            <Button className={classes.logButton} type="submit">
              Logout
          </Button>
          </form>
        </FormControl>

      </div>
      {!matches && < Nav />}
    </div>
  ) : (
      <Redirect to="/" />
    );
}