import { Link } from "react-router-dom";
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Drawer, List, ListItem, ListItemIcon, ListItemText
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import SearchIcon from '@material-ui/icons/Search';



const useStyles = makeStyles((theme) => ({
  drawer: {
    color: "var(--black)",
    backgroundImage: `url("https://www.transparenttextures.com/patterns/otis-redding.png")`,
    width: "240px",
    borderRight: "1px solid rgba(244, 240, 234, 0.2)"
  },
  drawerPaper: {
    marginTop: "5em",
    width: 'inherit',
    backgroundColor: "var(--black)",
    backgroundImage: `url("https://www.transparenttextures.com/patterns/otis-redding.png")`,
    borderRight: "1px solid rgba(244, 240, 234, 0.2)"

  },
  mainHeader: {
    display: "flex",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 40,
    marginTop: 40,
    marginBottom: 40
  },
  links: {
    textDecoration: "none",
    color: "var(--white)",
  },
  linkIcon: {
    color: "var(--white)",
  },
}));

export default function SideDrawer() {
  const classes = useStyles();

  return (
    <Drawer
      // style={{ width: "240px" }}
      variant="persistent"
      anchor="left"
      open={true}
      classes={{ paper: classes.drawerPaper }}
      className={classes.drawer}
    >
      <List>
        <Link to="/home" className={classes.links}>
          <ListItem>
            <ListItemIcon className={classes.linkIcon}>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText>
              <Typography component="h3" variant="h6">
                Home
              </Typography>
            </ListItemText>
          </ListItem>
        </Link>

        <Link to="/search" className={classes.links}>
          <ListItem>
            <ListItemIcon className={classes.linkIcon}>
              <SearchIcon />
            </ListItemIcon>
            <ListItemText>
              <Typography component="h3" variant="h6">
                Search
              </Typography>
            </ListItemText>
          </ListItem>

        </Link>

        <Link to="/library" className={classes.links}>
          <ListItem>
            <ListItemIcon className={classes.linkIcon}>
              <LibraryMusicIcon />
            </ListItemIcon>
            <ListItemText>
              <Typography component="h3" variant="h6">
                Library
              </Typography>
            </ListItemText>
          </ListItem>
        </Link>
      </List>

    </Drawer >
  );
}
