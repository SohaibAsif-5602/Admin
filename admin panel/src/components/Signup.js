import React from 'react';
import '../styles/Signup.css';
import { Link } from 'react-router-dom';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa'; // Import icons
import logo from './Assets/machiro.png';

const Signup = () => {
  return (
    <div className="container">
      <div className="left-section">
        <img src={logo} alt="Logo" className="logo" />
        </div>
      <div className="right-section">
        <form className="signup-form">
          <h2 className="signup-title">Sign Up</h2>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <div className="input-wrapper">
              <FaUser className="icon" />
              <input type="text" id="username" placeholder="Enter your username" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="input-wrapper">
              <FaEnvelope className="icon" />
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
          <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <div className="input-wrapper">
              <FaLock className="icon" />
              <input type="password" id="confirm-password" placeholder="Confirm your password" />
            </div>
          </div>
          <button type="submit" className="signup-button">Sign Up</button>
        </form>
        <div className="redirect-text">
          <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;