//for development -> click through to test userflows
import { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';


export default function Register(props) {
  const { setUser, isLoggedIn } = props;
  const [nameData, setNameData] = useState("");
  const [emailData, setEmailData] = useState("");
  const [passwordData, setPasswordData] = useState("");

  // const [user, setUser] = useState({
  //   first_name: "",
  //   email: "",
  //   password: "",
  // });

  // useEffect(() => {
  //   saveUser()
  // }, []);

  const saveUser = () => {
    axios
      .post("/api/users", {
        first_name: nameData,
        email: emailData,
        password: passwordData,
      })
      .then((res) => {
        setUser(res.data.userId);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`in handleSubmit. event is `, event);
    saveUser(); // Save games when form is submitted
  };

  const handleName = (event) => {
    setNameData(event.target.value);
  };

  const handleEmail = (event) => {
    setEmailData(event.target.value);
  };

  const handlePassword = (event) => {
    setPasswordData(event.target.value);
  };

  return !isLoggedIn ? (
    <div>
      <Link to="/login">Login</Link>
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

        <button type="submit">Register</button>
      </form>
    </div>
  ) : <Redirect to="/home"/> ;
}
