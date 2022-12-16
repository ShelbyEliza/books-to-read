// styles:
import styles from "./Admin.module.css";

import { useState, useEffect } from "react";
import { useSignup } from "../../hooks/useSignup";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [signupError, setSignupError] = useState(null);
  const [signupComplete, setSignupComplete] = useState(false);

  const { signup, isPending, error } = useSignup();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(email, password, displayName);
    setSignupComplete(true);
    // await redirectPage(signupResponse);
    // if (!error) {
    //   // console.log("right before logout");
    //   // logout();
    //   console.log("right before redirect");
    //   navigate("/login");
    // } else {
    //   setSignupError(error);
    // }
  };
  // const redirectPage = async (response) => {
  //   if (!error) {
  //     console.log(response);
  //     navigate("/login");
  //   } else {
  //     setSignupError(error);
  //   }
  // };
  useEffect(() => {
    if (signupComplete === true) {
      if (!error) {
        console.log("Signup is complete.");
        navigate("/login");
      } else {
        setSignupError(error);
      }
    }
  }, [signupComplete, error, navigate]);

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
              onChange={(e) => setPassword(e.target.value)}
              value={password}
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
        {signupError && <div className="error">{signupError}</div>}
      </form>
    </div>
  );
}
