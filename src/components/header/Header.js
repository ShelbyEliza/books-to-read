// styles:
import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  return (
    <header>
      <Link to="/">
        <img
          className="banner-img"
          src="../../../public/images/banner-img.svg"
          alt="Displays the website title: 'Books to Read', resting on a bookshelf."
        />
      </Link>
    </header>
  );
}
