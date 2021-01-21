import { useState, useEffect, Fragment } from 'react';
import { Redirect } from "react-router-dom";
import axios from 'axios';
import { Container, Grid, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Nav from "./Nav";
import ProjectCard from "./ProjectCard";

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
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
      <Link to="/gear">Gear</Link>
      <h1>Home</h1>
        <header>Recent Collections</header>
        <Container className={classes.cardGrid} maxWidth="md" id="projects">
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
          </div>
      <section>
        <header>Recent Projects</header>
        <Container className={classes.cardGrid} maxWidth="md" id="projects" >
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
