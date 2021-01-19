import { useState } from "react";
import axios from "axios";

export default function Notes(props) {
  const [note, setNote] = useState("");

  const handleNote = (event) => {
    setNote(event.target.value);
  };

  const saveNote = () => {
    axios
      .post("/api/users", {
        // first_name: nameData,
        // email: emailData,
        // password: passwordData,
      })
      .then((res) => {
        setNote(res);
        console.log(`from put request`, res);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`in handleSubmit. event is `, event);
    saveNote(); // Save games when form is submitted
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