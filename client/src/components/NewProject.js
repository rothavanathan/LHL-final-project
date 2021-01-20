import { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

export default function NewProjectForm(props) {
  const { songId, user } = props;
  // const { setUser, isLoggedIn } = props;
  const [projectTitle, setProjectTitle] = useState("");
  const [projectId, setProjectId] = useState("");

  const saveProject = () => {
    axios
      .put("http://localhost:8000/api/project/new", {
        title: projectTitle,
        song_id: songId,
        user_id: user
      })
      .then((res) => {
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
      <p>Add New Project?</p>
      <form onSubmit={handleSubmit}>
        <input
          value={projectTitle}
          onChange={handleProject}
          type="text"
          name="project_name"
          placeholder="Enter Project Name"
        ></input>
        <button type="submit">Save</button>
      </form>
    </div>
  )
}
