// styles:
import styles from "./MobileNavMenu.module.css";

import { Link } from "react-router-dom";

export default function MobileNavMenu({ logout, user }) {
  return (
    <div className={styles["mobile-nav-menu"]}>
      <li>
        <Link className={styles["mobile-nav-tab"]} to="/create">
          Add Blog
        </Link>
      </li>
      <li>
        <Link className={styles["mobile-nav-tab"]} to="/AllBlogs">
          Blogs
        </Link>
      </li>
      <li>
        <Link className={styles["mobile-nav-tab"]} to="/AllAuthors">
          Authors
        </Link>
      </li>
      <li>
        <Link
          className={styles["mobile-nav-tab"]}
          to="/browse"
          state={{ from: false }}
        >
          Browse
        </Link>
      </li>
      <li className={styles["mobile-logout-tab"]}>
        <button onClick={logout} className={styles["mobile-nav-tab"]}>
          Logout, {user.displayName}?
        </button>
      </li>
    </div>
  );
}
