import Nav from "./Nav";
import { Redirect } from "react-router-dom";

export default function Library(props) {
  const { isLoggedIn } = props;

  return isLoggedIn ? (
    <div>
      <h1>I AM Library</h1>
      <Nav />
    </div>
  ) : (
    <Redirect to="/" />
  );
}
