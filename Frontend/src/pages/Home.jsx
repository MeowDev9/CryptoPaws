import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// CardSection Component
const CardSection = ({ scrollPosition, handleLeftClick, handleRightClick }) => {
  return (
    <div className="home-cards-section">
      <div className="home-background-wrapper">
        <img
          src="/images/Background2.jpeg"
          alt="Background"
          className="home-background-image"
        />
        <div className="home-background-overlay"></div> {/* Overlay for background */}
      </div>
      <div className="home-cards-container">
        <button className="home-arrow-btn home-left-arrow" onClick={handleLeftClick}>
          ←
        </button>
        <div
          className="home-cards-wrapper"
          style={{ transform: `translateX(-${scrollPosition * 320}px)` }}
        >
          {/* Card 1 */}
          <div className="home-card">
            <img src="/images/card1.jpg" alt="Card 1" className="home-card-image" />
            <div className="home-card-content">
              <h3 className="home-card-title">Card Title 1</h3>
              <ul className="home-card-points">
                <li>Point 1</li>
                <li>Point 2</li>
                <li>Point 3</li>
              </ul>
              <button className="home-card-btn">Learn More</button>
            </div>
          </div>
          {/* Card 2 */}
          <div className="home-card">
            <img src="/images/card2.jpg" alt="Card 2" className="home-card-image" />
            <div className="home-card-content">
              <h3 className="home-card-title">Card Title 2</h3>
              <ul className="home-card-points">
                <li>Point 1</li>
                <li>Point 2</li>
                <li>Point 3</li>
              </ul>
              <button className="home-card-btn">Learn More</button>
            </div>
          </div>
          {/* Card 3 */}
          <div className="home-card">
            <img src="/images/card3.jpg" alt="Card 3" className="home-card-image" />
            <div className="home-card-content">
              <h3 className="home-card-title">Card Title 3</h3>
              <ul className="home-card-points">
                <li>Point 1</li>
                <li>Point 2</li>
                <li>Point 3</li>
              </ul>
              <button className="home-card-btn">Learn More</button>
            </div>
          </div>
          {/* Card 4 */}
          <div className="home-card">
            <img src="/images/card4.jpg" alt="Card 4" className="home-card-image" />
            <div className="home-card-content">
              <h3 className="home-card-title">Card Title 4</h3>
              <ul className="home-card-points">
                <li>Point 1</li>
                <li>Point 2</li>
                <li>Point 3</li>
              </ul>
              <button className="home-card-btn">Learn More</button>
            </div>
          </div>
          {/* Card 5 */}
          <div className="home-card">
            <img src="/images/card5.jpg" alt="Card 5" className="home-card-image" />
            <div className="home-card-content">
              <h3 className="home-card-title">Card Title 5</h3>
              <ul className="home-card-points">
                <li>Point 1</li>
                <li>Point 2</li>
                <li>Point 3</li>
              </ul>
              <button className="home-card-btn">Learn More</button>
            </div>
          </div>
          {/* Card 6 */}
          <div className="home-card">
            <img src="/images/card6.jpg" alt="Card 6" className="home-card-image" />
            <div className="home-card-content">
              <h3 className="home-card-title">Card Title 6</h3>
              <ul className="home-card-points">
                <li>Point 1</li>
                <li>Point 2</li>
                <li>Point 3</li>
              </ul>
              <button className="home-card-btn">Learn More</button>
            </div>
          </div>
        </div>
        <button className="home-arrow-btn home-right-arrow" onClick={handleRightClick}>
          →
        </button>
      </div>
    </div>
  );
};

