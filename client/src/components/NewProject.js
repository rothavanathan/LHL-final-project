import { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

export default function NewProjectForm(props) {
  const { songId } = props;
  // const { setUser, isLoggedIn } = props;
  const [projectTitle, setProjectTitle] = useState("");
  // const [passwordData, setPasswordData] = useState("");

  const saveProject = () => {
    axios
      .put("/api/project/new", {
        title: projectTitle,
      })
      .then((res) => {
        console.log("IN NEW PROJECT", res);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    saveProject();
  };

  const handleProject= (event) => {
    setProjectTitle(event.target.value);
  };

  return (
    <div>
      <Link to="/home">Home</Link>
      <h1>I AM NEW PROJECT</h1>
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
