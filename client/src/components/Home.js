import { useState, useEffect, Fragment } from 'react';
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';
import {
  Container, Grid, Typography, useMediaQuery
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import SettingsIcon from '@material-ui/icons/Settings';
import Nav from "./Nav";
import SideDrawer from "./SideDrawer";
import ProjectCard from "./ProjectCard";
import NewCollectionCard from './NewCollectionCard';



const useStyles = makeStyles((theme) => ({

  mainWindow: {
    width: "100%",
    margin: "auto"
  },
  mainHeader: {
    display: "flex",
    justifyContent: "space-between",
    // paddingLeft: 20,
    // paddingRight: 40,
    marginTop: 40,
    // marginBottom: "1em",
  },
  cardGrid: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(5),
  },
  gearIcon: {
    color: "var(--white)",
    fontSize: 36,
    alignSelf: "flex-end",
    "&:hover": {
      color: "var(--primary-color)"
    },
    "&:active": {
      color: "var(--primary-color)",
    },
  },
  typography: {
    marginBottom: "3em",
  }
}));

export default function Home(props) {
  //for media query
  // const theme = useTheme();
  const matches = useMediaQuery('(min-width:960px)');

  const classes = useStyles();
  const { isLoggedIn, refresh, setRefresh } = props;
  const [collections, setCollections] = useState([])
  const [projects, setProjects] = useState([])

  // get collections & projects by user id
  useEffect(() => {
    axios
      .get(`/api/content/${isLoggedIn}`)
      .then(data => {
        setCollections(data.data.collections.splice(0, 3));
        setProjects(data.data.projects.splice(0, 3));
        setRefresh(false);
      })
      .catch((err) => console.log(err));
  }, [refresh, isLoggedIn]);

  return isLoggedIn ? (
    <div style={{ display: "flex" }}>
      {matches && <SideDrawer />}

      <div className={classes.mainWindow}>
        <Container className={classes.cardGrid} maxWidth="md" id="mainHeader">


          <header className={classes.mainHeader}>
            <Typography
              component="h1"
              variant="h4"
              color="var(--white)">
              Home
            </Typography>
            <Link to="/gear">
              <SettingsIcon
                className={classes.gearIcon}
              >Gear
               </SettingsIcon>
            </Link>
          </header>
        </Container>
        <section>
          <Container className={classes.cardGrid} maxWidth="md" id="collections">
            <Typography className={classes.typography}
              component="header"
              variant="h5"
              align="left"
            > Recent Collections
          </Typography>

            <Grid container spacing={4}>
              {collections.length === 0 ? (
                <NewCollectionCard
                  key={0}
                  title={"There's nothing here yet!"}
                  subtitle={"Start a new collection"}
                  image={"https://rykabrown.com/wp-content/uploads/2021/01/new-coll.png"}
                  isLoggedIn={isLoggedIn}
                  setCollections={setCollections}
                />
              ) : (
                  <Fragment>
                    {collections.map((collection, i) =>
                      <Fragment key={i}>
                        <ProjectCard
                          key={collection.id}
                          title={collection.name}
                          thumbnail={collection.thumbnail}
                          link={`/collection/${collection.id}`}
                        />
                      </Fragment>
                    )}
                  </Fragment>
                )}
            </Grid>
          </Container>
        </section>
        <section>
          <Container className={classes.cardGrid} maxWidth="md" id="projects" >
            <Typography className={classes.typography}
              component="header"
              variant="h5"
              align="left">
              Recent Projects
          </Typography>
            <Grid container spacing={4} >
              {projects.length === 0 ? (
                <ProjectCard
                  key={1000}
                  title={"Ready to make some music?"}
                  songTitle={"Start a new project"}
                  thumbnail={"https://rykabrown.com/wp-content/uploads/2021/01/new-proj.png"}
                  link={`/search`}
                />
              ) : (
                  <Fragment>
                    {projects.map((project, i) =>
                      <Fragment key={i}>
                        <ProjectCard
                          key={project.id}
                          title={project.title}
                          thumbnail={project.url_album_artwork}
                          link={`/project/${project.id}`}
                          songTitle={project.song_title}
                          songArtist={project.artist}
                        />
                      </Fragment>
                    )}
                  </Fragment>
                )}
            </Grid>
          </Container>
        </section>
      </div>
      {!matches && < Nav />}
    </div>
  ) : (
      <Redirect to="/" />
    );
}
