// Register.js
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth"; // Import updateProfile to set first and last name
import { auth, db } from "../firebase/firebaseConfig"; // Import the Firebase auth instance
import "./Register.css"; // Optional: Your custom styles
import { doc, setDoc } from "firebase/firestore"; // Import Firestore methods

import "./Login.css";
import { useNavigate } from "react-router-dom";

const Register = ({ onRegister }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Check for success
      if (userCredential.user) {
        const { uid } = userCredential.user;

        // Save first name and last name to Firestore
        await setDoc(doc(db, "users", uid), {
          firstName: firstName,
          lastName: lastName,
          email: email,
        });

        // Navigate to the login page after saving user data
        navigate("/login");
      }
    } catch (error) {
      // Log the error to understand what went wrong
      console.error("Registration error:", error);

      // Check for specific Firebase error codes and set the error message accordingly
      if (error.code === "auth/email-already-in-use") {
        setError("This email is already registered.");
      } else if (error.code === "auth/weak-password") {
        setError("Password should be at least 6 characters.");
      } else if (error.code === "auth/invalid-email") {
        setError("The email address is not valid.");
      } else {
        // Fallback to showing the Firebase error message if it's a different error
        setError(`Error: ${error.message}`);
      }
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Register</h2>
      {error && <p className="error-message">{error}</p>}
      <form className="register-form" onSubmit={handleRegister}>
        <div className="form-group">
          <label className="form-label">First Name</label>
          <input
            type="text"
            className="form-input"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter your first name"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Last Name</label>
          <input
            type="text"
            className="form-input"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter your last name"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
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
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Confirm Password</label>
          <input
            type="password"
            className="form-input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            required
          />
        </div>
        <button type="submit" className="register-button">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
