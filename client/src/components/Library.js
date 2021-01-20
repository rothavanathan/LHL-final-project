import { useState, useEffect } from 'react';
import axios from "axios"
import Nav from "./Nav";
import NewCollection from "./NewCollection"
import { Redirect, Link } from "react-router-dom";

export default function Library(props) {
  const [collections, setCollections] = useState([])
  const [projects, setProjects] = useState([])
  const [isCollectionFormOpen, setIsCollectionFormOpen] = useState(false)
  const { isLoggedIn } = props;

  useEffect(() => {
    axios
      .get('/api/content')
      .then(data => {
        setCollections(data.data.collections);
        setProjects(data.data.projects);
      })
  }, []);


  const openCollectionForm = () => {
    setIsCollectionFormOpen(true)
  }

  const closeCollectionForm = () => {
    setIsCollectionFormOpen(false)
  }

  return isCollectionFormOpen ? (
    <NewCollection closeForm={closeCollectionForm} user={isLoggedIn} setCollections={setCollections} />


  )
    :
    (
      <div>
        <h1>I AM Library</h1>
        <section>
          <header>Recent Collections</header>
          <ul>
            <li onClick={openCollectionForm}>
              + Collections
          </li>
            {collections.map((collection, i) =>
              <li key={i}>{collection.name}</li>)}

          </ul>
        </section>
        <section>
          <header>Recent Projects</header>
          <ul>
            <li>+ Project</li>
            {projects.map((project, i) =>
              <li key={i}>
                <Link to={`/project/${project.id}`}>{project.title}</Link>
              </li>
            )}
          </ul>
        </section>
        <Nav />
      </div >
    )
}