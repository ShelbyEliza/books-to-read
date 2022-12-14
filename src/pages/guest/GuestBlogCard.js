// styles:
import styles from "../../components/css/Card.module.css";

// import { ReactComponent as DateContainer } from "../../assets/DateContainer.svg";
// import DateContainer from "../../assets/DateContainer";

import EditButton from "../../assets/EditButton";
import BoltIcon from "../../assets/BoltIcon.png";

import { useEffect, useState } from "react";

export default function GuestBlogCard({ blog }) {
  const [ratingArray, setRatingArray] = useState([]);
  const [blogSnips, setBlogSnips] = useState([]);

  useEffect(() => {
    if (blog) {
      // setting up specific ratings:
      let ratings = [];
      for (let i = 1; i < blog.rating; i++) {
        ratings.push(i);
      }
      setRatingArray(ratings);

      // creating paragraphs:
      const reg = /\n/;
      setBlogSnips(blog.content.split(reg));
    }
  }, [blog]);

  return (
    <div className={styles["all-card-content"]}>
      <div className={styles["before-ratings"]}>
        <div className={styles["title-edit-content"]}>
          <div className={styles["edit-container"]}>
            <div
              className={styles["edit-guest"]}
              title="Sign up to edit your own content!"
            >
              <EditButton className={styles.edit} />
            </div>
          </div>
          <h1
            className={`${styles.title} ${styles["title-guest"]}`}
            title="Sign up to view your own content!"
          >
            {blog.title}
          </h1>
        </div>
        <div className={styles["author-date-content"]}>
          {blog.author && (
            <div className={styles["author"]}>
              <h2
                className={styles["author-guest"]}
                title="Sign up to view your favorite and not so favorite authors!"
              >
                {blog.author}
              </h2>
            </div>
          )}

          {blog.dateStarted && (
            <div className={styles["date-content"]}>
              <div className={styles["date-started"]}>
                {blog.formatStart ? (
                  <p className={styles["date-value"]}>{blog.formatStart}</p>
                ) : (
                  <p className={styles["date-value"]}>{blog.dateStarted}</p>
                )}
              </div>
              <div>-</div>

              <div className={styles["date-finished"]}>
                {blog.dateFinished === "" && (
                  <p className={styles["currently-reading"]}>
                    Currently Reading
                  </p>
                )}
                {blog.formatFinish ? (
                  <p className={styles["date-value"]}>{blog.formatFinish}</p>
                ) : (
                  <p className={styles["date-value"]}>{blog.dateFinished}</p>
                )}
              </div>
            </div>
          )}
        </div>

        <div className={styles["rating-content"]}>
          {blog.rating &&
            ratingArray.map((rating) => (
              <div key={rating}>
                <img
                  className={styles["rating-icon"]}
                  alt="A number of lightening bolts indicating the rating."
                  src={BoltIcon}
                />
              </div>
            ))}
        </div>

        {blog.tags && (
          <div className={styles["tags-content"]}>
            {blog.tags.length === 0 ? (
              <p className={styles["tags-value"]}>No Tags.</p>
            ) : (
              blog.tags.map((tag) => (
                <p
                  key={tag}
                  className={`${styles.tag} ${styles["tag-guest"]}`}
                  state={{ from: tag }}
                  to={`/browse`}
                  title="Sign up to sort your own content by genre!"
                >
                  {tag}
                </p>
              ))
            )}
          </div>
        )}
      </div>
      {blog.content && (
        <div className={styles["description-content"]}>
          {blogSnips.map((snip) => (
            <p className={styles.snippet} key={Math.random() * 300}>
              {snip}
            </p>
          ))}
        </div>
      )}
      {/* ------------------------ Delete ------------------ */}
      <div className="delete-container">
        <button
          className={`delete ${styles["delete-guest"]}`}
          title="Sign up to edit your own content!"
          disabled
        >
          DELETE POST
        </button>
      </div>
    </div>
  );
}
