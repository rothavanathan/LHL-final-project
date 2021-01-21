import { useState, useEffect } from "react";
import axios from "axios";
import { Divider } from "@material-ui/core";

export default function Notes(props) {
  // const projectId = props.projectId;
  // const existingNote = props.existingNote;

  const { projectId, existingNote, note, setNote } = props;


  const handleNote = (event) => {
    setNote(event.target.value);
  };

  useEffect(() => {
    setNote(existingNote);
  }, [existingNote]);



  return (
    <div>
      <h1>Project Notes:</h1>
      <textarea
        onChange={handleNote}
        value={note}
        type="text"
        name="notes_area"
      ></textarea>
    </div>

  )
}