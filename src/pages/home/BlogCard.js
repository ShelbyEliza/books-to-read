import "./Home.css";

import { Link } from "react-router-dom";

import EditButton from "../../assets/EditButton";

export default function BlogCard({ blogs }) {
  const generateNewLines = (blog) => {
    const reg = /\n/;
    let blogSnippet = [];
    blogSnippet.push(blog.content.split(reg));

    return blogSnippet;
  };

  return (
    <div className="content-box">
      {blogs.map((blog) => (
        <div key={blog}>
          <div className="top-container">
            <div className="card-col card-col-1">
              <div className="card-line title-line">
                <Link className="title" to="#">
                  <h1 className="title">{blog.title}</h1>
                </Link>

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
                      <p>
                        <Link to="#">{tag}</Link>
                      </p>
                    ))
                  )}
                </div>
              )}
            </div>

            {blog.image && (
              <div className="card-col card-col-2">
                <img
                  className="card-image"
                  src="./images/test-image-opt.svg"
                  alt="Some stylized purple outlined trees on a dark landscape."
                />
              </div>
            )}
          </div>

          {/* {blog.content && (
            <div className="card-line-full">
              <div className="blog-snippet">
                {generateNewLines(blog.content).map((line) => (
                  <p className="snips">{line}</p>
                ))}
              </div>
            </div>
          )} */}
        </div>
      ))}
    </div>
  );
}
