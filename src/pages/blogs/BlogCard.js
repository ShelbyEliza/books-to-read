// styles:
import "./BlogCard.css";
import EditButton from "../../assets/EditButton";
import BoltIcon from "../../assets/BoltIcon.png";

import { Link } from "react-router-dom";

import { useFirestore } from "../../hooks/useFirestore";
import { useEffect, useState } from "react";

export default function BlogCard({ blog, isSingleBlog }) {
  const { deleteBlog } = useFirestore();
  const [ratingArray, setRatingArray] = useState([]);
  const [blogSnips, setBlogSnips] = useState([]);

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

  const handleDelete = (blog) => {
    deleteBlog(blog);
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
                {/* <p className="tags-label">Tags:</p> */}
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
        {/* {blog.content && (
          <div className="card-line-full blog-content">
            <p className="blog-snippet">{blog.content}</p>
          </div>
        )} */}
        {blog.content && (
          <div className="card-line-full blog-content">
            {blogSnips.map((snip) => (
              <p className="snippet">{snip}</p>
            ))}
          </div>
        )}
        {!isSingleBlog && (
          <button className="delete" onClick={(e) => handleDelete(blog)}>
            DELETE
          </button>
        )}
      </div>
    </div>
  );
}
