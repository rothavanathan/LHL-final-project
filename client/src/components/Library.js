import { useState, useEffect, Fragment } from 'react';
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Container, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ProjectCard from "./ProjectCard";
import Nav from "./Nav";
import NewCollection from "./NewCollection";

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
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

export default function Library(props) {
  const classes = useStyles();
  const [collections, setCollections] = useState([])
  const [projects, setProjects] = useState([])
  const [isCollectionFormOpen, setIsCollectionFormOpen] = useState(false)
  const { isLoggedIn } = props;

  useEffect(() => {
    axios
      .get('/api/content')
      .then(data => {
        setCollections(data.data.collections);
        setProjects(data.data.projects);
      })
  }, []);


  const openCollectionForm = () => {
    setIsCollectionFormOpen(true)
  }

  const closeCollectionForm = () => {
    setIsCollectionFormOpen(false)
  }

  return isLoggedIn ? (
    <div>
      { isCollectionFormOpen ? (
        <NewCollection closeForm={closeCollectionForm} user={isLoggedIn} setCollections={setCollections} />
      ) : (
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
              <Typography
                component="header"
                variant="h5"
              >All Collections
          </Typography>
              <ul>
                <li onClick={openCollectionForm}>
                  + Collections
          </li>
              </ul>
              <Container className={classes.cardGrid} maxWidth="md" id="projects">
                <Grid container spacing={4}>
                      <ProjectCard
                        key={1000}
                        title={"Start a New Project"}
                        thumbnail={"https://images.unsplash.com/photo-1496293455970-f8581aae0e3b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1301&q=80"}
                        link={`/search`}
                      />
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
              <Typography
                component="header"
                variant="h5"
              >All Projects
          </Typography>
              <ul>
                <li>+ Project</li>
              </ul>
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
          </div >
        )}
    </div>
  ) : (
      <Redirect to="/" />
    )
}