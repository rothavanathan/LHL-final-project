import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { Fragment } from "react";

export default function Gear(props) {
  const { isLoggedIn, setUser } = props;

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`in handleSubmit. event is `, event);
    logoutUser(); // Save games when form is submitted
  };

  const logoutUser = () => {
    axios
      .get("/api/users/logout")
      .then((res) => {
        console.log(`user is logged out. check cookies to confirm!`);
        setUser(null);
      })
      .catch((err) => console.log(err));
  };

  return isLoggedIn ? (
    <div>
      <Link to="/home">Home</Link>
      <h1>I AM Gear/ Settings</h1>
      <form onSubmit={handleSubmit}>
        <button type="submit">LOGOUT</button>
      </form>
    </div>
  ) : (
    <Redirect to="/" />
  );
}
