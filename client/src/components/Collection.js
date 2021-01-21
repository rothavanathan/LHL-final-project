import { useState, useEffect, Fragment } from "react";
import { Link, Redirect, useParams } from "react-router-dom";
import axios from "axios";
import ProjectCard from './ProjectCard';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid } from '@material-ui/core';
import Nav from './Nav';

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

export default function Collection(props) {
  const classes = useStyles();
  const isLoggedIn = props.isLoggedIn;
  const { id } = useParams();
  const [projects, setProjects] = useState([{collection_name: ""}])

  useEffect(() => {
    axios
      .get(`/api/collection/${id}`)
      .then(data => {
        // const data2 = data.data.projects
        // const response = []
        // if (data2.length > 0) {
        //   const data2formatted = data2.map(entry => {
        //     return {
        //       trackId: entry.id,
        //       artistName: entry.artist,
        //       artworkUrl100: entry.url_album_artwork,
        //       trackName: entry.title,
        //       collectionName: entry.album,
        //       previewUrl: entry.url_full_song_preview
        //     }
        //   })
        //   response.push(...data2formatted)
        // }
        console.log(data.data.projects)
        setProjects(data.data.projects)
      })
  }, []);

  return isLoggedIn ? (
    <div>
      <h1>Collection: {projects[0].collection_name}</h1>
        <Container className={classes.cardGrid} maxWidth="md" id="projects" >
          <Grid container spacing={4} >
            {projects.map((project, i) =>
              <Fragment key={i}>
                <ProjectCard
                  key={project.id}
                  title={project.project_title}
                  thumbnail={project.url_album_artwork}
                  link={`/project/${project.id}`}
                  songTitle={project.title}
                  songArtist={project.artist}
                />
                {/* </Link> */}
              </Fragment>
            )}
          </Grid>
        </Container>
    </div>

  ) : (
      <Redirect to="/" />
    );
}
