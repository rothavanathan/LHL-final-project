import React, { useState } from "react";

import { makeStyles } from '@material-ui/core/styles';

import Waveform from "./Waveform";
import Emitter from "../EventEmitter"

const useStyles = makeStyles((theme) => ({
  waveform: {
    height: "60px"
  }
}));

export default function Player({ tracks, audioCtx }) {
  const classes = useStyles();
  // const [playing, setPlay] = useState(false);
  // const handlePlayPause = () => {
  //   setPlay(!playing);
  //   Emitter.emit('clickPlayPause', "");
  // };
  // const handleRewind = () => {
  //   Emitter.emit('clickRewind', setPlay(playing));
  // };


  console.log("TRACKS-------", tracks)

  return (
    <div className="player">
      {tracks.map((track, i) => {
        return track.url && <Waveform
          key={i}
          track={track}
          context={audioCtx}
          className={classes.waveform} />
      })}
      {/* <div id="transport">

        <button onClick={handleRewind}>Rewind</button>
        <button onClick={handlePlayPause}>{!playing ? "Play" : "Pause"}</button>
      </div> */}
    </div>
  );
};

