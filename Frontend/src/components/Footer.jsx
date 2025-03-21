import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import { FaTwitter, FaFacebookF, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo & Description */}
        <div className="footer-about">
          <img src="/images/logo.png" alt="" />
          <p>
            CryptoPaws is dedicated to supporting animal welfare in Pakistan
            through cryptocurrency donations. Join us in making a difference!
          </p>
          <div className="footer-social-icons">
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaInstagram /></a>
          </div>
        </div>

        {/* Footer Menu */}
        <div className="footer-menu">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/donate">Donate</Link></li>
            <li><Link to="/adopt">Adopt</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="footer-contact">
          <h3>Have a Question?</h3>
          <p><i className="fas fa-map-marker-alt"></i> Lahore, Pakistan</p>
          <p><i className="fas fa-phone-alt"></i> +92 300 1234567</p>
          <p><i className="fas fa-envelope"></i> info@cryptopaws.org</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 CryptoPaws. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
