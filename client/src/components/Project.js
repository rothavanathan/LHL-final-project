import { useState, useEffect } from "react";
import { Link, Redirect, useParams } from "react-router-dom";
import axios from 'axios';

import Player from "./Player";
import ProjectNav from "./ProjectNav";
import Notes from "./Notes"

export default function Project(props) {
  const [content, setContent] = useState([{ title: "", artist: "", url: "" }])
  const [collections, setCollections] = useState([{ name: "", user_id: "", thumbnail: "" }])

  const { isLoggedIn } = props;
  const { id } = useParams()

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/project/${id}`)
      .then(() => {
        axios.get('/api/content')
          .then(data => setContent(data.data.projects))
          .catch(err => console.log(err))
      })
  }, [])



  console.log("CONTENT----------", content);

  const stems = content.map((project) => {
    const { title, url, icon, peaks_array, name } = project
    return { title, url, icon, peaks_array, name }
  })

  console.log("I AM CONTENT ZERO DO I HAVE A NOTE", content[0].notes);

  return isLoggedIn ? (
    <div>
      <Link to="/home">Back to Home</Link>
      <h1>{content[0].title}</h1>
      <h2>{content[0].artist}</h2>
      <Player tracks={stems}></Player>
      {content[0] && <Notes projectId={id} existingNote={content[0].notes} />}
      <ProjectNav />
    </div>
  ) : (
      <Redirect to="/" />
    );
}