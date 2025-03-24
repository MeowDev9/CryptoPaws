import React, { useState, useEffect, useCallback } from "react";
import "../../../styles/dashboards/WelfareProfilePage.css";

const WelfareProfile = () => {
  const token = localStorage.getItem("welfareToken");

  const [profile, setProfile] = useState({});
  const [formData, setFormData] = useState({
    organizationName: "",
    email: "",
    bio: "",
    phone: "",
    address: "",
    website: "",
    socialLinks: { facebook: "", instagram: "" },
  });

  const [profilePic, setProfilePic] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Fetch latest profile data (force refresh by adding timestamp)
  const fetchProfile = useCallback(async () => {
    try {
      const res = await fetch(`http://localhost:5001/api/welfare/profile?t=${new Date().getTime()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (res.ok) {
        setProfile(data);
        setFormData({
          organizationName: data.organizationName || "",
          email: data.email || "",
          bio: data.bio || "",
          phone: data.phone || "",
          address: data.address || "",
          website: data.website || "",
          socialLinks: data.socialLinks || { facebook: "", instagram: "" },
        });
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  }, [token]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  // ✅ Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Handle profile update
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5001/api/welfare/profile/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setMessage(data.message || "Profile updated successfully!");

      if (res.ok) {
        // ✅ Immediately update state
        setProfile((prev) => ({
          ...prev,
          ...formData,
        }));

        // ✅ Force refresh latest profile data from backend
        setTimeout(fetchProfile, 500); // Small delay to ensure backend updates
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage("Failed to update profile.");
    }

    setLoading(false);
  };

  // ✅ Handle profile picture upload
  const handleUploadPicture = async (e) => {
    e.preventDefault();
    if (!profilePic) {
      setMessage("Please select a file to upload.");
      return;
    }

    const imageData = new FormData();
    imageData.append("profilePic", profilePic);

    try {
      const res = await fetch("http://localhost:5001/api/welfare/profile/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: imageData,
      });

      const data = await res.json();
      setMessage(data.message || "Profile picture updated!");

      if (res.ok && data.profilePicture) {
        setProfile((prev) => ({ ...prev, profilePicture: data.profilePicture }));

        // ✅ Force refresh latest profile data
        setTimeout(fetchProfile, 500);
      }
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      setMessage("Failed to upload profile picture.");
    }
  };

  return (
    <div className="welfare-profile-container">
      <h2>Welfare Profile</h2>

      {profile.profilePicture && (
        <img
          src={`http://localhost:5001${profile.profilePicture}`}
          alt="Profile"
          className="welfare-profile-pic"
        />
      )}

      {/* Profile Picture Upload */}
      <form onSubmit={handleUploadPicture} className="welfare-profile-form">
        <label>Upload Profile Picture:</label>
        <input type="file" onChange={(e) => setProfilePic(e.target.files[0])} accept="image/*" />
        <button type="submit">Upload</button>
      </form>

      {/* Profile Update Form */}
      <form onSubmit={handleUpdateProfile} className="welfare-profile-form">
        <label>Organization Name:</label>
        <input type="text" name="organizationName" value={formData.organizationName} onChange={handleChange} />

        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} />

        <label>Bio:</label>
        <textarea name="bio" value={formData.bio} onChange={handleChange} />

        <label>Phone:</label>
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} />

        <label>Address:</label>
        <input type="text" name="address" value={formData.address} onChange={handleChange} />

        <label>Website:</label>
        <input type="text" name="website" value={formData.website} onChange={handleChange} />

        <label>Facebook:</label>
        <input
          type="text"
          name="facebook"
          value={formData.socialLinks.facebook}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              socialLinks: { ...prev.socialLinks, facebook: e.target.value },
            }))
          }
        />

        <label>Instagram:</label>
        <input
          type="text"
          name="instagram"
          value={formData.socialLinks.instagram}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              socialLinks: { ...prev.socialLinks, instagram: e.target.value },
            }))
          }
        />

        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>

      {message && <p className="welfare-profile-message">{message}</p>}
    </div>
  );
};

export default WelfareProfile;
