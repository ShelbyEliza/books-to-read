import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFirestore } from "../../hooks/useFirestore";

import { useDocument } from "../../hooks/useDocument";

// import Tags from "../../components/tags/Tags";

export default function EditBlog() {
  const { id } = useParams();
  const { document: blogDoc } = useDocument("blogs", id);

  const navigate = useNavigate();

  const { updateBlog, response } = useFirestore();

  const [error, setError] = useState(null);
  const [blog, setBlog] = useState(null);
  // const [title, setTitle] = useState(blog.title);
  // const [author, setAuthor] = useState(blog.author);
  // const [dateStarted, setDateStarted] = useState(blog.dateStarted);
  // const [dateFinished, setDateFinished] = useState(blog.dateFinished);
  // const [tags, setTags] = useState(blog.tags);
  // const [content, setContent] = useState(blog.content);

  // const handleTags = (e) => {
  //   if (e.target.checked === true) {
  //     setTags([...tags, e.target.value]);
  //   } else {
  //     let reducedTags = tags.filter((tag) => tag !== e.target.value);
  //     setTags(reducedTags);
  //   }
  // };

  useEffect(() => {
    if (blogDoc) {
      setBlog(blogDoc);
    }
  }, [blogDoc]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);

    const updatedData = {
      title: blog.title,
      author: blog.author,
      dateStarted: blog.dateStarted,
      dateFinished: blog.dateFinished,
      tags: blog.tags,
      content: blog.content,
    };

    await updateBlog(blog, updatedData);
    if (!response.error) {
      navigate("/");
    } else {
      setError(response.error);
    }
  };

  return (
    <div>
      {blog && (
        <div className="create-edit">
          <h2>Edit this Blog</h2>
          <form id="edit-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <label htmlFor="bookTitle">Title:</label>

              <input
                id="bookTitle"
                name="bookTitle"
                type="text"
                onChange={(e) => setBlog({ ...blog, title: e.target.value })}
                value={blog.title}
                required="required"
              />
            </div>

            <div className="form-row">
              <label htmlFor="author">Author:</label>
              <input
                id="author"
                name="author"
                type="text"
                onChange={(e) => setBlog({ ...blog, author: e.target.value })}
                value={blog.author}
                required="required"
              />
            </div>
            <div className="form-row">
              <label htmlFor="dateStarted">Started:</label>
              <input
                id="dateStarted"
                name="dateStarted"
                type="date"
                min="1992-11-16"
                max="2092-11-16"
                onChange={(e) =>
                  setBlog({ ...blog, dateStarted: e.target.value })
                }
                value={blog.dateStarted}
              />
            </div>

            <div className="form-row">
              <label htmlFor="dateFinished">Finished:</label>
              <input
                id="dateFinished"
                name="dateFinished"
                type="date"
                min="1992-11-16"
                max="2092-11-16"
                onChange={(e) =>
                  setBlog({ ...blog, dateFinished: e.target.value })
                }
                value={blog.dateFinished}
              />
            </div>
            {/* <Tags handleTags={handleTags} /> */}
            <div className="form-row-full">
              <label htmlFor="blogContent">Thoughts on the Book:</label>
            </div>

            <textarea
              id="blogContent"
              name="blogContent"
              onChange={(e) => setBlog({ ...blog, content: e.target.value })}
              value={blog.content}
            ></textarea>
          </form>
          {response.isPending ? (
            <button className="btn" disabled>
              Updating Blog...
            </button>
          ) : (
            <button form="edit-form" className="btn">
              Update!
            </button>
          )}
          {error && <p className="error">{error}</p>}
        </div>
      )}
    </div>
  );
}
