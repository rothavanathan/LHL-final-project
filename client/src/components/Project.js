import { Link } from "react-router-dom";

import Player from "./Player";
import ProjectNav from "./ProjectNav";

export default function Project(props) {
  return (
    <div>
      <Link to="home">Back to Home</Link>
      <h1>Burial Ground - Charlie learning guitar part</h1>
      <Player tracks={props.tracks}></Player>
      <ProjectNav/>
    </div>
  )
}
