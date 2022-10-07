// styles & assets:
import { ReactComponent as Banner } from "../../assets/Banner.svg";
import "./Header.module.css";

import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <Link to="/">
        <Banner />
      </Link>
    </header>
  );
}
