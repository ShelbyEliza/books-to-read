// styles:
import styles from "../../components/css/BrowseDetails.module.css";

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
      <h1 className={styles["minor-heading"]}>{tag} Blogs</h1>
      <ul className={styles["open-list-content"]}>
        {blogsWithTag &&
          (blogsWithTag.length > 0 ? (
            blogsWithTag.map((blog) => (
              <li key={blog.id} className={styles.option}>
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
