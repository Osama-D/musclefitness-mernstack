import React, { useState } from "react";
import { useSignup } from "../hooks/useSignup";
function Signup() {
  const { signup, error, isLoading, successuser } = useSignup();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();
    await signup(email, password);
  }
  return (
    <div>
      <form onSubmit={handleSubmit} className="signup">
        <h3>Sign up</h3>
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
        <button style={{ textTransform: "capitalize" }} disabled={isLoading}>
          Sign up
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

export default Signup;
