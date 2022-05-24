// styles:
import "./Home.css";

import { useCollection } from "../../hooks/useCollection";
import BlogCard from "./BlogCard";

export default function Home() {
  const { documents: blogs } = useCollection("blogs");
  const { documents: authors } = useCollection("authors");

  return <div>{blogs && <BlogCard blogs={blogs} authors={authors} />}</div>;
}
