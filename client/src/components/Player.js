import React from "react";
import Waveform from "./Waveform";

const AudioCtx = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioCtx();

const Player = ({ tracks }) => {
  return (
    <div className="player">
      {tracks.map((track, i) => {
        return <Waveform key={i} url={track.url} context={audioCtx} />
      })};
    </div>
  );
};

export default Player;
