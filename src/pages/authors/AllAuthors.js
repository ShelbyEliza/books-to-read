// styles:
import "./AllAuthors.css";

import { Link } from "react-router-dom";
import { useCollection } from "../../hooks/useCollection";

// import AuthorCard from "./AuthorCard";

export default function AllAuthors() {
  const { documents: authors } = useCollection("authors");
  // console.log(authors);
  return (
    <div>
      <h2>All Authors</h2>
      {authors && (
        <ul>
          {authors.map((author) => (
            <li key={author.id}>
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
