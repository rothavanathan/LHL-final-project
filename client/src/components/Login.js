//for development -> click through to test userflows
import { Link } from "react-router-dom";

export default function Login(props) {
  return (
    <div>
      <h1>I AM Login</h1>
      <form>
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
          <Link to="/home">Login</Link>
        </button>
      </form>
    </div>
  );
}
