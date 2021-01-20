import { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

export default function NewCollectionForm(props) {
  const { user, setCollections, closeForm } = props;
  // const { setUser, isLoggedIn } = props;
  const [collectionName, setCollectionName] = useState("");
  const [collectionId, setCollectionId] = useState("");

  const saveCollection = () => {
    axios
      .put("http://localhost:8000/api/collection/new", {
        name: collectionName,
        user_id: user
      })
      .then((res) => {
        console.log("DATA----------", res.data);

        console.log("COLECTION----------", res.data.collectionId);
        setCollections(prev => {
          return [...prev, res.data.data]
        })
        closeForm(false)
      })
      .catch((err) => console.log(err));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    saveCollection();
  };

  const handleCollection = (event) => {
    setCollectionName(event.target.value);
  };

  return (
    <div>
      <Link to="/home">Home</Link>
      <h1>I AM NEW Collection</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={collectionName}
          onChange={handleCollection}
          type="text"
          name="project_name"
          placeholder="Enter Collection Name"
        ></input>
        <button type="submit">Save</button>
      </form>
    </div>
  )
}