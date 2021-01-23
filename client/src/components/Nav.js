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
    background: "black",
    paddingTop: 10,
  }
});

export default function SimpleBottomNavigation() {
  const classes = useStyles();

  return (
    <BottomNavigation
      showLabels
      className={classes.root}
    >
      <Tab label="Home" to="/home" icon={<HomeIcon />} component={Link} />
      <Tab label="Search" to="/search" icon={<SearchIcon />} component={Link} />
      <Tab label="Library" to="/library" icon={<LibraryMusicIcon />} component={Link} />
    </BottomNavigation>
  );
}
