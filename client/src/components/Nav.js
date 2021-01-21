import { Link } from "react-router-dom";
import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Tab, BottomNavigation, } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import SearchIcon from '@material-ui/icons/Search';


const useStyles = makeStyles({
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    background: "var(--tertiary-color)"
  }
});

export default function SimpleBottomNavigation() {
  const classes = useStyles();

  return (
    <BottomNavigation
      className={classes.root}
    >
      <Tab to="/home" icon={<HomeIcon />} component={Link} />
      <Tab to="/search" icon={<SearchIcon />} component={Link} />
      <Tab to="/library" icon={<LibraryMusicIcon />} component={Link} />
    </BottomNavigation>
  );
}
