import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";
import logo from "../assets/images/v_logo.png";

const SignIn = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSignIn = () => {
    if (!credentials.email || !credentials.password) {
      alert("All fields are required!");
      return;
    }

    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, credentials)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        navigate("/");
      })
      .catch((error) => {
        console.error("There was an error during sign in!", error);
        alert("Invalid credentials. Please try again.");
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
          type="email"
          name="email"
          value={credentials.email}
          onChange={handleChange}
          placeholder="Enter email"
        />
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          placeholder="Enter password"
        />
        <button onClick={handleSignIn} className="auth-button">
          Sign In
        </button>
        <p>
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
