import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // Responsible for transitioning between state
  const transition = (newMode, replace = false) => {
    if (!replace) {
      setMode(newMode);
      history.push(newMode);
      setHistory(history);
    } else {
      setMode(newMode);
    }
  };

  // Responsible for cycling back through state history
  const back = () => {
    if (history.length > 1) {
      history.pop();
      setHistory(history);
      setMode(history[history.length - 1]);
    }
  };

  return {
    mode,
    transition,
    back,
  };
}