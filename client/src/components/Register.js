//for development -> click through to test userflows
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Register(props) {
  const [nameData, setNameData] = useState("");
  const [emailData, setEmailData] = useState("");
  const [passwordData, setPasswordData] = useState("");

  const [user, setUser] = useState({
    first_name: "",
    email: "",
    password: ""
  });

    // useEffect(() => {
    //   saveUser()
    // }, []);

  const saveUser = () => {

    axios
      .post("/users", {
        first_name: nameData,
        email: emailData,
        password: passwordData
      })
      .then((res) => {
        setUser(res.rows);
        console.log(`from put request`, res.rows)
      })
      .catch((err) => console.log(err));

  }

  const handleSubmit = (event) => {
    // event.preventDefault()

    saveUser() // Save games when form is submitted
  }

  const handleName = (event) => {
    setNameData(event.target.value)
  }

  const handleEmail = (event) => {
    setEmailData(event.target.value)
  }

  const handlePassword = (event) => {
    setPasswordData(event.target.value)
  }

  return (
    <div>
      <h1>I AM Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleName}
          type="first_name"
          value={nameData}
          name="first_name"
          placeholder="Gary"
          aria-label="first_name"
        ></input>

        <input
          value={emailData}
          onChange={handleEmail}
          type="email"
          name="email"
          placeholder="example@gmail.com"
          aria-label="email"
        ></input>

        <input
          value={passwordData}
          onChange={handlePassword}
          type="password"
          name="password"
          placeholder="your password here"
          aria-label="password"
        ></input>

        <button type="submit">
          Register
        </button>
      </form>
    </div>
  );
}
