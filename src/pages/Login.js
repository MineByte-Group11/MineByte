import React, { useState } from "react";
import "./Login.css"; // Import the updated CSS
import logo from "../logo.svg";
import { auth } from "../firebase/firebaseConfig"
import { signInWithEmailAndPassword } from "firebase/auth";
import Cookies from "js-cookie"; // Import js-cookie

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Use Firebase to sign in
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Get the ID token from the authenticated user
      const idToken = await user.getIdToken();

      // Set cookie to expire in 1 hour
      Cookies.set("idToken", idToken, {
        expires: 1 / 24, // Expires in 1 hour
        secure: true,
        sameSite: "Strict",
      });

      // Pass the email as the username to the parent component
      onLogin(user); // Pass the entire user object, so that we can fetch additional details from Firestore
    } catch (error) {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <img src={logo} alt="Logo" className="logo" /> {/* Logo at the top */}
      <h2 className="login-title">Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
