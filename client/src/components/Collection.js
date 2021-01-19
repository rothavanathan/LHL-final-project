import { Redirect } from "react-router-dom";
export default function Collection(props) {
  const { isLoggedIn, } = props;

  return isLoggedIn ? (
  <h1>I AM Collection</h1> ) : (
  <Redirect to="/" />
  );
}
