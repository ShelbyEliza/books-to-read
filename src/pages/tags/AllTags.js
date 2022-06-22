// styles:
import styles from "../../components/css/ListOfAll.module.css";

import { Link } from "react-router-dom";

const tagList = [
  "Sci-fi",
  "Informative",
  "Short-Story",
  "Biography",
  "Comedy",
  "Fantasy",
  "Fiction",
  "Non-Fiction",
  "Classical",
  "Horror",
];

export default function AllTags() {
  return (
    <div className={styles.content}>
      <h1 className={styles.heading}>All Tags</h1>
      <ul>
        {tagList.map((tag) => (
          <li className={styles["list-item"]} key={tag}>
            <Link to={`/tagDetails/${tag}`}>
              <h1>{tag}</h1>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
