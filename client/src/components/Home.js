import { Link } from "react-router-dom";
import Nav from "./Nav";

export default function Home(props) {
  return (
    <div>
      <Link to="/gear">Gear</Link>
      <h1>I AM Home</h1>
      <section>
        <header>Collections</header>
        <ul>
          <li>+ Collection</li>
          <li>Jack Black - Bass lessons</li>
          <li>AC/DC - Tribute Band setlist</li>
          <li>Favourite Synth Sounds</li>
        </ul>
      </section>
      <section>
        <header>Projects</header>
        <ul>
          <li>+ Project</li>
          <li>Highway to Hell - for Jack</li>
          <li>Highway to Hell - chord chart</li>
          <li>
            <Link to="/project">Burial Ground - guitar part</Link>
          </li>
        </ul>
      </section>
      <Nav />
    </div>
  );
}
