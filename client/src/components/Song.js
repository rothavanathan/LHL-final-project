import React from "react";
import { Card } from '@material-ui/core';

import classnames from "classnames";

export default function Album(props) {
  const albumInfoClass = classnames("album__info", {
    "album__info--explicit": props.collectionExplicitness === "explicit"
  });

  return (
    <Card
      variant="elevation"
      raised="true"

    >
      <article className="album">
        <img className="album__thumbnail" src={props.artworkUrl100} alt="Album" />
        <div className={albumInfoClass}>
          <div className="song__name">{props.trackName}</div>
          <div className="album__name">{props.collectionName}</div>
          <div className="album__artist">{props.artistName}</div>
        </div>
        <div>Hamburger</div>
      </article>

    </Card>
  );
}
