import { useState, useEffect, Fragment } from 'react';
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Container, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ProjectCard from "./ProjectCard";
import NewCollectionCard from './NewCollectionCard'
import Nav from "./Nav";

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
    paddingBottom: theme.spacing(5),
  },
  typography: {
    marginBottom: 20
  }
}));

export default function Library(props) {
  const classes = useStyles();
  const [collections, setCollections] = useState([])
  const [projects, setProjects] = useState([])
  const { isLoggedIn } = props;

  // get collections & projects by user id
  useEffect(() => {
    axios
      .get(`/api/content/${isLoggedIn}`)
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
            Library
          </Typography>
        </header>
        <section>
          <Container className={classes.cardGrid} maxWidth="md" id="projects">
          <Typography className={classes.typography}
            component="header"
            variant="h5"
            align="left"
          >All Collections
          </Typography>
            <Grid container spacing={4}>
              <Fragment>
                <NewCollectionCard
                  key={0}
                  title={"Start a new collection"}
                  image={"https://rykabrown.com/wp-content/uploads/2021/01/new-coll.png"}
                  isLoggedIn={isLoggedIn}
                  setCollections={setCollections}
                />
              </Fragment>
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
        <section>
          <Container className={classes.cardGrid} maxWidth="md" id="projects" >
          <Typography className={classes.typography}
            component="header"
            variant="h5"
            align="left"
          >All Projects
          </Typography>
            <Grid container spacing={4} >
              <ProjectCard
                key={1000}
                title={"Start a new project"}
                thumbnail={"https://rykabrown.com/wp-content/uploads/2021/01/new-proj.png"}
                link={`/search`}
              />
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
      </div >
    </div>
  ) : (
    <Redirect to="/" />
  )
}