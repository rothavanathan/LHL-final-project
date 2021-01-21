import { useState, useEffect } from "react";
import { Link, Redirect, useParams, Prompt } from "react-router-dom";
import axios from 'axios';

import Player from "./Player";
import ProjectNav from "./ProjectNav";
import Notes from "./Notes"
import AddProjectToCollection from "./AddProjectToCollection"

export default function Project(props) {
  const [content, setContent] = useState([{ title: "", artist: "", url: "" }])
  const [collections, setCollections] = useState([{ name: "", user_id: "", thumbnail: "" }])
  const [collectionId, setCollectionId] = useState()
  const [note, setNote] = useState("");

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


  const OGcollectionId = content[0].collection_id
  // console.log("CONTENT----------", content);

  const stems = content.map((project) => {
    const { title, url, icon, peaks_array, name } = project
    return { title, url, icon, peaks_array, name }
  })

  const check = () => {

    if (content[0].notes !== note || collectionId !== OGcollectionId) {
      return true
    } else {
      return false
    }
  }


  // console.log("I AM CONTENT ZERO DO I HAVE A NOTE", content[0].notes);

  return isLoggedIn ? (
    <div>
      <Link to="/home">Back to Home</Link>
      <h1>{content[0].title}</h1>
      <h2>{content[0].artist}</h2>
      <h3>collections</h3>
      <ul>

      </ul>
      <AddProjectToCollection collections={collections} collectionId={collectionId} setCollectionId={setCollectionId} ></AddProjectToCollection>


      <Player tracks={stems}></Player>
      {content[0] && <Notes projectId={id} existingNote={content[0].notes} note={note} setNote={setNote} />}
      <ProjectNav />
      <Prompt
        when={check()}
        message={"Don't you want to saaaaaaave!?"}
      />
    </div>
  ) : (
      <Redirect to="/" />
    );
}