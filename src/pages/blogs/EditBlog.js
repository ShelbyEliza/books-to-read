// styles:
import styles from "../../components/css/CreateAndEdit.module.css";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFirestore } from "../../hooks/useFirestore";

import { useDocument } from "../../hooks/useDocument";

import Tags from "../../components/Tags";
import Rating from "../../components/Rating";

export default function EditBlog() {
  const navigate = useNavigate();
  const { updateData, response } = useFirestore();

  const { id } = useParams();
  const { document: blogDoc } = useDocument("blogs", id);

  const [error, setError] = useState(null);
  const [blog, setBlog] = useState(null);
  const [defaultRating, setDefaultRating] = useState(null);
  // const [tags, setTags] = useState([]);

  useEffect(() => {
    if (blogDoc) {
      setBlog(blogDoc);
      if (blogDoc.rating) {
        setDefaultRating(blogDoc.rating);
      }
    }
  }, [blogDoc]);

  const handleTags = (e) => {
    if (e.target.checked) {
      console.log("Add Tag");
      if (blog.tags) {
        setBlog({ ...blog, tags: [...blog.tags, e.target.value] });
      } else {
        setBlog({ ...blog, tags: [e.target.value] });
      }
    } else {
      console.log("Remove Tag");
      let reducedTags = blog.tags.filter((tag) => tag !== e.target.value);
      setBlog({ ...blog, tags: reducedTags });
    }
  };

  const handleRating = (rating) => {
    console.log(rating);
    setBlog({ ...blog, rating: rating });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);

    await updateData(blog);
    if (!response.error) {
      navigate("/");
    } else {
      setError(response.error);
    }
  };

  return (
    <div>
      {blog && (
        <div className={styles.content}>
          <h1 className={styles["heading"]}>Editting...</h1>
          <form id="edit-form" onSubmit={handleSubmit}>
            <div
              className={`${styles["form-row"]} ${styles["title-container"]}`}
            >
              <label className={styles.title} htmlFor="bookTitle">
                Title:
              </label>

              <input
                className={styles.title}
                id="bookTitle"
                name="bookTitle"
                type="text"
                onChange={(e) => setBlog({ ...blog, title: e.target.value })}
                value={blog.title}
                required="required"
                size="24"
              />
            </div>

            <div
              className={`${styles["form-row"]} ${styles["author-container"]}`}
            >
              <label className={styles.author} htmlFor="author">
                Author:
              </label>
              <input
                className={styles.author}
                id="author"
                name="author"
                type="text"
                onChange={(e) => setBlog({ ...blog, author: e.target.value })}
                value={blog.author}
                required="required"
                size="24"
              />
            </div>
            <div className={styles["form-row"]}>
              <label htmlFor="dateStarted">Started:</label>
              <input
                id="dateStarted"
                name="dateStarted"
                type="date"
                min="1992-11-16"
                max="2092-11-16"
                onChange={(e) =>
                  setBlog({ ...blog, dateStarted: e.target.value })
                }
                value={blog.dateStarted}
              />
            </div>

            <div className={styles["form-row"]}>
              <label htmlFor="dateFinished">Finished:</label>
              <input
                id="dateFinished"
                name="dateFinished"
                type="date"
                min="1992-11-16"
                max="2092-11-16"
                onChange={(e) =>
                  setBlog({ ...blog, dateFinished: e.target.value })
                }
                value={blog.dateFinished}
              />
            </div>
            <Tags handleTags={handleTags} prevTags={blog.tags} />
            <Rating handleRating={handleRating} defaultRating={defaultRating} />
            <div className={styles["form-row-full"]}>
              <label htmlFor="blogContent">Thoughts on the Book:</label>
            </div>

            <textarea
              id="blogContent"
              name="blogContent"
              onChange={(e) => setBlog({ ...blog, content: e.target.value })}
              value={blog.content}
            ></textarea>
          </form>
          {response.isPending ? (
            <button className={styles["post-btn"]} disabled>
              Updating Blog...
            </button>
          ) : (
            <button form="edit-form" className={styles["post-btn"]}>
              Update!
            </button>
          )}
          {error && <p className="error">{error}</p>}
        </div>
      )}
    </div>
  );
}
