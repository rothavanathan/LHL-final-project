import React, { useEffect, useRef, useState } from "react";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import '../RangeInput.css';
import WaveSurfer from "wavesurfer.js";
import Emitter from "../EventEmitter";

export default function Waveform({
  track,
  context,
  setLoadCounter
}) {

  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [soloed, setSolo] = useState(false);

  const useStyles = makeStyles({
    box: {
      display: "flex",
      alignItems: "center",
      color: "var(--white)",
    },
    stemTitle: {
      color: "var(--white)",
      flexBasis: "50%",
    },
    input: {
      // color: "primary"
    },
    muteButton: {
      color: `${!isMuted ? "var(--primary-color)" : "var(--quad-color)"}`,
      "&:hover": {
        color: "var(--white)",
        backgroundColor: "rgba(244, 240, 234, 0.1);"
      },
      "&:active": {
        color: "var(--secondary-color)",
      },
    },
    soloButton: {
      color: `${!soloed ? "var(--primary-color)" : "var(--secondary-color)"}`,
      "&:hover": {
        color: "var(--white)",
        backgroundColor: "rgba(244, 240, 234, 0.1);"
      },
      "&:active": {
        color: "var(--quad-color)",
      },
    },
    hr: {
      marginBottom: 20,
    }

  });
  const classes = useStyles()

  const formWaveSurferOptions = (ref) => ({
    container: ref,
    waveColor: "#F5F5DC",
    progressColor: "rgb(245, 103, 93)",
    cursorColor: "rgb(245, 103, 93)",
    barMinHeight: 1,
    barWidth: 3,
    barRadius: 3,
    responsive: true,
    height: 80,
    // If true, normalize by the maximum peak instead of 1.0.
    normalize: true,
    // Use the PeakCache to improve rendering speed of large waveforms.
    partialRender: true,
    audioContext: context,
    backend: 'WebAudio',
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

      //tell player object that the waveform is loaded
      setLoadCounter(prev => prev + 1)
      Emitter.on("clickRewind", () => wavesurfer.current.seekTo(0));
      Emitter.on("clickPlayPause", () => wavesurfer.current.playPause());
    });

    //one for all - when one wavefrom performs a seekTo emit event with currentTime as argument
    wavesurfer.current.on("seek", function (progress) {
      //emit seekAll event
      Emitter.emit("seekAll", wavesurfer.current.getCurrentTime());
    });

    //update other waveforms with progress from clicked
    Emitter.on("seekAll", (progress) => {
      if (progress !== wavesurfer.current.getCurrentTime()) {
        wavesurfer.current.setCurrentTime(progress);
      }
    });

    Emitter.on("soloON", () => {
      if (!wavesurfer.current.solo && !wavesurfer.current.getMute()) {
        wavesurfer.current.setMute(true);
      } else if (!wavesurfer.current.solo && wavesurfer.current.getMute()) {
      } else if (wavesurfer.current.solo) {
        wavesurfer.current.setMute(false);
      }
    });


    Emitter.on("soloOFF", () => {
      wavesurfer.current.solo = false;
      setSolo(false);
      if (!wavesurfer.current.wasMuted) {
        wavesurfer.current.setMute(false);
        setIsMuted(false);
      } else {
        wavesurfer.current.setMute(true);
        setIsMuted(true);
      }
    });
    return () => {
      wavesurfer.current.unAll();
      wavesurfer.current.destroy();
    };
  }, [track.url]);

  const handleMute = () => {
    setIsMuted(!isMuted);
    wavesurfer.current.toggleMute();
    wavesurfer.current.wasMuted = wavesurfer.current.getMute();
  };

  const handleSolo = () => {
    setSolo(!soloed);
    //not soloed and isMuted
    if (!wavesurfer.current.solo && isMuted) {
      wavesurfer.current.toggleMute();
      wavesurfer.current.solo = true;
      //not soloed and not isMuted
    } else if (!wavesurfer.current.solo && !isMuted) {
      wavesurfer.current.solo = true;
    } else if (wavesurfer.current.solo) {
      wavesurfer.current.solo = false;
    }
  };

  useEffect(() => {
    Emitter.emit(`${soloed ? "soloON" : "soloOFF"}`);
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
      <Box className={classes.box}>
        <Typography className={classes.stemTitle} component="h3">
          {track.name}
        </Typography>

        <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
          <Button className={classes.muteButton} onClick={handleMute}>M</Button>
          <Button className={classes.soloButton} onClick={handleSolo}>S</Button>
        </ButtonGroup>

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
          value={volume}
        />
        <label htmlFor="volume"></label>
      </Box>
      <hr className={classes.hr} />
    </div>
  );
}
