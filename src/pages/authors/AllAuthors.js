// styles:
import styles from "../../components/css/ListOfAll.module.css";

import { Link } from "react-router-dom";
import { useCollection } from "../../hooks/useCollection";

export default function AllAuthors() {
  const { documents: authors } = useCollection("authors");
  return (
    <div className={styles.content}>
      <h1 className={styles.heading}>All Authors</h1>
      {authors && (
        <ul className={styles["list"]}>
          {authors.map((author) => (
            <li className={styles["list-item"]} key={author.id}>
              <Link className={styles.link} to={`/authorDetails/${author.id}`}>
                {author.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
