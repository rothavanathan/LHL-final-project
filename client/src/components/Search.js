import Nav from "./Nav";
import { Redirect } from "react-router-dom";

export default function Search(props) {
  const { isLoggedIn } = props;
  return isLoggedIn ? (
    <div>
      <h1>I AM Search</h1>
      <Nav />
    </div>
  ) : (
    <Redirect to="/" />
  );
}
