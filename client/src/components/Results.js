import { Fragment } from "react";
import Song from "./Song";

export default function Results(props) {
  const { results, setSong } = props;

  return results.map(song => {
    return (
      <Fragment>
        <Song
          setSong={setSong}
          key={song.trackId}
          {...song}
          songData={song}
          width={1 / 4} />
      </ Fragment>
    );
  });
}
