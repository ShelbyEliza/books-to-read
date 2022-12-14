import styles from "../home/Home.module.css";

import { useGuestCollection } from "../../hooks/useGuestCollection";
import GuestBlogCard from "./GuestBlogCard";

export default function Guest() {
  const { documents: blogs } = useGuestCollection("blogs");

  return (
    <div className={styles.content}>
      <h1 className={styles["guest-title"]}>Welcome, Guest</h1>
      <p className={styles.subtext}>
        Please sign up to begin creating your own personal reading catalog!
      </p>
      {blogs &&
        (blogs.length > 0 ? (
          blogs.map((blog) => (
            <div key={blog.id}>
              <GuestBlogCard blog={blog} isSingleBlog={false} />
            </div>
          ))
        ) : (
          <div className={styles["message-container"]}>
            <h1 className={styles["message-header"]}>
              Sorry, there are no blogs to display.
            </h1>
          </div>
        ))}
    </div>
  );
}
