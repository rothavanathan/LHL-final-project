import { useState, useEffect, useRef } from "react";
import { Link, Redirect, useParams, Prompt } from "react-router-dom";
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { Box, Typography, IconButton } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import Player from "./Player";
import PlayerTransport from "./PlayerTransport";
import ProjectNav from "./ProjectNav";
import Notes from "./Notes"
import AddProjectToCollection from "./AddProjectToCollection"
import ConfirmDelete from "./ConfirmDelete";


const useStyles = makeStyles((theme) => ({
  header: {
    marginTop: 20,
    display: "flex"
  },
  backArrow: {
    fontSize: "large",
    padding: 10,
    marginLeft: 10
  },
  titleBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "start"
  },
  player: {
    width: "50%"
  },

  projectForm: {
    width: 'calc(100% - 20px)',
    marginLeft: 10,
    marginRight: 10,
  },
  formBox: {
    display: "flex",
    justifyContent: "space-between"
    // flexDirection: "column"
  },
  saveIcon: {
    margin: "auto",
    fontSize: 56,
    color: "rgb(245, 103, 93)"
  },
}));


export default function Project(props) {
  const classes = useStyles();
  const [content, setContent] = useState([{ title: "", artist: "", url: "" }]);
  const [collections, setCollections] = useState([{ name: "", user_id: "", thumbnail: "" }]);
  const [collectionId, setCollectionId] = useState();
  const [note, setNote] = useState("");
  const [isNotChanged, setIsNotChanged] = useState(true);
  const [open, setOpen] = useState(false);
  const [redirectOnDelete, setRedirectOnDelete] = useState(true);
  const { isLoggedIn } = props;

  //for scroll to bottom
  const [height, setHeight] = useState(0)
  const ref = useRef(null)

  const { id } = useParams()
  console.log("IS LOGGED IN-------", isLoggedIn);

  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  const audioCtx = new AudioCtx();


  useEffect(() => {
    axios
      //grabbing project, and associated songs/stems
      .get(`http://localhost:8000/api/project/${id}`)
      .then((data) => {
        axios
          //grabbing collections for user
          .get('/api/content')
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
  }, [])

  useEffect(() => {
    setHeight(ref.current.clientHeight)
  })

  const project = content[0]
  let OGcollectionId = project.collection_id
  let existingNote = project.notes

  const stems = content.map((project) => {
    const { title, url, icon, peaks_array, name, project_title } = project
    return { title, url, icon, peaks_array, name, project_title }
  })

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
        console.log("DELETED!")
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
        <div className="main-window" ref={ref}>
          <header className={classes.header}>
            <Link to="/home">
              <ArrowBackIosIcon
                className={classes.backArrow}
              >Back to Home
              </ArrowBackIosIcon>
            </Link>

            <Box className={classes.titleBox}>

              <Typography component="h1" variant="h5">
                {project.project_title}
              </Typography>
              <Typography variant="subtitle1">
                {project.title} - {project.artist}
              </Typography>

            </Box>
          </header>

          <Player className={classes.player} tracks={stems} audioCtx={audioCtx} id="player"></Player>

          <form className={classes.projectForm} onSubmit={handleSubmit}>
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

            {project && <Notes id="notes" projectId={id} existingNote={project.notes} note={note} setNote={setNote} setIsNotChanged={setIsNotChanged}/>}

          </form>
        </div>

        <PlayerTransport tracks={stems} audioCtx={audioCtx} />
        <ProjectNav height={height} />

        <Prompt
          when={!isNotChanged}
          message={"Don't you want to saaaaaaave!?"}
        />
      </div>
      )}
    </div >
  ) : (
      <Redirect to="/" />
    );
}