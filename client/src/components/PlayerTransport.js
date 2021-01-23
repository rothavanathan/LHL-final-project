import React, { useState } from "react";
import Emitter from "../EventEmitter";
import { makeStyles } from '@material-ui/core/styles';

import IconButton from '@material-ui/core/IconButton';
import LinearProgress from '@material-ui/core/LinearProgress';
import PlayArrow from '@material-ui/icons/PlayArrow';
import Pause from '@material-ui/icons/Pause';
import FastRewindIcon from '@material-ui/icons/FastRewind';
import { Icon } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 65,
    background: "#1a1a1a;",
    zIndex: 10,
    color: "rgb(244, 240, 234)",
    display: "flex",
    justifyContent: "center",
    padding: 5,
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  icon: {
    marginLeft: 10,
    marginRight: 20,
    fontSize: 50,
    color: "var(--white)"
  },
  progressBar: {
    height: 100,
    color: "white"
  }
}));

export default function PlayerTransport({ hasLoaded }) {
  const classes = useStyles();
  const [playing, setPlay] = useState(false);
  const handlePlayPause = () => {
    if (hasLoaded) {
      setPlay(!playing);
      Emitter.emit('clickPlayPause', "");
    }
  };
  const handleRewind = () => {
    if (hasLoaded) {
      Emitter.emit('clickRewind', setPlay(playing));
    }
  };


  // console.log("TRACKS-------", tracks)

  return (
    <div id="transport" className={classes.root}>
      {/* <LinearProgress className={classes.progressBar} /> */}
      <div>
        <IconButton onClick={handleRewind} aria-label="Rewind">
          <FastRewindIcon className={classes.icon} />
        </IconButton>

        <IconButton className={classes.icon} aria-label="Play/Pause" onClick={handlePlayPause}>
          {playing ? <Pause className={classes.icon} /> : <PlayArrow className={classes.icon} />}
        </IconButton>
      </div>

    </div>
  );
};

