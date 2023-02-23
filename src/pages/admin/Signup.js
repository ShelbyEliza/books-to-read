// styles:
import styles from "./Admin.module.css";

import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const { signup, isPending, error } = useSignup();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(email, password, displayName);
  };

  return (
    <div className={styles.content}>
      <form onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <div className={styles["content-container"]}>
          <label>
            <span>Email:</span>
            <input
              required
              autoComplete="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </label>
          <label>
            <span>Password:</span>
            <input
              required
              autoComplete="current-password"
              type="password"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              minLength="8"
              maxLength="22"
              title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
            />
          </label>
          <label>
            <span>Display Name:</span>
            <input
              required
              type="text"
              onChange={(e) => setDisplayName(e.target.value)}
              value={displayName}
            />
          </label>
          {!isPending && (
            <button className={styles["login-signup-btn"]}>Sign Up</button>
          )}
          {isPending && (
            <button className={styles["login-signup-btn"]} disabled>
              Signing Up...
            </button>
          )}
        </div>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}
