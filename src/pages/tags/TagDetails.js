// styles:
import styles from "../browse/Browse.module.css";

import { Link } from "react-router-dom";

import { useCollection } from "../../hooks/useCollection";

export default function TagDetails({ tag }) {
  const { documents: blogsWithTag } = useCollection("blogs", [
    "tags",
    "array-contains",
    tag,
  ]);
  return (
    <div className={styles["open-list-container"]}>
      <h4 className={styles["minor-heading"]}>{tag} Blogs</h4>
      <ul className={styles.tags}>
        {blogsWithTag &&
          (blogsWithTag.length > 0 ? (
            blogsWithTag.map((blog) => (
              <li key={blog.id} className={styles["list-item"]}>
                <Link className={styles.link} to={`/blogDetails/${blog.id}`}>
                  {blog.title}
                </Link>
              </li>
            ))
          ) : (
            <div>
              <h3>No blogs with this tag found.</h3>
            </div>
          ))}
      </ul>
    </div>
  );
}
