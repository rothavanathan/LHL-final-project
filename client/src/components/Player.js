import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Waveform from "./Waveform";

const useStyles = makeStyles((theme) => ({
  waveform: {
    height: "60px"
  }
}));

export default function Player({ tracks, audioCtx, setHasLoaded }) {
  const classes = useStyles();
  const [loadCounter, setLoadCounter] = useState(0);

  if (loadCounter === tracks.length) {
    setHasLoaded(true);
  }

  return (
    <div className="player">
      {tracks.map((track, i) => {
        return track.url && <Waveform
          key={i}
          track={track}
          context={audioCtx}
          className={classes.waveform}
          setLoadCounter={setLoadCounter} />
      })}
    </div>
  );
};

