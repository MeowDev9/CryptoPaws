import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="logo">
        <img src="/images/logo.png" alt="Logo" />
      </div>
      <nav className="menu">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/donate">Donate</Link></li>
          <li><Link to="/adopt-animal">Adopt Animal</Link></li>
          <li><Link to="/report-emergency">Report Emergency</Link></li>
          <li><Link to="/about">About</Link></li>
          <li>
            <Link to="/login">
              <button className="login-btn">Login/Signup</button>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
