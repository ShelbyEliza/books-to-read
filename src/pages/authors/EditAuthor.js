// styles:
import styles from "./EditAuthor.module.css";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFirestore } from "../../hooks/useFirestore";

import { useDocument } from "../../hooks/useDocument";

export default function EditAuthor() {
  const navigate = useNavigate();
  const { updateAboutAuthor, response } = useFirestore();

  const { id } = useParams();
  const { document: authorDoc } = useDocument("authors", id);
  const { document: keyDoc } = useDocument("keys", id);

  const [error, setError] = useState(null);
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    if (authorDoc) {
      setAuthor(authorDoc);
    }
  }, [authorDoc, keyDoc]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);

    await updateAboutAuthor(author.aboutAuthor, keyDoc.authorID);
    if (!response.error) {
      navigate("/");
    } else {
      setError(response.error);
    }
  };

  return (
    <div>
      {author && (
        <div className={styles.content}>
          <h1 className={styles["heading"]}>Editting...</h1>
          <h2 className={styles["author-name"]}>{author.name}</h2>
          <form id="edit-form" onSubmit={handleSubmit}>
            <div className={styles["books-written"]}>
              <label htmlFor="booksWritten">Books Written:</label>

              {keyDoc && (
                <div className={styles.books}>
                  {keyDoc.booksWithIDs.map((book) => (
                    <h3
                      key={Object.values(book)}
                      name="booksWritten"
                      className={styles["book"]}
                    >
                      {Object.keys(book)}
                    </h3>
                  ))}
                </div>
              )}
            </div>

            <div className={styles["about-author"]}>
              <label htmlFor="aboutAuthor">Thoughts on the Author:</label>

              <textarea
                id="aboutAuthor"
                name="aboutAuthor"
                onChange={(e) =>
                  setAuthor({ ...author, aboutAuthor: e.target.value })
                }
                value={author.aboutAuthor}
              ></textarea>
            </div>
          </form>
          <div className={styles.submit}>
            {response.isPending ? (
              <button className={styles["post-btn"]} disabled>
                Updating Author...
              </button>
            ) : (
              <button form="edit-form" className={styles["post-btn"]}>
                Update!
              </button>
            )}
          </div>
          {error && <p className="error">{error}</p>}
        </div>
      )}
    </div>
  );
}
