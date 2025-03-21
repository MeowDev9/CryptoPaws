import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ProfilePage.css';
import { useNavigate } from 'react-router-dom';

const API_URL = "http://localhost:5001/api/profile/profile";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_URL}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        setUser(response.data);
        setFormData(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching user data:", error);
        if (error.response?.status === 401) {
          navigate("/login");
        }
        setError('Failed to fetch user data');
      }
    };

    fetchUser();
  }, [navigate]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.put(
        `${API_URL}/profile`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUser(res.data);
      setIsEditing(false);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Failed to save changes');
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`${API_URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Account deleted successfully!');
      setUser(null);
    } catch (err) {
      console.error(err);
      setError('Failed to delete account');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  if (error) return <p className="error">{error}</p>;
  if (!user) return <p>Loading...</p>;

  return (
    <div className="profile-container">
      <h1>User Profile</h1>
      {isEditing ? (
        <div className="profile-form">
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>
          <button className="save-btn" onClick={handleSave}>Save</button>
        </div>
      ) : (
        <div className="profile-info">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <button className="edit-btn" onClick={handleEdit}>Edit</button>
          <button className="delete-btn" onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
