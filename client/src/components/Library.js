import { useState, useEffect, Fragment } from 'react';
import axios from "axios"
import Nav from "./Nav";
import NewCollection from "./NewCollection"
import { Redirect, Link } from "react-router-dom";
import { Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ProjectCard from "./ProjectCard";

const useStyles = makeStyles((theme) => ({
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

  return isCollectionFormOpen ? (
    <NewCollection closeForm={closeCollectionForm} user={isLoggedIn} setCollections={setCollections} />
  )
    :
    (
      <div>
        <h1>Library</h1>
        <section>
          <header>Recent Collections</header>
          <ul>
            <li onClick={openCollectionForm}>
              + Collections
          </li>
          </ul>
          <Container className={classes.cardGrid} maxWidth="md" id="projects">
            <Grid container spacing={4}>
              {collections.map((collection, i) =>
                <Fragment key={i}>
                  {/* <Link to={`/collection/${collection.id}`}> */}
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
          <header>Recent Projects</header>
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
                  {/* </Link> */}
                </Fragment>
              )}
            </Grid>
          </Container>
        </section>
        <Nav />
      </div >
    )
}