import { useState, useEffect } from "react";
import { Link, Redirect, useParams } from "react-router-dom";
import axios from "axios";
import ProjectCard from './ProjectCard'
import Nav from './Nav'

export default function Collection(props) {
  const { isLoggedIn, } = props;
  const { id } = useParams();
  const [projects, setProjects] = useState([])

  useEffect(() => {
    axios
      .get(`/api/collection/${id}`)
      .then(data => {
        const data2 = data.data.projects
        const response = []
        if (data2.length > 0) {
          const data2formatted = data2.map(entry => {
            return {
              trackId: entry.id,
              artistName: entry.artist,
              artworkUrl100: entry.url_album_artwork,
              trackName: entry.title,
              collectionName: entry.album,
              previewUrl: entry.url_full_song_preview
            }
          })
          response.push(...data2formatted)
        }
        console.log(response)
        setProjects(response)
      })
  }, []);

  return isLoggedIn ? (
    <div>
      <h1>Your Collections</h1>
      {projects.map(project => {
        return <ProjectCard
          // setSong={setSong}
          key={project.trackId}
          {...project}
          projectData={project}
          width={1 / 4} />
      })}
      <Nav />
    </div>

  ) : (
      <Redirect to="/" />
    );
}
