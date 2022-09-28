// styles:
import styles from "../../components/css/ListOfAll.module.css";

import { useCollection } from "../../hooks/useCollection";

import { Link } from "react-router-dom";

export default function AllBlogs() {
  const { documents: blogs } = useCollection("blogs");

  return (
    <div className={styles.content}>
      <h1 className={styles.heading}>All Blogs</h1>
      {blogs && (
        <ul className={styles["list"]}>
          {blogs.map((blog) => (
            <li className={styles["list-item"]} key={blog.id}>
              <Link className={styles.link} to={`/blogDetails/${blog.id}`}>
                {blog.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
