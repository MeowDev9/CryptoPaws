import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const WelfareDashboard = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});

  const token = localStorage.getItem("welfareToken");

  useEffect(() => {
    fetch("http://localhost:5001/api/welfare/profile", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched Profile Data:", data);
        setProfile(data);
      })
      .catch((err) => console.error("Error fetching profile:", err));
  }, [token]);

  return (
    <div className="welfare-dashboard">
      <div className="welfare-header">
        {/* Display Profile Picture */}
        {profile.profilePicture ? (
          <img
            src={`http://localhost:5001${profile.profilePicture}`}
            alt="Profile"
            className="welfare-home-profile-pic"
          />
        ) : (
          <div className="welfare-placeholder">No Profile Picture</div>
        )}

        {/* Display Name */}
        <h2>{profile.organizationName || "Welfare Name"}</h2>

        {/* Profile Button (Moved to Right) */}
        <button className="profile-btn" onClick={() => navigate("/welfare/profile")}>
          Go to Profile
        </button>
      </div>

      <p>This is your dashboard where you will manage your profile and cases.</p>
    </div>
  );
};

export default WelfareDashboard;
