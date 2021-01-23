import { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { Input, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  input: {
    color: "var(--black)",
    backgroundColor: "var(--white)",
    border: "none",
    borderBottom: "var(--tertiary-color) 2px solid",
    width: "100%",
    marginTop: "1em",
    fontSize: ".9em"
  }
}));

export default function NewProjectForm(props) {
  const classes = useStyles();
  const { songId, user } = props;
  // const { setUser, isLoggedIn } = props;
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
        <Input className={classes.input}
          value={projectTitle}
          onChange={handleProject}
          type="text"
          name="project_name"
          placeholder="Ready? Name your new project!"
        ></Input>
        <Button type="submit" color="primary">Save</Button>
      </form>
      {projectId && <Redirect to={`/project/${projectId}`} />}
    </div>
  )
}
