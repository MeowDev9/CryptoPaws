import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginPage.css";

const LoginPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  // States for form input
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const url = isSignUp
      ? "http://localhost:5001/api/auth/signup"
      : "http://localhost:5001/api/auth/signin";

    const data = { name, email, password };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log("API Response:", result); // Debug the response

      if (response.ok) {
        setSuccessMessage(isSignUp ? "Signup successful!" : "Signin successful!");
        setErrorMessage("");

        if (isSignUp) {
          // Switch to the signin form after successful signup
          setIsSignUp(false);
        } else {
          // Store the token and navigate to the profile page
          if (result.token) {
            localStorage.setItem("token", result.token);
            console.log("Token stored in localStorage:", result.token);
            navigate("/profile");
          } else {
            setErrorMessage("No token received from server.");
          }
        }
      } else {
        // Display error messages from the server
        setErrorMessage(result.message || "An error occurred.");
        setSuccessMessage("");
      }
    } catch (error) {
      // Handle any client-side or network errors
      setErrorMessage("Server error: " + error.message);
      setSuccessMessage("");
    }
  };

  return (
    <div className="login-page">
      <img src="/images/BlockChain.jpeg" alt="Background" className="background-image" />
      <div className={`container ${isSignUp ? "active" : ""}`} id="container">
        {/* Sign-Up Form */}
        <div className="form-container sign-up">
          <form onSubmit={handleFormSubmit}>
            <h1>Create Account</h1>
            {/* Display error or success messages */}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
            <span>Enter your username for registration</span>
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Sign Up</button>
          </form>
        </div>

        {/* Sign-In Form */}
        <div className="form-container sign-in">
          <form onSubmit={handleFormSubmit}>
            <h1>Sign In</h1>
            {/* Display error or success messages */}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
            <span>or use your email password</span>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <a href="#">→ Forget Your Password? ←</a>
            <button type="submit">Sign In</button>
            {/* Admin Login Link with updated styling */}
            { <p style={{ textAlign: "center", marginTop: "1rem" }}>
              <a 
                href="/admin/login" 
                style={{ 
                  color: "#333", 
                  textDecoration: "underline",
                  fontWeight: "bold", 
                  display: "block", 
                  padding: "10px" 
                }}
              >
                Are you an admin? Login here
              </a>
            </p> }
          </form>
        </div>

        {/* Toggle Buttons */}
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Welcome Back!</h1>
              <p>Enter your personal details to use all site features</p>
              <button
                className="hidden"
                id="login"
                onClick={() => setIsSignUp(false)}
              >
                Sign In
              </button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>New Here?</h1>
              <p>Register with your personal details to use all site features</p>
              <button
                className="hidden"
                id="register"
                onClick={() => setIsSignUp(true)}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;