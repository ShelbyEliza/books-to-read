// styles:
import styles from "../../components/css/Card.module.css";
import EditButton from "../../assets/EditButton";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function AuthorCard({ author, keyInfo }) {
  const [aboutSnips, setAboutSnips] = useState([]);

  useEffect(() => {
    if (author && author.aboutAuthor) {
      const reg = /\n/;
      setAboutSnips(author.aboutAuthor.split(reg));
    }
  }, [author]);

  return (
    <div className={styles.card}>
      {author && (
        <div className={styles["all-card-content"]}>
          <div className={styles["title-edit-content"]}>
            <h1 className={styles.title}>{author.name}</h1>

            <Link to={`/editAuthor/${author.id}`}>
              <EditButton className={styles.edit} />
            </Link>
          </div>
          {keyInfo &&
            (keyInfo.booksWithIDs.length === 0 ? (
              <div className={styles["books-content"]}>
                <label>Books Written:</label>
                <p className={styles["books"]}>No Books Written.</p>
              </div>
            ) : (
              <div className={styles["books-content"]}>
                <label>Books Written:</label>
                <div className={styles.books}>
                  <div className={styles["books"]}>
                    {keyInfo.booksWithIDs.map((book) => (
                      <Link
                        key={Object.values(book)}
                        className={styles["book"]}
                        to={`/blogDetails/${Object.values(book)}`}
                      >
                        <p>{Object.keys(book)}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          {author.aboutAuthor && (
            <div className={styles["description-content"]}>
              {aboutSnips.map((snip) => (
                <p className={styles.snippet} key={Math.random() * 300}>
                  {snip}
                </p>
              ))}
            </div>
          )}
          <div className={styles.filler}></div>
        </div>
      )}
    </div>
  );
}
