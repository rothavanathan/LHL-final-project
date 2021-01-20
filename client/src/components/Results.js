import { Fragment } from "react";

import Song from "./Song";

export default function Results(props) {
  const { results } = props;

  return results.map(song => {
    return (
      <Fragment>
        <Song
          key={song.trackId} {...song}
          width={1 / 4} />

      </Fragment>
    );
  });
}
