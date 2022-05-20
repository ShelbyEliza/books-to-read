import "../home/Home.css";

import { Link } from "react-router-dom";

import EditButton from "../../assets/EditButton";

export default function AuthorCard({ authors }) {
  return (
    <div className="content">
      {authors &&
        authors.map((author) => (
          <div key={author.id} className="content-box">
            <div className="top-container">
              <div className="card-col card-col-1">
                <div className="card-line name-line">
                  <Link className="name" to="#">
                    <h1 className="name">{author.name}</h1>
                  </Link>

                  <Link to="#">
                    <EditButton className="edit" />
                  </Link>
                </div>

                {author.author && (
                  <div className="card-line author-line">
                    <p className="author">
                      by
                      <Link className="authorLink" to="#">
                        {author.author}
                      </Link>
                    </p>

                    <Link to="#">
                      <EditButton className="edit" />
                    </Link>
                  </div>
                )}

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
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
