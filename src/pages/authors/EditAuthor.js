// styles:
import styles from "../../components/css/CreateAndEdit.module.css";

import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
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
          <form id="edit-form" onSubmit={handleSubmit}>
            <h2 className={styles["form-row-full"]}>{author.name}</h2>
            <div
              className={`${styles["books-written"]} ${styles["form-row-full"]}`}
            >
              <label htmlFor="booksWritten">Books Written:</label>
            </div>
            {keyDoc && (
              <div className={styles["books-written"]}>
                {keyDoc.booksWithIDs.map((book) => (
                  <Link
                    key={Object.values(book)}
                    to={`/blogDetails/${Object.values(book)}`}
                  >
                    <h3 name="booksWritten">{Object.keys(book)}</h3>
                  </Link>
                ))}
              </div>
            )}

            <div className={styles["form-row-full"]}>
              <label htmlFor="aboutAuthor">Thoughts on the Author:</label>
            </div>

            <textarea
              id="aboutAuthor"
              name="aboutAuthor"
              onChange={(e) =>
                setAuthor({ ...author, aboutAuthor: e.target.value })
              }
              value={author.aboutAuthor}
            ></textarea>
          </form>
          {response.isPending ? (
            <button className={styles["post-btn"]} disabled>
              Updating Author...
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
