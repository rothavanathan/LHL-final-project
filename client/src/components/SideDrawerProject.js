import { Link } from "react-router-dom";
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Drawer, List, ListItem, ListItemIcon, ListItemText
} from '@material-ui/core';
import TuneOutlinedIcon from '@material-ui/icons/TuneOutlined';
import HomeIcon from '@material-ui/icons/Home';
import BookIcon from '@material-ui/icons/Book';
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

export default function SideDrawerProject(props) {
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
              <HomeIcon />
            </ListItemIcon>
            <ListItemText>
              <Typography component="h3" variant="h6">
                Home
              </Typography>
            </ListItemText>
          </ListItem>
        </Link>

        <Link onClick={handlePlayerClick} className={classes.links}>
          <ListItem className={classes.listItem}>
            <ListItemIcon className={classes.linkIcon}>
              <TuneOutlinedIcon />
            </ListItemIcon>
            <ListItemText>
              <Typography component="h3" variant="h6">
                Player
              </Typography>
            </ListItemText>
          </ListItem>

        </Link>

        <Link onClick={handleNotesClick} className={classes.links}>
          <ListItem className={classes.listItem}>
            <ListItemIcon className={classes.linkIcon}>
              <BookIcon />
            </ListItemIcon>
            <ListItemText>
              <Typography component="h3" variant="h6">
                Notes
              </Typography>
            </ListItemText>
          </ListItem>
        </Link>
      </List>

    </Drawer >
  );
}
