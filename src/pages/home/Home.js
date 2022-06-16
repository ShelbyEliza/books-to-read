import styles from "./Home.module.css";

import { useCollection } from "../../hooks/useCollection";
import BlogCard from "../blogs/BlogCard";

import { Link } from "react-router-dom";

export default function Home() {
  const { documents: blogs } = useCollection("blogs");

  return (
    <div className={styles.content}>
      {blogs && blogs.length > 0 ? (
        blogs.map((blog) => (
          <div key={blog.id}>
            <BlogCard blog={blog} isSingleBlog={false} />
          </div>
        ))
      ) : (
        <div className={styles["message-container"]}>
          <h1 className={styles["message-header"]}>
            Sorry, there are no blogs to display.
          </h1>
          <Link className={styles["link"]} to="/create">
            Would you like to write your first blog?
          </Link>
        </div>
      )}
    </div>
  );
}
