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
    borderBottom: "2px solid var(--tertiary-color)",
    width: "100%",
    marginTop: "1em",
    fontSize: ".9em"
  },
  input: {
    color: "black",
    background: "none"
  }
}));

export default function NewProjectForm(props) {
  const classes = useStyles();
  const { songId, user } = props;
  const [projectTitle, setProjectTitle] = useState("");
  const [projectId, setProjectId] = useState("");

  const saveProject = () => {
    axios
      .put("http://localhost:8000/api/project/", {
        title: projectTitle,
        song_id: songId,
        user_id: user,
        notes: ""
      })
      .then((res) => {
        console.log("PROJECT----------", res.data.projectId);
        setProjectId(res.data.projectId);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    saveProject();
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
        <Button type="submit" color="var(--tertiary-color)">Save</Button>
      </form>
      {projectId && <Redirect to={`/project/${projectId}`} />}
    </div>
  )
}
