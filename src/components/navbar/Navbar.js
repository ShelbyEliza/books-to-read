// styles:
import styles from "./Navbar.module.css";

import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";

import { NavLink } from "react-router-dom";

export default function Navbar() {
  const { logout, isPending } = useLogout();
  const { user, isUserVerified } = useAuthContext();

  return (
    <nav>
      <ul className={styles.list}>
        {!user && (
          <div className={styles["admin-tabs"]}>
            <li>
              <NavLink className={styles["admin-tab"]} to="/signup">
                Sign Up
              </NavLink>
            </li>
            <li>
              <NavLink className={styles["admin-tab"]} to="/login">
                Log In
              </NavLink>
            </li>
            <li>
              <NavLink className={styles["admin-tab"]} to="/guest">
                Guest Content
              </NavLink>
            </li>
          </div>
        )}

        {user && (
          <>
            {isUserVerified && (
              <>
                <li>
                  <NavLink
                    className={`${styles.section} ${styles["create-tab"]}`}
                    to="/create"
                  >
                    Add Blog
                  </NavLink>
                </li>

                <div className={`${styles.middle} ${styles.section}`}>
                  <li>
                    <NavLink className={styles["nav-tab"]} to="/AllBlogs">
                      Blogs
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className={styles["nav-tab"]} to="/AllAuthors">
                      Authors
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={styles["nav-tab"]}
                      to="/browse"
                      state={{ from: false }}
                    >
                      Browse
                    </NavLink>
                  </li>
                </div>
              </>
            )}

            {!isUserVerified && (
              <li>
                <NavLink className={styles["admin-tab"]} to="/guest">
                  Guest Content
                </NavLink>
              </li>
            )}

            {!isPending ? (
              <li className={`${styles.section} ${styles.logout}`}>
                <button onClick={logout}>
                  <span>
                    Logout,<br></br>
                    {user.displayName}?
                  </span>
                </button>
              </li>
            ) : (
              <li className={`${styles.section} ${styles.logout}`}>
                <button disabled>Logging Out...</button>
                <p className={styles["user-name"]}>{user.displayName}?</p>
              </li>
            )}
          </>
        )}
      </ul>
    </nav>
  );
}
