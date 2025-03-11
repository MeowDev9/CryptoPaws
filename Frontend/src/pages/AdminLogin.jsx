import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AdminLogin.css"; // Add your CSS for styling

const AdminLogin = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  // Handle form submission
  const handleAdminLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5001/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }), // Include name in the request
      });

      const result = await response.json();
      console.log("Backend Response:", result); // Debug the response

      if (response.ok) {
        setSuccessMessage("Admin login successful!");
        setErrorMessage("");

        // Store the token in localStorage
        localStorage.setItem("adminToken", result.token);

        // Redirect to the admin dashboard
        navigate("/admin/dashboard");
      } else {
        setErrorMessage(result.message || "Invalid credentials!");
        setSuccessMessage("");
      }
    } catch (error) {
      setErrorMessage("Server error: " + error.message);
      setSuccessMessage("");
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-container">
        <h1>Admin Login</h1>
        {/* Display error or success messages */}
        {errorMessage && <p className="admin-error-message">{errorMessage}</p>}
        {successMessage && <p className="admin-success-message">{successMessage}</p>}
        <form onSubmit={handleAdminLogin}>
          <div className="admin-form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="admin-form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="admin-form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="admin-login-button">Login as Admin</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;