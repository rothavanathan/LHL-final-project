import { useState, useEffect } from 'react';
import { Link, Redirect } from "react-router-dom";
import Nav from "./Nav";
import axios from 'axios';

export default function Home(props) {
  const { isLoggedIn } = props;

  const [collections, setCollections] = useState([])
  const [projects, setProjects] = useState([])

  useEffect(() => {
    axios
      .get('/api/content')
      .then(data => {
        setCollections(data.data.collections);
        setProjects(data.data.projects);
      })
  }, []);

  return isLoggedIn ? (
    <div>
      <Link to="/gear">Gear</Link>
      <Link to="/song">Song</Link>
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
            <li key={i}>
              <Link to={`/project/${project.id}`}>{project.title}</Link>
            </li>
          )}
        </ul>
      </section>
      <Nav />
    </div>
  ) : (
      <Redirect to="/" />
    );
}
