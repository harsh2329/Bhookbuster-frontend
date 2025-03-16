import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/adminlte.min.css';

const UserNavbar = () => {
  // Theme state management
  const [darkMode, setDarkMode] = useState(() => {
    // Check if user has a theme preference stored
    const savedTheme = localStorage.getItem('theme');
    // Return true if dark mode was saved, or default to true
    return savedTheme ? savedTheme === 'dark' : true;
  });

  // Toggle between light and dark mode
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  // Apply theme changes when darkMode state changes
  useEffect(() => {
    // Update localStorage
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    
    // Apply theme to document
    if (darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, [darkMode]);

  return (
    <nav className="navbar">
      {/* <div className="navbar-left">
        <Link to="/">Home</Link>
        <Link to="/about">About Us</Link>
        <Link to="/menu">Menu</Link>
        <Link to="/offers">Special Offers</Link>
      </div> */}
      
      <div className="navbar-center">
        <Link to="/">
          <img src={"/assets/items/logo.png"} alt="BHOOKBUSTER" className="navbar-logo" />
        </Link>
      </div>
      
      <div className="navbar-right">
      <Link to="/rsignup">Partner with us</Link> 
        <button 
          onClick={toggleTheme} 
          className="theme-toggle"
          aria-label="Toggle theme"
          style={{
            background: 'none',
            border: '1px solid var(--border-color)',
            borderRadius: '4px',
            padding: '0.5rem 0.75rem',
            color: 'var(--text-color)',
            cursor: 'pointer',
            transition: 'var(--transition)'
          }}
        >
          {darkMode ? '☀️ Light' : '🌙 Dark'}
        </button>
        <Link to="login">Login</Link>
        <Link to="signup">Sign Up</Link>
      </div>
    </nav>
  );
};

export default UserNavbar;