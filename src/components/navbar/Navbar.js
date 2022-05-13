// styles:
import "./Navbar.css";

import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <ul>
        <div className="nav-tabs">
          <li className="nav-tab">Blogs</li>
          <li className="nav-tab">Authors</li>
          <li className="nav-tab">Tags</li>
        </div>
        <li className="nav-create-btn">
          <Link to="/create">Add Blog</Link>
        </li>
      </ul>
    </nav>
  );
}
