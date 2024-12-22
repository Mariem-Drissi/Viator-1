import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaHome, FaInfoCircle, FaServicestack, FaEnvelope, FaUser, FaCaretDown } from "react-icons/fa";
import "../styles/Navbar.css";
import logo from "../assets/images/v_logo.png";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/signin");
  };

  return (
    <nav className="navbar">
      <a href="./">
        <div className="logo-section">
          <img src={logo} alt="Viator Logo" className="logo-image" />
          <span className="project-name">Viator</span>
        </div>
      </a>
      <ul className="nav-links">
        <li>
          <a href="#home">
            <FaHome className="icon" /> Home
          </a>
        </li>
        <li>
          <a href="#about">
            <FaInfoCircle className="icon" /> About
          </a>
        </li>
        <li>
          <a href="#services">
            <FaServicestack className="icon" /> Services
          </a>
        </li>
        <li>
          <a href="#contact">
            <FaEnvelope className="icon" /> Contact
          </a>
        </li>
      </ul>
      {isLoggedIn ? (
        <div className="dropdown">
          <button className="profile-button">
            <FaUser className="icon" /> <div className="marginn"> Profile </div><FaCaretDown className="caret-icon" />
          </button>
          <ul className="dropdown-menu">
            <li onClick={() => navigate("/profile")}>View Profile</li>
            <li onClick={() => navigate("/profile/edit")}>Edit Profile</li>
            <li onClick={handleLogout}>Logout</li>
          </ul>
        </div>
      ) : (
        <button className="login-button" onClick={() => navigate("/signin")}>
          <FaUser className="icon" /> Login
        </button>
      )}
    </nav>
  );
};

export default Navbar;
