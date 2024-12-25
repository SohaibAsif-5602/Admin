import React from "react";
import "../styles/Login.css";
import { Link } from 'react-router-dom';
import logo from './Assets/machiro.png'; // Make sure to place the logo.png in your src folder
import { FaUser, FaLock } from 'react-icons/fa';
const Login = () => {
  return (
    <div className="container">
      <div className="left-section">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <div className="right-section">
        <form className="login-form">
          <h2 className="login-title">Login</h2>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="input-wrapper">
              <FaUser className="icon" />
              <input type="email" id="email" placeholder="Enter your email" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <FaLock className="icon" />
              <input type="password" id="password" placeholder="Enter your password" />
            </div>
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
        <div className="redirect-text">
          <p>Don't have account? <Link to="/Signup">SignUp</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
