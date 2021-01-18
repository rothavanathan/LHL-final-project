import { useState, useEffect } from 'react';
import { Link, Redirect } from "react-router-dom";
import Nav from "./Nav";
import axios from 'axios';

export default function Home(props) {
  const { isLoggedIn } = props;

  const [collections, setCollections] = useState([])
  const [projects, setProjects] = useState([])

  useEffect(() => {
    if (isLoggedIn) {
      axios
      .get('/api/content')
      .then(data => {

        setCollections(data.data.collections);
        setProjects(data.data.projects);
      })
    }
  }, [collections, projects]);

  return isLoggedIn ? (
    <div>
      <Link to="/gear">Gear</Link>
      <h1>I AM Home</h1>
      <section>
        <header>Recent Collections</header>
        <ul>
          <li>+ Collections</li>
          {collections.map((collection, i) =>
            <li key={i}>{collection.name}</li>)}

        </ul>
      </section>
      <section>
        <header>Recent Projects</header>
        <ul>
          <li>+ Project</li>
          {projects.map((project, i) =>
            <li key={i}>{project.title}</li>)}
          <li>
            <Link to="/project">Burial Ground - guitar part</Link>
          </li>
        </ul>
      </section>
      <Nav />
    </div>
  ) : (
    <Redirect to="/" />
  );
}
