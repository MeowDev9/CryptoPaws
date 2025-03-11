import React, { useState, useEffect } from "react";
import "../styles/ReportEmergency.css";

function ReportEmergency() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
    description: "",
    images: null,
  });

  const [isLocationLoaded, setIsLocationLoaded] = useState(false);

  // Get current location using Geolocation API
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(handlePosition, handleError);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  // Handle position response and reverse geocode to get the location
  const handlePosition = (position) => {
    const { latitude, longitude } = position.coords;

    const apiKey = 'AIzaSyBPjBHXmDnGvJULgTBQFScAlMCqGZUe16g';
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const address = data.results[0]?.formatted_address;
        if (address) {
          setFormData((prevData) => ({
            ...prevData,
            location: address,
          }));
          setIsLocationLoaded(true);
        } else {
          alert("Could not fetch the location.");
        }
      })
      .catch((error) => {
        console.error("Error fetching location:", error);
        alert("Unable to fetch location data.");
      });
  };

  // Handle error if location access is denied
  const handleError = (error) => {
    console.error("Error code:", error.code, "Error message:", error.message);
    alert("Failed to retrieve location.");
  };

  useEffect(() => {
    if (!isLocationLoaded) {
      getCurrentLocation();
    }
  }, [isLocationLoaded]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      // Convert FileList to an array and append new images
      const fileArray = Array.from(files);

      setFormData((prevData) => ({
        ...prevData,
        [name]: [...(prevData[name] || []), ...fileArray], 
      }));

    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const form = new FormData();  // Renamed to avoid confusion with state
      
      // Add all required fields from formData state
      form.append('name', formData.name);
      form.append('phone', formData.phone);
      form.append('location', formData.location);
      form.append('description', formData.description);
      
      // Add images if they exist
      if (formData.images && formData.images.length > 0) {
        formData.images.forEach((file) => {
          form.append('images', file);
        });
      }

      // Log the FormData to verify contents
      for (let pair of form.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }

      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5001/api/emergency', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: form
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
      }

      const data = await response.json();
      console.log('Success:', data);
      alert("Emergency reported successfully!");
      
      // Reset form after successful submission
      setFormData({
        name: "",
        phone: "",
        location: "",
        description: "",
        images: null,
      });
      
    } catch (error) {
      console.error('Error response:', error);
      alert("An error occurred while submitting the form.");
    }
  };

  return (
    <div className="report-emergency-page">
      <div className="report-container">
        <h1 className="report-title">Report Animal Medical Emergency</h1>
        <p className="report-subtitle">
          Please fill out the form below to report an emergency for any animal in need of urgent care.
        </p>
        <form onSubmit={handleSubmit} className="report-form">
          <div className="form-group">
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
              autoComplete="off"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
              required
              autoComplete="off"
            />
          </div>

          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              placeholder="Fetching location..."
              value={formData.location}
              required
              disabled
            />
          </div>

          <div className="form-group">
            <label htmlFor="images">Upload Image</label>
            <input
              type="file"
              id="images"
              name="images"
              accept="image/*"
              multiple  // ✅ Add this to allow multiple file selection
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              rows="4"
              placeholder="Describe the animal's condition and details of the emergency"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button type="submit" className="submit-button">
            Submit Report
          </button>
        </form>
      </div>
    </div>
  );
}

export default ReportEmergency;
