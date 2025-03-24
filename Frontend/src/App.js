import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Donate from './pages/Donate';
import About from './pages/About';
import AdoptAnimal from './pages/AdoptAnimal';
import ReportEmergency from './pages/ReportEmergency';
import LoginPage from './pages/LoginPage';
import Donate2 from './pages/Donate2';
import ProfilePage from './pages/ProfilePage';
import RegisterWelfare from './pages/RegisterWelfare';
import AdminDashboard from "./pages/AdminDashboard";

import WelfareDashboard from "./pages/dashboards/welfare/WelfareDashboard";
import WelfareProfile from "./pages/dashboards/welfare/WelfareProfile";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/about" element={<About />} />
        <Route path="/adopt-animal" element={<AdoptAnimal />} />
        <Route path="/report-emergency" element={<ReportEmergency />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/donate2" element={<Donate2 />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/register-welfare" element={<RegisterWelfare />} />
        <Route path ="/admin/dashboard" element={<AdminDashboard/>} />
        <Route path="/welfare/dashboard" element={<WelfareDashboard />} />
        <Route path="/welfare/profile" element={<WelfareProfile />} />


  
      </Routes>
    </Router>
  );
}

export default App;
