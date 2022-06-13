// styles:
import "./BlogCard.css";
import EditButton from "../../assets/EditButton";
import BoltIcon from "../../assets/BoltIcon.png";

import { Link, useNavigate } from "react-router-dom";

import { useFirestore } from "../../hooks/useFirestore";
import { useEffect, useState } from "react";

export default function BlogCard({ blog, isSingleBlog }) {
  const { deleteBlog, response } = useFirestore();
  const [ratingArray, setRatingArray] = useState([]);
  const [blogSnips, setBlogSnips] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (blog) {
      let ratings = [];
      for (let i = 1; i < 6; i++) {
        ratings.push(i);
      }
      setRatingArray(ratings);
      const reg = /\n/;
      setBlogSnips(blog.content.split(reg));
    }
  }, [blog]);

  const handleDelete = async (blog) => {
    if (isSingleBlog) {
      await deleteBlog(blog);
      if (!response.error) {
        navigate("/");
      }
    } else {
      await deleteBlog(blog);
    }
  };

  return (
    <div className="blog-card">
      <div key={blog.id} className="content-box">
        <div className="top-container">
          <div className="card-col card-col-1">
            <div className="card-line title-line">
              <div className="title-edit">
                <Link className="title" to={`/blogDetails/${blog.id}`}>
                  <h1 className="title">{blog.title}</h1>
                </Link>

                <Link to={`/editBlog/${blog.id}`}>
                  <EditButton className="edit" blog={blog} />
                </Link>
              </div>
              {blog.rating && (
                <div className="rating">
                  {ratingArray.map((rating) => (
                    <div key={rating}>
                      <img
                        className="rating-icon"
                        alt="A number of lightening bolts indicating the rating."
                        src={BoltIcon}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {blog.author && (
              <div className="card-line author-line">
                <p className="author">by</p>
                <Link
                  className="authorLink"
                  to={`/authorDetails/${blog.authorID}`}
                >
                  {blog.author}
                </Link>

                <Link to="#">
                  <EditButton className="edit" />
                </Link>
              </div>
            )}

            {blog.dateStarted && (
              <div className="card-line date-space">
                <div className="dateStarted">
                  <p className="date-label">Started:</p>
                  {blog.formatStart ? (
                    <p className="date-value">{blog.formatStart}</p>
                  ) : (
                    <p className="date-value">{blog.dateStarted}</p>
                  )}
                </div>

                <div className="dateFinished">
                  <p className="date-label">Finished:</p>
                  <div className="date-value">
                    {blog.dateFinished === "" && <p>Currently Reading</p>}
                    {blog.formatFinish ? (
                      <p>{blog.formatFinish}</p>
                    ) : (
                      <p>{blog.dateFinished}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {blog.tags && (
              <div className="card-line tags">
                {blog.tags.length === 0 ? (
                  <p className="tags-value">No Tags.</p>
                ) : (
                  blog.tags.map((tag) => (
                    <p key={tag} className="tags-value">
                      <Link key={tag} className="tag" to="#">
                        {tag}
                      </Link>
                    </p>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
        {blog.content && (
          <div className="card-line-full blog-content">
            {blogSnips.map((snip) => (
              <p className="snippet" key={Math.random() * 300}>
                {snip}
              </p>
            ))}
          </div>
        )}
        {showDelete === true ? (
          <>
            <p className="delete delete-message">
              Are you sure you would like to delete this blog permanently?
            </p>
            <div className="confirm-del-container">
              <button
                className="delete-confirmed"
                onClick={() => handleDelete(blog)}
              >
                Yes, delete this blog
              </button>
              <button className="cancel" onClick={() => setShowDelete(false)}>
                Cancel
              </button>
            </div>
          </>
        ) : (
          <button className="delete" onClick={() => setShowDelete(true)}>
            DELETE?
          </button>
        )}
      </div>
    </div>
  );
}
