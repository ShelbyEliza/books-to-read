// styles:
import "./Home.css";

import { useCollection } from "../../hooks/useCollection";
import BlogCard from "./BlogCard";

export default function Home() {
  const { documents: blogs } = useCollection("blogs", "users");

  return <div>{blogs && <BlogCard blogs={blogs} />}</div>;
}
