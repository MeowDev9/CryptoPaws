import React, { useState } from "react";
import '../styles/RegisterWelfare.css';

const RegisterWelfare = () => {
    const [formData, setFormData] = useState({
        organizationName: "",
        email: "",
        password: "",
        phone: "",
        address: "",
       description: "",
       website: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:5001/api/welfare/register", 
            {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...formData, role: "welfare" }),
        });

        const data = await response.json();

        if (response.ok) {
            alert("Registration request submitted! Awaiting admin approval.");
            setFormData({
                organizationName: "",
                email: "",
                password: "",
                phone: "",
                address: "",
                description: "",
                website: "",
            });
        } else {
            alert(data.message);
        }
    };

    return (
        <div className="register-welfare-container">
        <h2>Register as Welfare Organization</h2>
        <form onSubmit={handleSubmit} className="welfare-form">
            <input
                type="text"
                name="organizationName"
                placeholder="Organization Name"
                value={formData.organizationName}
                onChange={handleChange}
                required
            />
    
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
            />

            <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
            />
    
            <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
            />
    
            <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                required
            />
    
            <input
                type="url"
                name="website"
                placeholder="Website URL"
                value={formData.website}
                onChange={handleChange}
                required
            />
    
            <textarea
                name="description"
                placeholder="Brief Description"
                value={formData.description}
                onChange={handleChange}
                required
            />
    
            <button type="submit" className="submit-btn">Submit Registration</button>
        </form>
    </div>
    
    );
};

export default RegisterWelfare;
