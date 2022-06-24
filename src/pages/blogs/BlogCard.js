// styles:
import styles from "../../components/css/Card.module.css";

import EditButton from "../../assets/EditButton";
import BoltIcon from "../../assets/BoltIcon.png";

import { Link, useNavigate } from "react-router-dom";

import { useFirestore } from "../../hooks/useFirestore";
import { useEffect, useState } from "react";

export default function BlogCard({ blog, isSingleBlog }) {
  const { deleteBlog, response, error } = useFirestore();
  const [ratingArray, setRatingArray] = useState([]);
  const [blogSnips, setBlogSnips] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (blog) {
      let ratings = [];
      for (let i = 1; i < 6; i++) {
        ratings.push(i);
      }
      setRatingArray(ratings);
      const reg = /\n/;
      setBlogSnips(blog.content.split(reg));
    }
  }, [blog]);

  const handleDelete = async (blog) => {
    if (isSingleBlog) {
      await deleteBlog(blog);
      if (!response.error) {
        navigate("/");
      }
    } else {
      await deleteBlog(blog);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles["content-box"]}>
        <div className={styles["top-container"]}>
          <div className={`${styles["card-col"]} ${styles["card-col-1"]}`}>
            <div className={`${styles["card-line"]} ${styles["title-line"]}`}>
              <div className={styles["title-edit"]}>
                <h1>
                  <Link className={styles.title} to={`/blogDetails/${blog.id}`}>
                    {blog.title}
                  </Link>
                </h1>
                <Link to={`/editBlog/${blog.id}`}>
                  <EditButton className={styles.edit} />
                </Link>
              </div>

              {blog.rating && (
                <div className={styles.rating}>
                  {ratingArray.map((rating) => (
                    <div key={rating}>
                      <img
                        className={styles["rating-icon"]}
                        alt="A number of lightening bolts indicating the rating."
                        src={BoltIcon}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {blog.author && (
              <div
                className={`${styles["card-line"]} ${styles["author-line"]}`}
              >
                <p className={styles.author}>by</p>
                <Link
                  className={styles["author-link"]}
                  to={`/authorDetails/${blog.authorID}`}
                >
                  {blog.author}
                </Link>
              </div>
            )}

            {blog.dateStarted && (
              <div
                className={`${styles["card-line"]} ${styles["date-container"]}`}
              >
                <div className={styles["date-started"]}>
                  <p className={styles["date-label"]}>Started:</p>
                  {blog.formatStart ? (
                    <p className={styles["date-value"]}>{blog.formatStart}</p>
                  ) : (
                    <p className={styles["date-value"]}>{blog.dateStarted}</p>
                  )}
                </div>

                <div className={styles["date-finished"]}>
                  <p className={styles["date-label"]}>Finished:</p>
                  <div>
                    {blog.dateFinished === "" && <p>Currently Reading</p>}
                    {blog.formatFinish ? (
                      <p className={styles["date-value"]}>
                        {blog.formatFinish}
                      </p>
                    ) : (
                      <p className={styles["date-value"]}>
                        {blog.dateFinished}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {blog.tags && (
              <div className={`${styles["card-line"]} ${styles.tags}`}>
                {blog.tags.length === 0 ? (
                  <p className={styles["tags-value"]}>No Tags.</p>
                ) : (
                  blog.tags.map((tag) => (
                    <p key={tag} className={styles["tags-value"]}>
                      <Link
                        key={tag}
                        className={styles.tag}
                        to={`/tagDetails/${tag}`}
                      >
                        {tag}
                      </Link>
                    </p>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
        {blog.content && (
          <div className={`${styles["card-line-full"]} ${styles["content"]}`}>
            {blogSnips.map((snip) => (
              <p className={styles.snippet} key={Math.random() * 300}>
                {snip}
              </p>
            ))}
          </div>
        )}
        {showDelete === true ? (
          <>
            <p className="delete delete-message">
              Are you sure you would like to delete this blog permanently?
            </p>
            <div className="confirm-del-container">
              <button
                className="delete-confirmed"
                onClick={() => handleDelete(blog)}
              >
                Yes, delete this blog
              </button>
              <button className="cancel" onClick={() => setShowDelete(false)}>
                Cancel
              </button>
            </div>
          </>
        ) : (
          <button className="delete" onClick={() => setShowDelete(true)}>
            DELETE?
          </button>
        )}
      </div>
      {/* make sure this error works! */}
      {error && <p className="error">{error}</p>}
    </div>
  );
}
