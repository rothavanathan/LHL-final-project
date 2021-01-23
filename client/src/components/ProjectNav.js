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
    borderTop: "1px solid rgba(244, 240, 234, 0.2)"
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
      <Tab label="Home" to="/home" icon={<HomeIcon />} component={Link} />
      <Tab label="Player" icon={<TuneOutlinedIcon />} onClick={handlePlayerClick} />
      <Tab label="Notes" icon={<BookIcon />} onClick={handleNotesClick} />
    </BottomNavigation>
  );
}

