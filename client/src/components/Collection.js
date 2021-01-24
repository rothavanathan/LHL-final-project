import { useState, useEffect, Fragment } from "react";
import { Redirect, useParams } from "react-router-dom";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid, Button, Typography } from "@material-ui/core";
import Nav from "./Nav";
import ProjectCard from "./ProjectCard";
import ConfirmDelete from "./ConfirmDelete";

const useStyles = makeStyles((theme) => ({
  mainHeader: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingLeft: 20,
    paddingRight: 40,
    marginTop: 40,
    marginBottom: 40
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  deleteButton: {
    marginTop: 10,
  }
}));

export default function Collection(props) {
  const classes = useStyles();
  const { isLoggedIn, setRefresh } = props;
  const { id } = useParams();
  const [projects, setProjects] = useState([{ collection_name: "" }]);
  const [open, setOpen] = useState(false);
  const [redirectOnDelete, setRedirectOnDelete] = useState(false);
  const [collectionName, setCollectionName] = useState("")

  useEffect(() => {
    axios
      .get(`/api/collection/${id}`)
      .then((data) => {
        setProjects(data.data.projects);
        setCollectionName(data.data.collName);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const deleteProject = () => {
    axios
      .post(`http://localhost:8000/api/project/`, {
        id,
      })
      .then(() => {
        axios.delete(`http://localhost:8000/api/collection/${id}`);
      })
      .catch((err) => console.log(err));
  };

  // handlers for alert popup
  const handleAlertOpen = () => {
    setOpen(true);
  };

  const handleCancelDelete = () => {
    setOpen(false);
  };

  const handleConfirmDelete = () => {
    deleteProject();
    setRefresh(true);
    setRedirectOnDelete(true);
  };

  // card for empty collection
  const emptyCollection = [
    {
      collection_name: collectionName,
      project_title: "Add A Project!",
      url_album_artwork:
        "https://rykabrown.com/wp-content/uploads/2021/01/new-proj.png",
    },
  ];

  return isLoggedIn ? (
    <div>
      {redirectOnDelete ? (
        <Redirect to="/home" />
      ) : (
          <div>
            {projects.length > 0 ? (
              <div>
                <header className={classes.mainHeader}>
                  <Typography
                    component="h1"
                    variant="h4"
                    color="var(--white)">
                    {projects[0].collection_name}
                  </Typography>

                  <Button
                    className={classes.deleteButton}
                    variant="outlined"
                    color="primary"
                    onClick={handleAlertOpen}
                  >
                    Delete Collection
              </Button>
                </header>
                <ConfirmDelete
                  open={open}
                  setOpen={setOpen}
                  handleAlertOpen={handleAlertOpen}
                  handleConfirmDelete={handleConfirmDelete}
                  handleCancelDelete={handleCancelDelete}
                  name={projects[0].collection_name}
                />
                <Container
                  className={classes.cardGrid}
                  maxWidth="md"
                  id="projects"
                >
                  <Grid container spacing={4}>
                    {projects.map((project, i) => (
                      <Fragment key={i}>
                        <ProjectCard
                          key={project.project_id}
                          title={project.project_title}
                          thumbnail={project.url_album_artwork}
                          link={`/project/${project.project_id}`}
                          songTitle={project.title}
                          songArtist={project.artist}
                        />
                      </Fragment>
                    ))}
                  </Grid>
                </Container>
              </div>
            ) : (
                <div>
                  <h1>{emptyCollection[0].collection_name}</h1>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleAlertOpen}
                  >
                    Delete Collection
              </Button>
                  <ConfirmDelete
                    open={open}
                    setOpen={setOpen}
                    handleAlertOpen={handleAlertOpen}
                    handleConfirmDelete={handleConfirmDelete}
                    handleCancelDelete={handleCancelDelete}
                    name={emptyCollection[0].collection_name}
                  />
                  <Container
                    className={classes.cardGrid}
                    maxWidth="md"
                    id="projects"
                  >
                    <Grid container spacing={4}>
                      {emptyCollection.map((project, i) => (
                        <Fragment key={i}>
                          <ProjectCard
                            key={project.id}
                            title={project.project_title}
                            thumbnail={project.url_album_artwork}
                            link={`/search`}
                          />
                        </Fragment>
                      ))}
                    </Grid>
                  </Container>
                </div>
              )}

            <Nav />
          </div>
        )}
    </div>
  ) : (
      <Redirect to="/" />
    );
}