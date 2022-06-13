// styles:
import "./BlogDetails.css";

import BlogCard from "./BlogCard";

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

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
    <div className="blog-details content">
      {blog && (
        <>
          <BlogCard blog={blog} isSingleBlog={true} />
          {/* <button className="delete" onClick={(e) => handleDelete(blog)}>
            DELETE
          </button> */}
        </>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
}
