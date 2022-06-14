// styles:
import styles from "./Navbar.module.css";

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
          <div className={styles["admin-tabs"]}>
            <li className={styles["admin-tab"]}>
              <Link to="/signup">Sign Up</Link>
            </li>
            <li className={styles["admin-tab"]}>
              <Link to="/login">Log In</Link>
            </li>
          </div>
        )}

        {user && (
          <>
            <div
              className={`${styles.section} ${styles.side} ${styles["nav-create-btn"]}`}
            >
              <li>
                <Link to="/create">Add Blog</Link>
              </li>
            </div>

            <div className={`${styles.middle} ${styles.section}`}>
              <li className={styles["nav-tab"]}>
                <Link to="/AllBlogs">All Blogs</Link>
              </li>
              <li className={styles["nav-tab"]}>
                <Link to="/AllAuthors">Authors</Link>
              </li>
              <li className={styles["nav-tab"]}>
                <Link to="#">Tags</Link>
              </li>
            </div>
            <div
              className={`${styles["user-tab"]} ${styles.section} ${styles.side}`}
            >
              <li>
                {!isPending && <button onClick={logout}>Logout,</button>}
                {isPending && <button disabled>Logging Out...</button>}
              </li>
              <p className={styles["user-name"]}>{user.displayName}?</p>
            </div>
          </>
        )}
      </ul>
    </nav>
  );
}
