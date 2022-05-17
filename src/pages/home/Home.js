// styles:
import "./Home.css";

import { useAuthContext } from "../../hooks/useAuthContext";

import { useCollection } from "../../hooks/useCollection";
import BlogCard from "./BlogCard";

export default function Home() {
  const { user } = useAuthContext();

  const { documents: blogs, error } = useCollection("blogs");

  return (
    <div>
      <h1>Under the Shelf</h1>
      {blogs && <BlogCard blogs={blogs} />}
    </div>
  );
}
