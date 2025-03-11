import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/AdminDashboard.css";

const AdminDashboard = () => {
  const [welfareRequests, setWelfareRequests] = useState([]);

  
  useEffect(() => {
    const fetchWelfareRequests = async () => {
      try {
        const token = localStorage.getItem("adminToken"); 
        const response = await axios.get("http://localhost:5001/api/admin/organizations/pending");
        setWelfareRequests(response.data);
      } catch (error) {
        console.error("Error fetching welfare requests:", error);
      }
    };

    fetchWelfareRequests();
  }, []);

  // Handle approve/reject
  const handleStatusUpdate = async (id, status) => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        console.error("No token found. Please log in again.");
        return;
      }

      await axios.put(
        `http://localhost:5001/api/admin/organizations/${id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );

      // Update the UI after status change
      setWelfareRequests(welfareRequests.filter((request) => request._id !== id));
      alert(`Request ${status} successfully!`);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="admin-dashboard-container">
      {/* Sidebar */}
      <div className="admin-dashboard-sidebar">
        <h2>Admin Dashboard</h2>
        <ul>
          <li>Welfare Requests</li>
          <li>Donations</li>
          <li>Adoptions</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="admin-dashboard-main-content">
        <h2>Pending Welfare Requests</h2>
        <table className="admin-dashboard-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Description</th>
              <th>Website</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {welfareRequests.map((request) => (
              <tr key={request._id}>
                <td>{request.name}</td>
                <td>{request.email}</td>
                <td>{request.phone}</td>
                <td>{request.address}</td>
                <td>{request.description}</td>
                <td>{request.website}</td>
                <td>
                  <button
                    className="admin-dashboard-approve-btn"
                    onClick={() => handleStatusUpdate(request._id, "approved")}
                  >
                    Approve
                  </button>
                  <button
                    className="admin-dashboard-reject-btn"
                    onClick={() => handleStatusUpdate(request._id, "rejected")}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
