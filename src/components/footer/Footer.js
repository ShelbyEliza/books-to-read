import styles from "./Footer.module.css";

import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className={styles.container}>
      <Link to="/design">
        <h1>Design Guide</h1>
      </Link>
    </footer>
  );
}
