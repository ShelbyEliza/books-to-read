// styles & assets:
import "./AuthorDetails.css";
import EditButton from "../../assets/EditButton";

import { useParams, Link } from "react-router-dom";

import { useDocument } from "../../hooks/useDocument";

export default function AuthorDetails() {
  const { id } = useParams();
  const { document: author, error } = useDocument("authors", id);
  const { document: key } = useDocument("keys", id);

  return (
    <div className="author-details content">
      {author && (
        <div className="content-box">
          <div className="top-container">
            <div className="card-col card-col-1">
              <div className="card-line title-line">
                <h1>{author.name}</h1>

                <Link to="#">
                  <EditButton className="edit" />
                </Link>
              </div>
              {key.booksWithIDs.length === 0 ? (
                <div className="card-line books-written">
                  <p className="books-written-label">Books Written:</p>
                  <p className="books-written-value">No Books Written.</p>
                </div>
              ) : (
                <div className="card-line books-written">
                  <label>Books Written:</label>
                  {key.booksWithIDs.map((book) => (
                    <div key={Object.values(book)}>
                      <Link to={`/blogDetails/${Object.values(book)}`}>
                        <p className="book-written">{Object.keys(book)}</p>
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
}
