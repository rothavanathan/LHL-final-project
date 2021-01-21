import { useState, useEffect } from "react";
import { Link, Redirect, useParams, Prompt } from "react-router-dom";
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';
import { Box, Typography } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import Player from "./Player";
import PlayerTransport from "./PlayerTransport";
import ProjectNav from "./ProjectNav";
import Notes from "./Notes"
import AddProjectToCollection from "./AddProjectToCollection"


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
  const [content, setContent] = useState([{ title: "", artist: "", url: "" }])
  const [collections, setCollections] = useState([{ name: "", user_id: "", thumbnail: "" }])
  const [collectionId, setCollectionId] = useState()
  const [note, setNote] = useState("");
  const { isLoggedIn } = props;
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
            console.log(`grabbing content for the collections`, data2.data.collections);
            setContent(data.data.projects);
            console.log(`project data`, data.data.projects[0].collection_id)
            setCollectionId(data.data.projects[0].collection_id);
            setCollections(data2.data.collections)
          })
          .then(data2 => {

            setContent(data.data.projects)
          })
          .catch(err => console.log(err))
      })
  }, [])


  const project = content[0]
  let OGcollectionId = project.collection_id
  let existingNote = project.notes
  // console.log("CONTENT----------", content);

  const stems = content.map((project) => {
    const { title, url, icon, peaks_array, name } = project
    return { title, url, icon, peaks_array, name }
  })


  const check = () => {

    if (project.notes !== note || collectionId !== OGcollectionId) {
      return true
    } else {
      return false
    }
  }

  const saveNote = () => {
    axios
      .put("http://localhost:8000/api/project/addnote", {
        id,
        notes: note,
        collection_id: collectionId
      })
      .then((data) => {
        console.log(`data back from save`, data.data.rows[0])
        existingNote = data.data.rows[0].notes
        OGcollectionId = data.data.rows[0].collection_id
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    saveNote();
  };


  // console.log("I AM CONTENT ZERO DO I HAVE A NOTE", project.notes);

  return isLoggedIn ? (
    <div>

      <div className="main-window">
        <header className={classes.header}>
          <Link to="/home">
            <ArrowBackIosIcon
              className={classes.backArrow}
            >Back to Home
            </ArrowBackIosIcon>
          </Link>

          <Box className={classes.titleBox}>

            <Typography component="h1" variant="h5">
              {project.title}
            </Typography>

            <Typography variant="subtitle1">
              {project.artist}
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

            <SaveIcon
              className={classes.saveIcon}
              type="submit"
            >Save
            </SaveIcon>
          </Box>

          {project && <Notes id="notes" projectId={id} existingNote={project.notes} note={note} setNote={setNote} />}

        </form>
      </div>

      <PlayerTransport tracks={stems} audioCtx={audioCtx} />
      <ProjectNav />

      <Prompt
        when={check()}
        message={"Don't you want to saaaaaaave!?"}
      />

    </div >
  ) : (
      <Redirect to="/" />
    );
}