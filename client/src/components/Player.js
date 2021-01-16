import React, { useState } from "react";
import Waveform from "./Waveform";
import Emitter from "../EventEmitter"

const AudioCtx = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioCtx();

const Player = ({ tracks }) => {
  const [playing, setPlay] = useState(false);
   const handlePlayPause = () => {
    setPlay(!playing);
    Emitter.emit('click', setPlay(playing));
  };
  return (
    <div className="player">
      <button onClick={handlePlayPause}>{!playing ? "Play" : "Pause"}</button>
      {tracks.map((track, i) => {
        return <Waveform key={i} url={track.url} context={audioCtx} />
      })};
    </div>
  );
};

export default Player;
