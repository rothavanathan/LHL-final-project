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
import logo from "../public/LAYERS_crop.png";



const useStyles = makeStyles((theme) => ({
  drawer: {
    color: "var(--black)",
    backgroundImage: `url("https://www.transparenttextures.com/patterns/otis-redding.png")`,
    width: "15%",
    minWidth: 240,
    borderRight: "1px solid rgba(244, 240, 234, 0.1)"
  },
  drawerPaper: {
    marginTop: "2em",

    width: 'inherit',
    minWidth: 240,
    backgroundColor: "var(--black)",
    backgroundImage: `url("https://www.transparenttextures.com/patterns/otis-redding.png")`,
    borderRight: "1px solid rgba(244, 240, 234, 0.1)"

  },
  homeImg: {
    width: "50%",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "4em",
    paddingRight: 4,
  },
  links: {
    textDecoration: "none",
    color: "var(--white)",

  },
  linkIcon: {
    color: "var(--white)",

  },
  listItem: {
    "&:hover": {
      color: "var(--primary-color)"
    }
  }
}));

export default function SideDrawer() {
  const classes = useStyles();

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={true}
      classes={{ paper: classes.drawerPaper }}
      className={classes.drawer}
      style={{ opacity: 0.9 }}
    >
      <img src={logo} className={classes.homeImg} alt="Layers logo" />
      <List>
        <Link to="/home" className={classes.links}>
          <ListItem className={classes.listItem}>
            <ListItemIcon className={classes.linkIcon}>
              <HomeIcon className={classes.icons} />
            </ListItemIcon>
            <ListItemText>
              <Typography component="h3" variant="h6">
                Home
              </Typography>
            </ListItemText>
          </ListItem>
        </Link>

        <Link to="/search" className={classes.links}>
          <ListItem className={classes.listItem}>
            <ListItemIcon className={classes.linkIcon}>
              <SearchIcon className={classes.icons} />
            </ListItemIcon>
            <ListItemText>
              <Typography component="h3" variant="h6">
                Search
              </Typography>
            </ListItemText>
          </ListItem>

        </Link>

        <Link to="/library" className={classes.links}>
          <ListItem className={classes.listItem}>
            <ListItemIcon className={classes.linkIcon}>
              <LibraryMusicIcon className={classes.icons} />
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
