import React, { useState } from "react";
import Waveform from "./Waveform";
import Emitter from "../EventEmitter"

const AudioCtx = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioCtx();

const Player = ({ tracks }) => {
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
    <div className="player">
      {tracks.map((track, i) => {
        return track.url && <Waveform key={i} track={track} context={audioCtx} />
      })};
      <div id="transport">

        <button onClick={handleRewind}>Rewind</button>
        <button onClick={handlePlayPause}>{!playing ? "Play" : "Pause"}</button>
      </div>
    </div>
  );
};

export default Player;
