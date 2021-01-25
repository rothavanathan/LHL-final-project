import { useState, useEffect, Fragment } from "react";
import { Redirect, useParams, Link } from "react-router-dom";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid, Button, Typography, Box, ButtonGroup, IconButton } from "@material-ui/core";
import { FacebookShareButton, WhatsappShareButton } from 'react-share';
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import DeleteIcon from '@material-ui/icons/Delete';
import FacebookIcon from '@material-ui/icons/Facebook';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import Nav from "./Nav";
import ProjectCard from "./ProjectCard";
import ConfirmDelete from "./ConfirmDelete";

const useStyles = makeStyles((theme) => ({
  header: {
    marginTop: 40,
    marginBottom: 20,
    display: "flex"
  },
  titleBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "start"
  },
  backArrow: {
    fontSize: "large",
    paddingLeft: 10,
    paddingRight: 5,
    marginLeft: 10,
    color: "var(--white)",
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  delete: {
    alignSelf: "flex-end"
  },
  shareBtn: {
    color: "var(--white)",
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
    marginRight: "auto",
    marginTop: "none"
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
                <header className={classes.header}>
                  <Link to="/home">
                    <ArrowBackIosIcon
                      className={classes.backArrow}
                    >Back to Home
                     </ArrowBackIosIcon>
                  </Link>

                  <Box className={classes.titleBox}>

                    <Typography
                      component="h1"
                      variant="h4"
                      color="var(--white)">
                      {projects[0].collection_name}
                    </Typography>

                    <ButtonGroup className={classes.shareBtn}>
                      <FacebookShareButton
                        url={`https://layers-irl.netlify.app/`}
                        quote={`Check out ${projects[0].collection_name} on Layers`}
                        hashtag={"#LearnByLayers"}
                      >
                        <FacebookIcon
                        />
                      </FacebookShareButton>

                      <WhatsappShareButton className={classes.shareBtn}
                        url={`https://layers-irl.netlify.app/collection/${id}`}
                        title={`Check out ${projects[0].collection_name} on Layers`}
                      >
                        <WhatsAppIcon
                        />
                      </WhatsappShareButton>
                    </ButtonGroup>

                  </Box>
                  <div className={classes.delete}>
                    <IconButton onClick={handleAlertOpen}>
                      <DeleteIcon
                        color="primary"
                        fontSize="large"
                      >
                      </DeleteIcon>
                    </IconButton>
                  </div>



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