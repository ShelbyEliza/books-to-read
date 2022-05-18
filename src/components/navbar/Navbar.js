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
          <div className="admin-tabs">
            <li className="admin-tab">
              <Link to="/signup">Sign Up</Link>
            </li>
            <li className="admin-tab">
              <Link to="/login">Log In</Link>
            </li>
          </div>
        )}

        {user && (
          <>
            <div className="section side nav-create-btn">
              <li>
                <Link to="/create">Add Blog</Link>
              </li>
            </div>

            <div className="middle section">
              <li className="nav-tab">Blogs</li>
              <li className="nav-tab">Authors</li>
              <li className="nav-tab">Tags</li>
            </div>
            <div className="user-tab section side">
              <li>
                {!isPending && <button onClick={logout}>Logout,</button>}
                {isPending && <button disabled>Logging Out...</button>}
              </li>
              <p className="user-name">{user.displayName}?</p>
            </div>
          </>
        )}
      </ul>
    </nav>
  );
}
