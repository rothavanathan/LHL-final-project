import { Link } from "react-router-dom";

export default function Nav(props) {
  return (
    <div>
      <Link to="/home">Home</Link>
      <Link to="/search">Search</Link>
      <Link to="/library">Library</Link>
    </div>

  );
}
