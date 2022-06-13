// styles:
// import "./AllAuthors.css";
import styles from "../../components/multi-use-css/ListOfAll.module.css";

import { Link } from "react-router-dom";
import { useCollection } from "../../hooks/useCollection";

// import AuthorCard from "./AuthorCard";

export default function AllAuthors() {
  const { documents: authors } = useCollection("authors");
  // console.log(authors);
  return (
    <div className={styles.content}>
      <h1>All Authors</h1>
      {authors && (
        <ul>
          {authors.map((author) => (
            <li className={styles["list-item"]} key={author.id}>
              <Link className="title" to={`/authorDetails/${author.id}`}>
                <h1 className="title">{author.name}</h1>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
