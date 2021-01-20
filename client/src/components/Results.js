import { Fragment } from "react";
import SongPreview from "./SongPreview"

import Song from "./Song";

export default function Results(props) {
  const { results } = props;

  return results.map(song => {
    console.log(song)
    return (
      <Fragment>
        <Song
          key={song.trackId} {...song}
          width={1 / 4} />
        <SongPreview />
      </Fragment>
    );
  });
}
