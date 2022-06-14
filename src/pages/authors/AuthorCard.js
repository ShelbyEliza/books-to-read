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
        <div className={styles["content-box"]}>
          <div className={styles["top-container"]}>
            <div className={`${styles["card-col"]} ${styles["card-col-1"]}`}>
              <div className={`${styles["card-line"]} ${styles["title-line"]}`}>
                <h1 className={styles.title}>{author.name}</h1>

                <Link to="#">
                  <EditButton className={styles.edit} />
                </Link>
              </div>
              {keyInfo &&
                (keyInfo.booksWithIDs.length === 0 ? (
                  <div className={styles["card-line"]}>
                    <label>Books Written:</label>
                    <p>No Books Written.</p>
                  </div>
                ) : (
                  <div
                    className={`${styles["card-line"]} ${styles["books-written-container"]}`}
                  >
                    <label>Books Written:</label>
                    <ul className={styles["blog-container"]}>
                      {keyInfo.booksWithIDs.map((book) => (
                        <li
                          className={styles["list-item"]}
                          key={Object.values(book)}
                        >
                          <Link
                            className={styles["blog-link"]}
                            to={`/blogDetails/${Object.values(book)}`}
                          >
                            <p>{Object.keys(book)}</p>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              {author.aboutAuthor && (
                <div
                  className={`${styles["card-line-full"]} ${styles["content"]}`}
                >
                  {aboutSnips.map((snip) => (
                    <p className={styles.snippet} key={Math.random() * 300}>
                      {snip}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
