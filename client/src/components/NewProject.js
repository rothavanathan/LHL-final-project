import { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  textField: {
    color: "var(--black)",
    backgroundColor: "var(--white)",
    border: "none",
    // borderBottom: "2px solid var(--tertiary-color)",
    width: "100%",
    marginTop: "1em",
    fontSize: ".9em"
  },
  input: {
    color: "black",
    background: "none"
  },
  saveIcon: {
    '&:hover': {
      color: "var(--primary-color)"
    }
  },
}));

export default function NewProjectForm(props) {
  const classes = useStyles();
  const { songId, user, defaultTitle } = props;
  const [projectTitle, setProjectTitle] = useState(defaultTitle);
  const [projectId, setProjectId] = useState("");
  const [invalidSong, setInvalidSong] = useState(false);

  const saveProject = () => {
    axios
      .put("http://localhost:8000/api/project/", {
        title: projectTitle,
        song_id: songId,
        user_id: user,
        notes: ""
      })
      .then((res) => {
        setProjectId(res.data.projectId);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (songId <= 6) {
      saveProject();
    } else {
      setInvalidSong(true);
    }
  };

  const handleProject = (event) => {
    setProjectTitle(event.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="filled"
          InputProps={{
            className: classes.input
          }}
          className={classes.textField}
          value={projectTitle}
          onChange={handleProject}
          type="text"
          name="project_name"
          placeholder="Ready? Name your new project!"
        ></TextField>
        <Button type="submit" color="var(--tertiary-color)" className={classes.saveIcon}>Save</Button>
      </form>
      {projectId && <Redirect to={`/project/${projectId}`} />}
      {invalidSong && <Redirect to={`/project/0`} />}
    </div>
  )
}
