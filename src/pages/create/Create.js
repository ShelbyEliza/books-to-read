// styles:
import "./Create.css";

// import { v4 as uuidv4 } from "uuid";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFirestore } from "../../hooks/useFirestore";

import Tags from "../../components/tags/Tags";
import useDate from "../../hooks/useDate";

export default function Create() {
  const navigate = useNavigate();

  const { addBlog, checkIfAuthorExists, checkIfKeyExists, response } =
    useFirestore();

  const [error, setError] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [dateStarted, setDateStarted] = useState("");
  const [dateFinished, setDateFinished] = useState("");
  const [tags, setTags] = useState([]);
  const [content, setContent] = useState("");

  const dateToday = useDate();
  useEffect(() => {
    setDateStarted(dateToday);
  }, [dateToday]);

  const handleTags = (e) => {
    if (e.target.checked === true) {
      setTags([...tags, e.target.value]);
    } else {
      let reducedTags = tags.filter((tag) => tag !== e.target.value);
      setTags(reducedTags);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);

    let doc = {
      title,
      author,
      dateStarted,
      dateFinished,
      tags,
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
    <div className="create-edit">
      <h1>Create a New Blog</h1>
      <form id="create-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="bookTitle">Title:</label>

          <input
            id="bookTitle"
            name="bookTitle"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required="required"
          />
        </div>

        <div className="form-row">
          <label htmlFor="author">Author:</label>
          <input
            id="author"
            name="author"
            type="text"
            onChange={(e) => setAuthor(e.target.value)}
            value={author}
            required="required"
          />
        </div>
        <div className="form-row">
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

        <div className="form-row">
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
        <Tags handleTags={handleTags} />
        <div className="form-row-full">
          <label htmlFor="blogContent">Thoughts on the Book:</label>
        </div>

        <textarea
          id="blogContent"
          name="blogContent"
          onChange={(e) => setContent(e.target.value)}
          value={content}
        ></textarea>
      </form>
      {response.isPending ? (
        <button className="btn" disabled>
          Posting Blog...
        </button>
      ) : (
        <button form="create-form" className="btn">
          Post!
        </button>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
}
