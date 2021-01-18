//for development -> click through to test userflows
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Login(props) {
  const [emailData, setEmailData] = useState("");
  const [passwordData, setPasswordData] = useState("");

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const loginUser = () => {
    axios
      .post("/api/users/login", {
        email: emailData,
        password: passwordData,
      })
      .then((res) => {
        setUser(res);
        console.log(`from put request`, res);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`in handleSubmit. event is `, event);
    loginUser(); // Save games when form is submitted
  };

  const handleEmail = (event) => {
    setEmailData(event.target.value);
  };

  const handlePassword = (event) => {
    setPasswordData(event.target.value);
  };

  return (
    <div>
      <h1>I AM Login</h1>
      <form onSubmit={handleSubmit}>
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

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
