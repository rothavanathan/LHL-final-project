import { Link } from "react-router-dom";

export default function Gear() {
  return (
    <div>
      <Link to="/home">Home</Link>
      <h1>I AM Gear/ Settings</h1>
      <button>
        <Link to="/entry">
          LOGOUT
        </Link>
      </button>
    </div>
  );
}
