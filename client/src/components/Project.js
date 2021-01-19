import { useState, useEffect } from "react";
import { Link, Redirect, useParams } from "react-router-dom";
import axios from 'axios';

import Player from "./Player";
import ProjectNav from "./ProjectNav";
import Notes from "./Notes"

export default function Project(props) {
  const [content, setContent] = useState([{title: "", artist: "", url: ""}])
  const { isLoggedIn } = props;
  const {id} = useParams()

  useEffect(()=> {
    axios
      .get(`http://localhost:8000/api/project/${id}`)
      .then(data => setContent(data.data.projects))
      .catch(err => console.log(err))
  }, [])

  const stems = content.map((project) => {
    const {title, url, icon, peaks_array} = project
    return {title, url, icon, peaks_array}
  })

  return isLoggedIn ? (
    <div>
      <Link to="/home">Back to Home</Link>
      <h1>{content[0].title}</h1>
      <h2>{content[0].artist}</h2>
      <Player tracks={stems}></Player>
      <Notes />
      <ProjectNav />
    </div>
  ) : (
    <Redirect to="/" />
  );
}