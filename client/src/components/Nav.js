import { Link } from "react-router-dom";

// export default function Nav(props) {
//   return (
//     <div>
//       <Link to="/home">Home</Link>
//       <Link to="/search">Search</Link>
//       <Link to="/library">Library</Link>
//     </div>

//   );
// }

import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles({
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    background: "rgb(245, 103, 93)"
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
      <BottomNavigationAction label="Home" icon={<HomeIcon />} href="/home"/>
      <BottomNavigationAction label="Search" icon={<SearchIcon />} href="/search"/>
      <BottomNavigationAction label="Library" icon={<LibraryMusicIcon/> } href="/library"/>
    </BottomNavigation>
  );
}
