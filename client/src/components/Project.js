import { useState, useEffect } from "react";
import { Link, Redirect, useParams } from "react-router-dom";
import axios from 'axios';

import Player from "./Player";
import ProjectNav from "./ProjectNav";
import Notes from "./Notes"

export default function Project(props) {
  const [content, setContent] = useState([{ title: "", artist: "", url: "" }])
  const [collections, setCollections] = useState([{ name: "", user_id: "", thumbnail: "" }])
  const [collectionId, setCollectionId] = useState()

  const { isLoggedIn } = props;
  const { id } = useParams()

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



  // console.log("CONTENT----------", content);

  const stems = content.map((project) => {
    const { title, url, icon, peaks_array, name } = project
    return { title, url, icon, peaks_array, name }
  })

  // console.log("I AM CONTENT ZERO DO I HAVE A NOTE", content[0].notes);

  return isLoggedIn ? (
    <div>
      <Link to="/home">Back to Home</Link>
      <h1>{content[0].title}</h1>
      <h2>{content[0].artist}</h2>
      <h3>collections</h3>
      <ul>
        {collections.map(collection => {
          return <li>{collection.name}</li>
        })}
      </ul>


      <Player tracks={stems}></Player>
      {content[0] && <Notes projectId={id} existingNote={content[0].notes} />}
      <ProjectNav />
    </div>
  ) : (
      <Redirect to="/" />
    );
}