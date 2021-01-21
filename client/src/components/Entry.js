import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';


export default function Entry(props) {
  return (
    <div>
      <h1>I AM ENTRY</h1>
      <Link to="/login">
        <button>Login</button>
      </Link>
      <Link to="/register">
        <button>Register</button>
      </Link>
    </div>
  );
}
