// styles:
import "./BlogDetails.css";

import { useState } from "react";

import { useParams, useNavigate, Link } from "react-router-dom";
import EditButton from "../../assets/EditButton";

import { useDocument } from "../../hooks/useDocument";
import { useFirestore } from "../../hooks/useFirestore";

export default function BlogDetails() {
  const { id } = useParams();
  const { document: blog } = useDocument("blogs", id);
  const { deleteBlog, response } = useFirestore();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleDelete = async (blog) => {
    console.log(response);
    await deleteBlog(blog);
    if (!response.error) {
      navigate("/");
    } else {
      setError(response.error);
    }
  };

  return (
    <div>
      {blog && (
        <div className="content-box">
          <div className="top-container">
            <div className="card-col card-col-1">
              <div className="card-line title-line">
                <h1 className="title">{blog.title}</h1>

                <Link to="#">
                  <EditButton className="edit" />
                </Link>
              </div>

              {blog.author && (
                <div className="card-line author-line">
                  <p className="author">
                    by
                    <Link className="authorLink" to="#">
                      {blog.author}
                    </Link>
                  </p>

                  <Link to="#">
                    <EditButton className="edit" />
                  </Link>
                </div>
              )}

              {blog.dateStarted && (
                <div className="card-line date-space">
                  <div className="dateStarted">
                    <p className="date-label">Started:</p>
                    <p className="date-value">{blog.dateStarted}</p>
                  </div>

                  <div className="dateFinished">
                    <p className="date-label">Finished:</p>
                    <div className="date-value">
                      {blog.dateFinished === "" ? (
                        <p>Currently Reading</p>
                      ) : (
                        <p>{blog.dateFinished}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {blog.tags && (
                <div className="card-line tags">
                  <p className="tags-label">Tags:</p>
                  {blog.tags.length === 0 ? (
                    <p className="tags-value">No Tags.</p>
                  ) : (
                    blog.tags.map((tag) => (
                      <p key={tag}>
                        <Link to="#">{tag}</Link>
                      </p>
                    ))
                  )}
                </div>
              )}
              <button onClick={(e) => handleDelete(blog)}>X</button>
            </div>
          </div>
        </div>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
}
