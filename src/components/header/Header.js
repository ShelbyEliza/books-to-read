// styles & assets:
import "./Header.module.css";
import Banner from "../../assets/Banner";

import { Link } from "react-router-dom";
import Navbar from "../navbar/Navbar";

export default function Header() {
  return (
    <header>
      <Link to="/">
        <Banner />
      </Link>
      <Navbar />
    </header>
  );
}
