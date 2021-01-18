import { Link, Redirect, useParams } from "react-router-dom";
import axios from 'axios';

import Player from "./Player";
import ProjectNav from "./ProjectNav";

export default function Project(props) {
  const { isLoggedIn } = props;
  const {id} = useParams()

  axios
    .get(`api/project/${id}`)
    .then(data => console.log(data))
    .catch(err => console.log(err))



  return isLoggedIn ? (
    <div>
      <Link to="home">Back to Home</Link>
      <h1>Burial Ground - Charlie learning guitar part</h1>
      <p>Project Id is {id}</p>
      <Player tracks={[]}></Player>
      <ProjectNav />
    </div>
  ) : (
    <Redirect to="/" />
  );
}