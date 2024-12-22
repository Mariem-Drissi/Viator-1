import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";
import logo from "../assets/images/v_logo.png";

const SignUp = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignUp = () => {
    if (!formData.name || !formData.email || !formData.password) {
      alert("All fields are required!");
      return;
    }

    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/auth/register`, formData)
      .then(() => {
        alert("Registration successful!");
        navigate("/");
      })
      .catch((error) => {
        console.error("There was an error during registration!", error);
      });
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
      <div className="auth-header" onClick={() => navigate("/")}>
        <img src={logo} alt="Viator Logo" className="auth-logo" />
        <h1 className="auth-title">Viator</h1>
      </div>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter name"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter email"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter password"
        />
        <button onClick={handleSignUp} className="auth-button">
          Sign Up
        </button>
        <p>
          Already have an account? <a href="/signin">Sign In</a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
