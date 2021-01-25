import { Link } from "react-router-dom";
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Tab, BottomNavigation, } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import SearchIcon from '@material-ui/icons/Search';

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
    borderTop: "1px solid rgba(244, 240, 234, 0.1)"
  },
  tabs: {
    "&:active": {
      color: "var(--primary-color)"
    },
  }
});

export default function SimpleBottomNavigation() {
  const classes = useStyles();

  return (
    <BottomNavigation
      showLabels
      className={classes.root}
    >
      <Tab className={classes.tabs} label="Home" to="/home" icon={<HomeIcon style={{ opacity: 0.9 }} />} component={Link} />
      <Tab className={classes.tabs} label="Search" to="/search" icon={<SearchIcon style={{ opacity: 0.9 }} />} component={Link} />
      <Tab className={classes.tabs} label="Library" to="/library" icon={<LibraryMusicIcon style={{ opacity: 0.9 }} />} component={Link} />
    </BottomNavigation>
  );
}
