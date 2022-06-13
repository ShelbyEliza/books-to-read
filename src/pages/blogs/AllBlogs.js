// styles:
import "./AllBlogs.css";
import styles from "../../components/multi-use-css/ListOfAll.module.css";

import { useCollection } from "../../hooks/useCollection";

import { Link } from "react-router-dom";

export default function AllBlogs() {
  const { documents: blogs } = useCollection("blogs");

  return (
    <div className={styles.content}>
      <h1>All Blogs</h1>
      {blogs && (
        <ul>
          {blogs.map((blog) => (
            <li className={styles["list-item"]} key={blog.id}>
              <Link className="title" to={`/blogDetails/${blog.id}`}>
                <h1 className="title">{blog.title}</h1>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
