// styles & assets:
import { ReactComponent as Banner } from "../../assets/Banner.svg";
import "./Header.module.css";

import { Link } from "react-router-dom";
// import Navbar from "../navbar/Navbar";

export default function Header() {
  return (
    <header>
      <Link to="/">
        <Banner />
      </Link>
      {/* <Navbar /> */}
    </header>
  );
}
