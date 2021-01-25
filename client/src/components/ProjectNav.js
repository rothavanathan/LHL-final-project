import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { BottomNavigation, Tab } from '@material-ui/core/';
import TuneOutlinedIcon from '@material-ui/icons/TuneOutlined';
import HomeIcon from '@material-ui/icons/Home';
import BookIcon from '@material-ui/icons/Book';

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    width: '100%',
    position: 'fixed',
    bottom: 0,
    background: "var(--black)",
    backgroundImage: `url("https://www.transparenttextures.com/patterns/otis-redding.png")`,
    paddingTop: 10,
    zIndex: 10,
    borderTop: "1px solid rgba(244, 240, 234, 0.1)"
  },
  tabs: {
    "&:active": {
      color: "var(--primary-color)"
    }
  }
});

export default function ProjectNav(props) {
  const classes = useStyles();

  const handlePlayerClick = () => {
    window[`scrollTo`]({ top: 0, behavior: 'smooth' })
  }
  const handleNotesClick = () => {
    window[`scrollTo`]({ top: props.height, behavior: 'smooth' })
  }
  const handleGlobalClick = () => {
    window[`scrollTo`]({ top: props.height, behavior: 'smooth' })
  }

  return (
    <BottomNavigation
      showLabels
      className={classes.root}
    >
      <Tab className={classes.tabs} label="Home" to="/home" icon={<HomeIcon style={{ opacity: 0.9 }} />} component={Link} />
      <Tab className={classes.tabs} label="Player" icon={<TuneOutlinedIcon style={{ opacity: 0.9 }} />} onClick={handlePlayerClick} />
      <Tab className={classes.tabs} label="Notes" icon={<BookIcon style={{ opacity: 0.9 }} />} onClick={handleNotesClick} />
    </BottomNavigation>
  );
}

