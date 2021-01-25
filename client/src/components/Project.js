import { useState, useEffect, useRef } from "react";
import { Link, Redirect, useParams, Prompt } from "react-router-dom";
import axios from 'axios';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { Box, Typography, IconButton, Button, Container, useMediaQuery } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Player from "./Player";
import PlayerTransport from "./PlayerTransport";
import ProjectNav from "./ProjectNav";
import SideDrawerProject from "./SideDrawerProject";
import Notes from "./Notes"
import AddProjectToCollection from "./AddProjectToCollection"
import ConfirmDelete from "./ConfirmDelete";

const useStyles = makeStyles((theme) => ({
  mainWindow: {
    width: "100%",
    margin: "auto",
    // paddingLeft: "4em",
    // paddingRight: "4em",
  },
  mainHeader: {
    display: "flex",
    justifyContent: "flex-start",
    // paddingLeft: 20,
    // paddingRight: 40,
    marginTop: 40,
    // marginBottom: "1em",
  },
  titleBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "start"
  },
  headerGrid: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(5),
  },
  backArrow: {
    fontSize: "large",
    paddingLeft: 10,
    paddingRight: 5,
    color: "var(--white)",
    "&:hover": {
      color: "var(--primary-color)",
    },
  },

  playerBox: {
    padding: "2em"
  },
  projectForm: {
    width: 'calc(100%)',
  },
  formBox: {
    display: "flex",
    justifyContent: "space-between"
  },
  saveIcon: {
    margin: "auto",
    fontSize: 56,
    color: "var(--quad-color)"
  },
  link: {
    textDecoration: "none",
    marginTop: 10,
  },

}));


export default function Project(props) {
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:960px)');
  const [content, setContent] = useState([{ title: "", artist: "", url: "" }]);
  const [collections, setCollections] = useState([{ name: "", user_id: "", thumbnail: "" }]);
  const [collectionId, setCollectionId] = useState();
  const [note, setNote] = useState("");
  const [isNotChanged, setIsNotChanged] = useState(true);
  const [open, setOpen] = useState(false);
  const [redirectOnDelete, setRedirectOnDelete] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);
  const { isLoggedIn } = props;

  //for scroll to bottom
  const [height, setHeight] = useState(0)
  const ref = useRef(null)
  const { id } = useParams()
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  const audioCtx = new AudioCtx();

  useEffect(() => {
    axios
      //grabbing project, and associated songs/stems
      .get(`http://localhost:8000/api/project/${id}`)
      .then((data) => {
        axios
          //grabbing collections for user
          .get(`/api/content/${isLoggedIn}`)
          .then(data2 => {
            setContent(data.data.projects);
            setCollectionId(data.data.projects[0].collection_id);
            setCollections(data2.data.collections)
          })
          .then(data2 => {
            setContent(data.data.projects)
          })
          .catch(err => console.log(err))
      })
  }, [isLoggedIn])

  useEffect(() => {
    setHeight(ref.current.clientHeight)
  }, [hasLoaded])

  const project = content[0]

  const stems = content.map((project) => {
    const { title, url, icon, peaks_array, name, project_title } = project
    return { title, url, icon, peaks_array, name, project_title }
  })

  //save note and collection id
  const saveNote = () => {
    axios
      .put(`http://localhost:8000/api/project/${id}`, {
        notes: note,
        collection_id: collectionId
      })
      .then(() => {
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    saveNote();
    setIsNotChanged(true);
  };

  const deleteProject = () => {
    axios
      .delete(`http://localhost:8000/api/project/${id}`)
      .then(() => {
      })
      .catch((err) => console.log(err));
  };

  const handleAlertOpen = () => {
    setOpen(true);
  };

  const handleCancelDelete = () => {
    setOpen(false);
  };

  const handleConfirmDelete = () => {
    deleteProject();
    setRedirectOnDelete(false);
  }

  return isLoggedIn ? (
    <div>
      {!redirectOnDelete ? (
        <Redirect to="/home" />
      ) : (


          <div>

            <div style={{ display: "flex" }}>
              {matches && <SideDrawerProject height={height} />}
              {!project ? (
                <div className={classes.mainWindow}>
                  <Container className={classes.headerGrid} maxWidth="md" id="mainHeader">

                    <header className={classes.mainHeader}>
                      <Link to="/home">
                        <ArrowBackIosIcon
                          className={classes.backArrow}
                        >Back to Home
                      </ArrowBackIosIcon>
                      </Link>

                      <Box className={classes.titleBox}>
                        <Typography component="h1" variant="h4">
                          Sorry, this title is not currently available
                      </Typography>
                        <Link to="/search" className={classes.link}><Button color="primary" variant="outlined">Back to Search</Button></Link>
                      </Box>

                    </header>
                  </Container>

                </div>
              ) : (


                  <div className={classes.mainWindow} ref={ref}>
                    <Container className={classes.headerGrid} maxWidth="md" id="mainHeader">

                      <header className={classes.mainHeader}>
                        <Link to="/home">
                          <ArrowBackIosIcon
                            className={classes.backArrow}
                          >Back to Home
                            </ArrowBackIosIcon>
                        </Link>

                        <Box className={classes.titleBox}>
                          <Typography component="h1" variant="h4">
                            {project.project_title}
                          </Typography>
                          <Typography variant="subtitle1">
                            {project.title} - {project.artist}
                          </Typography>
                        </Box>

                      </header>
                    </Container>
                    <Container className={classes.headerGrid} maxWidth="md" id="mainHeader">

                      <Player className={classes.playerBox} tracks={stems} audioCtx={audioCtx} id="player" setHasLoaded={setHasLoaded}></Player>

                      <form
                        className={classes.projectForm}
                        onSubmit={handleSubmit}
                      >
                        <Box className={classes.formBox}>
                          <AddProjectToCollection
                            collections={collections}
                            collectionId={collectionId}
                            setCollectionId={setCollectionId} >
                          </AddProjectToCollection>

                          <IconButton aria-label="save" type="submit">
                            <SaveIcon
                              className={classes.saveIcon}
                            >
                            </SaveIcon>
                          </IconButton>
                          <IconButton aria-label="delete" onClick={handleAlertOpen}>
                            <DeleteForeverIcon
                              className={classes.saveIcon}
                            >
                            </DeleteForeverIcon>
                          </IconButton>
                          <ConfirmDelete
                            open={open}
                            setOpen={setOpen}
                            handleAlertOpen={handleAlertOpen}
                            handleConfirmDelete={handleConfirmDelete}
                            handleCancelDelete={handleCancelDelete}
                            name={content[0].project_title}
                          />
                        </Box>

                        {project && <Notes id="notes" projectId={id} existingNote={project.notes} note={note} setNote={setNote} setIsNotChanged={setIsNotChanged} />}

                      </form>

                      <PlayerTransport tracks={stems} audioCtx={audioCtx} hasLoaded={hasLoaded} />
                    </Container>


                    {!matches && <ProjectNav height={height} />}

                    <Prompt
                      when={!isNotChanged}
                      message={"Do you want to leave without saving!?"}
                    />

                  </div>
                )}
            </div>
          </div>
        )}
    </div>
  ) : (
      <Redirect to="/" />
    );
}