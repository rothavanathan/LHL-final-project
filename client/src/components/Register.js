//for development -> click through to test userflows
import { Link } from "react-router-dom";

export default function Register(props) {
  return (
    <div>
      <h1>I AM Register</h1>
      <form>
        <input
          type="first_name"
          name="first_name"
          placeholder="Gary"
          aria-label="first_name"
        ></input>

        <input
          type="email"
          name="email"
          placeholder="example@gmail.com"
          aria-label="email"
        ></input>

        <input
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
