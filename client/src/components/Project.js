import Player from "./Player";

export default function Project(props) {
  return (
    <div>
      <h1>I AM Project</h1>
      <Player tracks={props.tracks}></Player>
    </div>
  )
}
