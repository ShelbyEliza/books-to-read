// styles:
import styles from "../../components/css/Card.module.css";

// import { ReactComponent as DateContainer } from "../../assets/DateContainer.svg";
// import DateContainer from "../../assets/DateContainer";

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
    <div className={styles["all-card-content"]}>
      <div className={styles["before-ratings"]}>
        <div className={styles["title-edit-content"]}>
          <h1>
            <Link className={styles.title} to={`/blogDetails/${blog.id}`}>
              {blog.title}
            </Link>
          </h1>
          <Link to={`/editBlog/${blog.id}`}>
            <EditButton className={styles.edit} />
          </Link>
        </div>
        <div className={styles["author-date-content"]}>
          {blog.author && (
            <div className={styles["author"]}>
              <Link to={`/authorDetails/${blog.authorID}`}>{blog.author}</Link>
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

        {blog.tags && (
          <div className={styles["tags-content"]}>
            {blog.tags.length === 0 ? (
              <p className={styles["tags-value"]}>No Tags.</p>
            ) : (
              blog.tags.map((tag) => (
                <Link
                  key={tag}
                  className={styles["tag"]}
                  state={{ from: tag }}
                  to={`/browse`}
                >
                  {tag}
                </Link>
              ))
            )}
          </div>
        )}
      </div>

      {blog.rating && (
        <div className={styles["rating-content"]}>
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
      {showDelete === true ? (
        <div className="delete-container">
          <p className="delete delete-message">
            Are you sure you would like to delete this blog permanently?
          </p>
          <div className="confirm-del-container">
            <button
              className="delete-confirmed"
              onClick={() => handleDelete(blog)}
            >
              Delete
            </button>
            <button className="cancel" onClick={() => setShowDelete(false)}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="delete-container">
          <button className="delete" onClick={() => setShowDelete(true)}>
            DELETE POST
          </button>
        </div>
      )}
      {/* make sure this error works! */}
      {error && <p className="error">{error}</p>}
    </div>
  );
}
