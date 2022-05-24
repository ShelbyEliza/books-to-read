// styles & assets:
import "./AuthorDetails.css";
import EditButton from "../../assets/EditButton";

import { useParams, Link } from "react-router-dom";

import { useDocument } from "../../hooks/useDocument";

export default function AuthorDetails() {
  const { id } = useParams();
  const { document: author, error } = useDocument("authors", id);

  return (
    <div>
      {author && (
        <div className="content-box">
          <div className="top-container">
            <div className="card-col card-col-1">
              <div className="card-line title-line">
                <h1 className="title">{author.name}</h1>

                <Link to="#">
                  <EditButton className="edit" />
                </Link>
              </div>

              {author.booksWritten && (
                <div className="card-line books-written">
                  <p className="books-written-label">Books Written:</p>
                  {author.booksWritten.length === 0 ? (
                    <p className="books-written-value">No Books Written.</p>
                  ) : (
                    author.booksWritten.map((book) => (
                      <p key={book}>
                        <Link to="#">{book}</Link>
                      </p>
                    ))
                  )}
                </div>
              )}
              {author.aboutAuthor && (
                <div className="card-line about-author-line">
                  <p className="about-author">{author.aboutAuthor}</p>
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
