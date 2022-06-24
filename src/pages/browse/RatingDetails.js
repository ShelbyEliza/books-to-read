import { useParams, Link } from "react-router-dom";

import { useCollection } from "../../hooks/useCollection";

export default function RatingDetails({ rating }) {
  const { documents: blogsWithRating } = useCollection("blogs", [
    "rating",
    "==",
    rating,
  ]);

  return (
    <div>
      {rating > 1 ? (
        <h1>{rating} Stars Blogs</h1>
      ) : (
        <h1>{rating} Star Blogs</h1>
      )}
      <div>
        {blogsWithRating && blogsWithRating.length > 0 ? (
          blogsWithRating.map((blog) => (
            <Link key={blog.id} to={`/blogDetails/${blog.id}`}>
              <h2>{blog.title}</h2>
            </Link>
          ))
        ) : (
          <div>
            <h3>No blogs with this rating found.</h3>
          </div>
        )}
      </div>
    </div>
  );
}