// Home Component
function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [raisedAmount, setRaisedAmount] = useState(0);
  const [startCount, setStartCount] = useState(false); // Flag to start animation
  const [scrollPosition, setScrollPosition] = useState(0); // Scroll position state
  const homeContainerRef = useRef(null); // Ref for home-container
  const images = [
    "/images/slideshowdog.jpg",
    "/images/slideshowdogs.jpg",
  ];

  // Target raised amount
  const targetAmount = 17203;

  // Slideshow effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length); // Cycle through images
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [images.length]);

  // Counting animation effect
  useEffect(() => {
    if (startCount) {
      const increment = targetAmount / 100; // Increment value (to get smoother animation)
      const interval = setInterval(() => {
        setRaisedAmount((prevAmount) => {
          if (prevAmount + increment >= targetAmount) {
            clearInterval(interval); // Stop the interval once target is reached
            return targetAmount;
          }
          return prevAmount + increment;
        });
      }, 30); // Update every 30ms for smooth animation

      return () => clearInterval(interval); // Cleanup interval on component unmount
    }
  }, [startCount, targetAmount]);

  // Intersection Observer to detect scrolling
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartCount(true); // Start the counting animation
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the element is visible
    );

    if (homeContainerRef.current) {
      observer.observe(homeContainerRef.current); // Observe the home-container
    }

    return () => {
      if (homeContainerRef.current) {
        observer.unobserve(homeContainerRef.current); // Cleanup on unmount
      }
    };
  }, []);

  const totalCards = 6; // Total number of cards

  const handleLeftClick = () => {
    setScrollPosition((prev) => (prev === 0 ? totalCards - 1 : prev - 1));
  };

  const handleRightClick = () => {
    setScrollPosition((prev) => (prev === totalCards - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <Navbar />
      <div className="home-page">
        <div className="home-slideshow-container">
          <div className="home-slideshow-overlay"></div>
          <div className="home-slideshow-content">
            {/* Left Column: Headings */}
            <div className="home-slideshow-left">
              <h1 className="home-slideshow-h1">CryptoPaws</h1>
              <h2 className="home-slideshow-h2">Empowering Animal Charity with Blockchain Transparency</h2>
            </div>

            {/* Right Column: Login/Signup Button */}
            <div className="home-slideshow-right">
              <Link to="/report-emergency"><button className="home-slideshow-button">Report Emergency</button></Link>
              <Link to="/register-welfare"><button className="home-register-welfare-btn">Register as Welfare</button></Link>
            </div>
          </div>

          {/* Background Image Slideshow */}
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Slideshow ${index + 1}`}
              className={`home-slideshow-image ${index === currentIndex ? "active" : "inactive"}`}
            />
          ))}
        </div>

        {/* Black Overlay */}
        <div className="home-overlay"></div>
        <div className="home-container" ref={homeContainerRef}>
          <img className="home-paws-bg" src="/images/pawsbg.png" alt="paws-bg" />
          <div className="home-content-section">

            {/* Left Container */}
            <div className="home-left-container">
              <h1>DONATE NOW FOR A GREAT CAUSE</h1>
              <p>
                "Join us in making a difference! Our platform empowers global
                donors to support animal welfare in Pakistan using cryptocurrency.
                Together, we can save lives and provide care for animals in need"
              </p>
              <button className="home-donate-button">DONATE NOW</button>
              <div className="home-donation-section">
                <p>Raised so far</p>
                <h2>${raisedAmount.toFixed(2)}</h2> {/* Format to two decimal places */}
              </div>
            </div>

            {/* Right Container */}
            <div className="home-right-container">
              <img src="/images/animalrescue2.jpg" alt="dog rescue" className="home-animal-rescue-img" />
              <img
                src="/images/animalrescue.jpg"
                alt="Dog Rescue"
                className="home-animal-rescue-img"
              />
            </div>
          </div>
        </div>

        <div className="home-help-section">
          <h2 className="home-help-title">How you can take part?</h2>
          <p className="home-help-subtitle">
            You can take part by donating, reporting emergency cases, or
            by adopting animals. Every effort makes a difference!
          </p>
          <div className="home-help-cards">
            <div className="home-help-card">
              <img
                src="/images/donateicon.png"
                alt="Give Donation"
                className="home-help-icon"
              />
              <h3 className="home-help-card-title">Give donation</h3>
              <p className="home-help-card-description">
                Your donation funds vital programs and supports communities in
                need. Every contribution counts!
              </p>
            </div>
            <div className="home-help-card">
              <img
                src="/images/emergencyicon.png"
                alt="Report emergency"
                className="home-help-icon"
              />
              <h3 className="home-help-card-title">Report Emergency</h3>
              <p className="home-help-card-description">
                Report any type of emergency that a stray or home animal needs
                and our system will inform nearby animal rescue centers to reach
                there ASAP!
              </p>
            </div>
            <div className="home-help-card">
              <img
                src="/images/dogicon.png"
                alt="Adoption"
                className="home-help-icon"
              />
              <h3 className="home-help-card-title">Adopt Animal</h3>
              <p className="home-help-card-description">
                You can adopt any animal of your choice by paying some fee that
                will directly go to charity and you can also post your pet up for
                adoption.
              </p>
            </div>
          </div>
        </div>

        <CardSection
          scrollPosition={scrollPosition}
          handleLeftClick={handleLeftClick}
          handleRightClick={handleRightClick}
        />
      </div>
      <Footer />
    </>
  );
}

export default Home;