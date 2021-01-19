import { useState, useEffect } from "react";
import axios from "axios";

export default function Notes(props) {
  const projectId = props.projectId;
  const existingNote = props.existingNote;
  const [note, setNote] = useState(existingNote);

  const handleNote = (event) => {
    setNote(event.target.value);
  };

  const saveNote = () => {
    axios
      .put("http://localhost:8000/api/project/addnote", {
        id: projectId,
        notes: note
      })
      .then((res) => {
        console.log(`from put request`, res);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    saveNote();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Project Notes:</h1>
      <textarea
        onChange={handleNote}
        value={note}
        type="text"
        name="notes_area"
      ></textarea>
      <button type="submit">Save Note</button>
    </form>
  )
}