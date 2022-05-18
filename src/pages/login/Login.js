// styles:
import "./Login.css";

import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isPending, error } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="login">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="input-container">
          <label>
            <span>Email:</span>
            <div></div>
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
            <div></div>
            <input
              required
              autoComplete="current-password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </label>
          {!isPending && <button className="btn">Log In</button>}
          {isPending && (
            <button className="btn" disabled>
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
    </div>
  );
}
