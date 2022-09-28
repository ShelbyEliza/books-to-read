// styles:
import styles from "./Browse.module.css";

import { Link } from "react-router-dom";

import { useCollection } from "../../hooks/useCollection";

export default function RatingDetails({ rating }) {
  const { documents: blogsWithRating } = useCollection("blogs", [
    "rating",
    "==",
    rating,
  ]);

  return (
    <div className={styles["open-list-container"]}>
      {rating > 1 ? (
        <h4 className={styles["minor-heading"]}>{rating} Stars Blogs</h4>
      ) : (
        <h4 className={styles["minor-heading"]}>{rating} Star Blogs</h4>
      )}
      <ul className={styles.ratings}>
        {blogsWithRating && blogsWithRating.length > 0 ? (
          blogsWithRating.map((blog) => (
            <li key={blog.id} className={styles["list-item"]}>
              <Link
                className={styles.link}
                key={blog.id}
                to={`/blogDetails/${blog.id}`}
              >
                {blog.title}
              </Link>
            </li>
          ))
        ) : (
          <div>
            <h3>No blogs with this rating found.</h3>
          </div>
        )}
      </ul>
    </div>
  );
}
