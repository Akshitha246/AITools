import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Styling matches image

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated delay
      localStorage.setItem(
        "memorease-user",
        JSON.stringify({
          name: email.split("@")[0],
          email,
          isLoggedIn: true,
        })
      );
      alert("Login successful!");
      navigate("/aitools");
    } catch (error) {
      alert("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <div className="icon">🧪</div>
          <h2>Welcome to MemorEase</h2>
          <p>Enter your credentials to sign in to your account</p>
        </div>
        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input
            type="email"
            placeholder="john.doe@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="forgot-password">
            <a href="/auth/forgot-password">Forgot password?</a>
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Login"}
          </button>
          <p className="signup-text">
            Don't have an account? <a href="/auth/register">Sign up</a>
          </p>
        </form>
      </div>
    </div>
  );
}
