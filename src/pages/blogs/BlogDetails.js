// styles:
import { useParams } from "react-router-dom";

import BlogCard from "./BlogCard";
import { useDocument } from "../../hooks/useDocument";

export default function BlogDetails() {
  const { id } = useParams();
  const { document: blog } = useDocument("blogs", id);

  return (
    <div>
      {blog && (
        <>
          <BlogCard blog={blog} isSingleBlog={true} />
        </>
      )}
    </div>
  );
}
