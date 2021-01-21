// import { Link } from "react-router-dom";

import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import TuneOutlinedIcon from '@material-ui/icons/TuneOutlined';
import SettingsIcon from '@material-ui/icons/Settings';
import BookIcon from '@material-ui/icons/Book';

const useStyles = makeStyles({
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    background: "rgb(3, 3, 3)",
    zIndex: 10
  }
});

export default function SimpleBottomNavigation() {
  const classes = useStyles();
  // const [value, setValue] = useState(0);

  return (
    <BottomNavigation
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction label="Player" icon={<TuneOutlinedIcon />} href="#player" />
      <BottomNavigationAction label="Notes" icon={<BookIcon />} href="#notes" />
      <BottomNavigationAction label="Global" icon={<SettingsIcon />} href="#global" />
    </BottomNavigation>
  );
}

