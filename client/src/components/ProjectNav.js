// import { Link } from "react-router-dom";

import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { BottomNavigation, Tab } from '@material-ui/core/';
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

export default function ProjectNav() {
  const classes = useStyles();
  // const [value, setValue] = useState(0);

  const handlePlayerClick = () => {
    window[`scrollTo`]({ top: 0, behavior: 'smooth' })
  }
  const handleNotesClick = () => {
    window[`scrollTo`]({ bottom: 0, behavior: 'smooth' })
  }
  const handleGlobalClick = () => {
    window[`scrollTo`]({ bottom: 0, behavior: 'smooth' })
  }

  return (
    <BottomNavigation
      showLabels
      className={classes.root}
    >
      <Tab label="Player" icon={<TuneOutlinedIcon />} onClick={handlePlayerClick} />
      <Tab label="Notes" icon={<BookIcon />} onClick={handleNotesClick} />
      <Tab label="Global" icon={<SettingsIcon />} onClick={handleNotesClick} />
    </BottomNavigation>
  );
}

