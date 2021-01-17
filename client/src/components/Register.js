//for development -> click through to test userflows
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Register(props) {
  const [formData, setFormData] = useState("");
  const [user, setUser] = useState({
    first_name: "",
    email: "",
    password: ""
  });
  
    useEffect(() => {
      saveUser()
    }, []);

  const saveUser = () => {

    axios
      .put(`http://localhost:8000/api/users`, formData)
      .then((res) => {
        console.log(`from get request`, res.data.users)
        setUser(res.data.users);
      })
      .catch((err) => console.log(err));

  }

  const handleSubmit = (event) => {
    event.preventDefault()
    saveUser() // Save games when form is submitted
  }

  const handleChange = (event) => {
    setFormData(event.target.value)
  }

  return (
    <div>
      <h1>I AM Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          type="first_name"
          value={formData}
          name="first_name"
          placeholder="Gary"
          aria-label="first_name"
        ></input>

        <input
          value={formData}
          onChange={handleChange}
          type="email"
          name="email"
          placeholder="example@gmail.com"
          aria-label="email"
        ></input>

        <input
          value={formData}
          onChange={handleChange}
          type="password"
          name="password"
          placeholder="your password here"
          aria-label="password"
        ></input>

        <button type="submit">
          <Link to="/home">Register</Link>
        </button>
      </form>
    </div>
  );
}
