import React, { useState } from "react";
import { useLogin } from "../hooks/useLogin";
function Login() {
  const { login, isLoading, error, successuser } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();
    await login(email, password);
    console.log("sa");
  }
  return (
    <div>
      <form onSubmit={handleSubmit} className="login">
        <h3>Log in</h3>
        <label>Email:</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <label>Password:</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button disabled={isLoading} style={{ textTransform: "capitalize" }}>
          Log in
        </button>
        {error && (
          <div className="error" style={{ textTransform: "capitalize" }}>
            {error}
          </div>
        )}
        {successuser && (
          <div className="success" style={{ textTransform: "capitalize" }}>
            You have created an account successfully!
          </div>
        )}
      </form>
    </div>
  );
}

export default Login;
