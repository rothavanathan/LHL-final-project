import axios from "axios";
import { Link } from "react-router-dom";

export default function Gear() {
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
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Link to="/home">Home</Link>
      <h1>I AM Gear/ Settings</h1>
      <form onSubmit={handleSubmit}>
        <button type="submit">LOGOUT</button>
      </form>
    </div>
  );
}
