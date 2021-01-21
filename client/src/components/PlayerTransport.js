import React, { useState } from "react";
import Emitter from "../EventEmitter";
import { makeStyles } from '@material-ui/core/styles';

import PlayArrow from '@material-ui/icons/PlayArrow';
import Pause from '@material-ui/icons/Pause';
import FastRewindIcon from '@material-ui/icons/FastRewind';

const useStyles = makeStyles({
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 50,
    background: "#1a1a1a;",
    zIndex: 10,
    color: "rgb(244, 240, 234)"
  }
});

export default function PlayerTransport({ tracks, audioCtx }) {
  const classes = useStyles();
  const [playing, setPlay] = useState(false);
  const handlePlayPause = () => {
    setPlay(!playing);
    Emitter.emit('clickPlayPause', "");
  };
  const handleRewind = () => {
    Emitter.emit('clickRewind', setPlay(playing));
  };


  // console.log("TRACKS-------", tracks)

  return (

    <div id="transport" className={classes.root}>

      <FastRewindIcon style={{ fontSize: 50 }} onClick={handleRewind}>Rewind</FastRewindIcon>
      {!playing ?
        <PlayArrow style={{ fontSize: 50 }} onClick={handlePlayPause}></PlayArrow>
        : <Pause style={{ fontSize: 50 }} onClick={handlePlayPause}></Pause>}
    </div>
  );
};

