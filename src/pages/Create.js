// styles:
import styles from "../components/css/CreateAndEdit.module.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFirestore } from "../hooks/useFirestore";

import Tags from "../components/Tags";
import Rating from "../components/Rating";
import useDisplayDate from "../hooks/useDisplayDate";
import useDateToday from "../hooks/useDateToday";

const dateTodayUnFormatted = new Date();

export default function Create() {
  const navigate = useNavigate();

  const { addBlog, checkIfAuthorExists, checkIfKeyExists, response } =
    useFirestore();

  const { buildDateToday } = useDateToday(dateTodayUnFormatted);
  const dateToday = buildDateToday(dateTodayUnFormatted);
  const { formatDisplayDate } = useDisplayDate();

  const [error, setError] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [dateStarted, setDateStarted] = useState(dateToday);
  const [dateFinished, setDateFinished] = useState("");
  const [tags, setTags] = useState([]);
  const [rating, setRating] = useState("");
  const [content, setContent] = useState("");
  let formatStart = null;
  let formatFinish = null;

  const handleDates = () => {
    if (dateStarted) {
      formatStart = formatDisplayDate(dateStarted);
    }

    if (dateFinished) {
      formatFinish = formatDisplayDate(dateFinished);
    }
  };

  const handleTags = (e) => {
    if (e.target.checked === true) {
      setTags([...tags, e.target.value]);
    } else {
      let reducedTags = tags.filter((tag) => tag !== e.target.value);
      setTags(reducedTags);
    }
  };

  const handleRating = (rating) => {
    setRating(rating);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);

    handleDates();

    let doc = {
      title,
      author,
      dateStarted,
      formatStart,
      formatFinish,
      dateFinished,
      tags,
      rating,
      content,
    };
    const { authorDocRef } = await checkIfAuthorExists(doc);
    const authorDocID = authorDocRef.id;

    doc = { ...doc, authorID: authorDocID };

    const blogDocRef = await addBlog(doc);

    await checkIfKeyExists(doc, blogDocRef, authorDocRef);
    if (!response.error) {
      navigate("/");
    } else {
      setError(response.error);
    }
  };

  return (
    <div className={styles.content}>
      <h1 className={styles["heading"]}>Creating... </h1>
      <form id="create-form" onSubmit={handleSubmit}>
        <div className={`${styles["form-row"]} ${styles["title-container"]}`}>
          <label className={styles.title} htmlFor="bookTitle">
            Title:
          </label>
          <input
            className={styles.title}
            id="bookTitle"
            name="bookTitle"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required="required"
            size="24"
          />
        </div>

        <div className={`${styles["form-row"]} ${styles["author-container"]}`}>
          <label className={styles.author} htmlFor="author">
            Author:
          </label>
          <input
            className={styles.author}
            id="author"
            name="author"
            type="text"
            onChange={(e) => setAuthor(e.target.value)}
            value={author}
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
            pattern="\d{4}-\d{2}-\d{2}" // some browsers read as type="text" - pattern allows validation
            onChange={(e) => setDateStarted(e.target.value)}
            value={dateStarted}
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
            pattern="\d{4}-\d{2}-\d{2}"
            onChange={(e) => setDateFinished(e.target.value)}
            value={dateFinished}
          />
        </div>

        <Tags handleTags={handleTags} prevTags={tags} />
        <Rating handleRating={handleRating} />
        <div className={styles["form-row-full"]}>
          <label htmlFor="blogContent">Thoughts on the Book:</label>
        </div>

        <textarea
          id="blogContent"
          name="blogContent"
          onChange={(e) => setContent(e.target.value)}
          value={content}
        ></textarea>
      </form>
      <div className={styles.submit}>
        {response.isPending ? (
          <button className={styles["post-btn"]} disabled>
            Posting Blog...
          </button>
        ) : (
          <button form="create-form" className={styles["post-btn"]}>
            Post Blog
          </button>
        )}
      </div>
      {error && <p className="error">{error}</p>}
    </div>
  );
}
