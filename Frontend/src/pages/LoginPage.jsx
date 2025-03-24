import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginPage.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ParticlesComponent from "../components/Particles";

const LoginPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [role, setRole] = useState("Donor"); // Default role
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    let url = "";
    let data = { email, password };

    if (isSignUp) {
      url = "http://localhost:5001/api/auth/signup";
      data = { name, email, password, role };
    } else {
      switch (role) {
        case "Admin":
          url = "http://localhost:5001/api/admin/login";
          break;
        case "Welfare":
          url = "http://localhost:5001/api/welfare/login";
          break;
        default:
          url = "http://localhost:5001/api/auth/signin";
      }
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log("API Response:", result);

      if (response.ok) {
        setSuccessMessage(isSignUp ? "Signup successful!" : "Signin successful!");
        setErrorMessage("");

        if (!isSignUp && result.token) {
          if (role === "Admin") {
              localStorage.setItem("adminToken", result.token);
              navigate("/admin/dashboard");
          } else if (role === "Welfare") {
              localStorage.setItem("welfareToken", result.token);  // ✅ Store as welfareToken
              navigate("/welfare/dashboard");
          } else {
              localStorage.setItem("donorToken", result.token);  // ✅ Store as donorToken
              navigate("/donor/dashboard");
          }
      }
      
      } else {
        setErrorMessage(result.message || "An error occurred.");
        setSuccessMessage("");
      }
    } catch (error) {
      setErrorMessage("Server error: " + error.message);
      setSuccessMessage("");
    }
  };

  return (
    <>
      <Navbar />
      <div className="login-page">
        <div className="particles-container">
          <ParticlesComponent id="particles" />
        </div>

        <div className={`login-page-container ${isSignUp ? "active" : ""}`}>
          <div className="form-container">
            <form onSubmit={handleFormSubmit}>
              <h1>{isSignUp ? "Sign Up" : "Sign In"}</h1>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              {successMessage && <p className="success-message">{successMessage}</p>}
              {isSignUp && (
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              )}
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              
              <div className="role-slider">
                <label>Select Role:</label>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="Donor">Donor</option>
                  <option value="Welfare">Welfare</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>

              <button type="submit">{isSignUp ? "Sign Up" : "Sign In"}</button>
            </form>
          </div>

          <div className="toggle-container">
            <div className="toggle">
              <div className="toggle-panel toggle-left">
                <h1>Welcome Back!</h1>
                <p>Enter your details to continue</p>
                <button className="hidden" onClick={() => setIsSignUp(false)}>Sign In</button>
              </div>
              <div className="toggle-panel toggle-right">
                <h1>New Here?</h1>
                <p>Register to get started</p>
                <button className="hidden" onClick={() => setIsSignUp(true)}>Sign Up</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginPage;
