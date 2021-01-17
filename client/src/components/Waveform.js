import React, { useEffect, useRef, useState } from "react";

import WaveSurfer from "wavesurfer.js";
import Emitter from "../EventEmitter"



export default function Waveform({ track, context }) {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [volume, setVolume] = useState(0.5);
  const [muted, setMute] = useState(false);
  const [soloed, setSolo] = useState(false);

  const formWaveSurferOptions = (ref) => ({
    container: ref,
    waveColor: "#eee",
    progressColor: "OrangeRed",
    cursorColor: "OrangeRed",
    barWidth: 3,
    barRadius: 3,
    responsive: true,
    height: 150,
    // If true, normalize by the maximum peak instead of 1.0.
    normalize: true,
    // Use the PeakCache to improve rendering speed of large waveforms.
    partialRender: true,
    audioContext: context
  });

  // create new WaveSurfer instance
  // On component mount and when url changes
  useEffect(() => {

    const options = formWaveSurferOptions(waveformRef.current);
    wavesurfer.current = WaveSurfer.create(options);
    wavesurfer.current.solo = false;

    wavesurfer.current.load(track.url);

    wavesurfer.current.on("ready", function () {
      // make sure object stillavailable when file loaded
      if (wavesurfer.current) {
        wavesurfer.current.setVolume(volume);
        setVolume(volume);
      }


      Emitter.on('clickRewind', () => wavesurfer.current.seekTo(0));
      Emitter.on('clickPlayPause', () => wavesurfer.current.playPause());

    });


    //one for all - when one wavefrom performs a seekTo emit event with currentTime as argument
    wavesurfer.current.on("seek", function (progress) {
      //emit seekAll event
      Emitter.emit('seekAll', wavesurfer.current.getCurrentTime())
    });

    //update other waveforms with progress from clicked
    Emitter.on('seekAll', (progress) => {
      if (progress !== wavesurfer.current.getCurrentTime()) {
        wavesurfer.current.setCurrentTime(progress)
      }
    })

    Emitter.on("soloON", () => {
      // console.log(`somone turned a solo ON. fire off shouldIPlay`)
      // console.log(`${track.name} is ${muted ? "muted" : "not muted"} and am ${soloed ? "soloed" : "not soloed"}`)
      if (!wavesurfer.current.solo && !wavesurfer.current.getMute()) {
        wavesurfer.current.toggleMute();
      } else {
        console.log(`${track.name} SHOULD HIT HERE`)
      };
    })

    Emitter.on("soloOFF", () => {
      console.log(`somone turned a solo OFF. fire off shouldIPlay`)
      console.log(`${track.name} is ${muted ? "muted" : "not muted"} and am ${soloed ? "soloed" : "not soloed"}`)
    })
    // Removes events, elements and disconnects Web Audio nodes.
    // when component unmount
    return () => {
      wavesurfer.current.unAll();
      wavesurfer.current.destroy();
    };
  }, [track.url]);

  const handleMute = () => {
    setMute(!muted);
    wavesurfer.current.toggleMute();
  };

  const handleSolo = () => {
    setSolo(!soloed)
    if (!wavesurfer.current.solo && muted) {
      wavesurfer.current.toggleMute();
      wavesurfer.current.solo = true;
    } else if (!wavesurfer.current.solo && !muted) {
      wavesurfer.current.solo = true;
    } else if (wavesurfer.current.solo) {
      wavesurfer.current.solo = false;
    }

    // Emitter.emit(`${soloed ? 'soloON' : 'soloOFF'}`)
  };

  useEffect(() => {
    Emitter.emit(`${soloed ? 'soloON' : 'soloOFF'}`)
  }, [soloed]);


  const onVolumeChange = (e) => {
    const { target } = e;
    const newVolume = +target.value;

    if (newVolume) {
      setVolume(newVolume);
      wavesurfer.current.setVolume(newVolume || 1);
    }
  };

  return (
    <div>
      <div id="waveform" ref={waveformRef} />
      <div className="controls">
        <h2>{track.name}</h2>
        <button
          className={!muted ? "mute" : "unmute"}
          onClick={handleMute}
        > Mute
        </button>
        <button
          className={!soloed ? "solo" : "unsolo"}
          onClick={handleSolo}
        > Solo
        </button>
        <input
          type="range"
          id="volume"
          name="volume"
          // waveSurfer recognize value of `0` same as `1`
          //  so we need to set some zero-ish value for silence
          min="0.01"
          max="1"
          step=".025"
          onChange={onVolumeChange}
          defaultValue={volume}
        />
        <label htmlFor="volume">Volume</label>
      </div>
    </div>
  );
}