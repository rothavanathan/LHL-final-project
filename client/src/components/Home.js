import { useState, useEffect, Fragment } from 'react';
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';

import { Container, Grid, Typography } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import SettingsIcon from '@material-ui/icons/Settings';

import Nav from "./Nav";
import ProjectCard from "./ProjectCard";

const useStyles = makeStyles((theme) => ({
  mainHeader: {
    display: "flex",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 40,
    marginTop: 40,
    marginBottom: 40
  },
  cardGrid: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(7),
  },
  gearIcon: {
    color: "var(--white)",
    fontSize: 36,
    alignSelf: "flex-end"
  },
  typography: {
    marginBottom: 20
  }
}));

export default function Home(props) {
  const classes = useStyles();
  const { isLoggedIn } = props;

  const [collections, setCollections] = useState([])
  const [projects, setProjects] = useState([])

  useEffect(() => {
    axios
      .get('/api/content')
      .then(data => {
        setCollections(data.data.collections);
        setProjects(data.data.projects);
      })
  }, []);

  return isLoggedIn ? (
    <div>
      <div>
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
        <section>
          <Container className={classes.cardGrid} maxWidth="md" id="projects">
            <Typography className={classes.typography}
              component="header"
              variant="h5"
              align="left"
            > Recent Collections
            </Typography>
            <Grid container spacing={4}>
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
            </Grid>
          </Container>
        </section>
      </div>
      <section>
        <Container className={classes.cardGrid} maxWidth="md" id="projects" >
          <Typography className={classes.typography}
            component="header"
            variant="h5"
            align="left">
            Recent Projects
          </Typography>
          <Grid container spacing={4} >
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
          </Grid>
        </Container>
      </section>
      <Nav />
    </div>
  ) : (
      <Redirect to="/" />
    );
}
