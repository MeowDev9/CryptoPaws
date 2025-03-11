import React from "react";
import "./Footer.css"; // Import the CSS file

function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-columns">
        {/* About Us Section */}
        <div className="footer-column">
          <h3>About Us</h3>
          <p>
            CryptoPaws is a nonprofit platform dedicated to supporting animal
            welfare organizations through global cryptocurrency donations.
          </p>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <img src="/images/fb.png" alt="Facebook" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <img src="/images/twitter.png" alt="Twitter" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <img src="/images/insta.png" alt="Instagram" />
            </a>
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="footer-column">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/donate">Donate</a></li>
            <li><a href="/adopt">Adopt Animal</a></li>
            <li><a href="/faqs">FAQs</a></li>
            <li><a href="/about">About Us</a></li>
          </ul>
        </div>

        {/* Contact Us Section */}
        <div className="footer-column">
          <h3>Contact Us</h3>
          <p>Email: support@cryptopaws.org</p>
          <p>Phone: +123 456 7890</p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>&copy; 2024 CryptoPaws. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
