// styles:
import styles from "./Admin.module.css";

import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function Login() {
  const { user } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, sendVerificationEmail, isPending, error } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className={styles.content}>
      {user === null && (
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
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
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </label>
            {!isPending && (
              <button className={styles["login-signup-btn"]}>Log In</button>
            )}
            {isPending && (
              <button className={styles["login-signup-btn"]} disabled>
                Logging In...
              </button>
            )}
          </div>
          {error && (
            <div className="error-container">
              <p className="error">
                {error}
                <br />
                Please try again.
              </p>
            </div>
          )}
        </form>
      )}
      {user && !user.verifiedEmail && (
        <div className={styles.unverified}>
          <h1>Attention</h1>
          <p>Please, verify your email before enjoying site content.</p>
          <p>
            If you would like another verification email sent to you, click the
            button below.
          </p>
          <button
            className={styles["resend-btn"]}
            onClick={sendVerificationEmail}
          >
            Resend Email
          </button>
        </div>
      )}
    </div>
  );
}
