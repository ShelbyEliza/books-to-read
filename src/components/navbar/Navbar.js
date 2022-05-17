// styles:
import "./Navbar.css";

import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";

import { Link } from "react-router-dom";

export default function Navbar() {
  const { logout, isPending } = useLogout();
  const { user } = useAuthContext();

  return (
    <nav>
      <ul>
        {!user && (
          <>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
            <li>
              <Link to="/login">Log In</Link>
            </li>
          </>
        )}

        {user && (
          <>
            <li>
              {!isPending && (
                <button className="btn" onClick={logout}>
                  Logout
                </button>
              )}
              {isPending && (
                <button className="btn" disabled>
                  Logging Out...
                </button>
              )}
            </li>
            <div className="nav-tabs">
              <li className="nav-tab">Blogs</li>
              <li className="nav-tab">Authors</li>
              <li className="nav-tab">Tags</li>
            </div>
            <li className="nav-create-btn">
              <Link to="/create">Add Blog</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
