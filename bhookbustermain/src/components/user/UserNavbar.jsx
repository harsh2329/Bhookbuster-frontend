

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../assets/css/adminlte.min.css';

const UserNavbar = () => {
  const navigate = useNavigate();
  
  // Check if user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState('');
  const [profilePic, setProfilePic] = useState('/assets/items/default-profile.png'); // Default profile pic
  
  // Theme state management
  const [darkMode, setDarkMode] = useState(() => {
    // Check if user has a theme preference stored
    const savedTheme = localStorage.getItem('theme');
    // Return true if dark mode was saved, or default to true
    return savedTheme ? savedTheme === 'dark' : true;
  });

  // Fetch user data including profile picture
  const fetchUserData = async (id) => {
    try {
      // Replace with your actual API endpoint
      const response = await axios.get(`/api/users/${id}`);
      
      // Based on your response structure
      if (response.data && response.data.data && response.data.data.profilePicPath) {
        const profileImageUrl = response.data.data.profilePicPath;
        setProfilePic(profileImageUrl);
        localStorage.setItem("profilePicPath", profileImageUrl);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      // If there's an error fetching, try to use what's in localStorage as fallback
      const storedProfilePic = localStorage.getItem("profilePicPath");
      if (storedProfilePic) {
        setProfilePic(storedProfilePic);
      }
    }
  };

  // Check login status on component mount
  useEffect(() => {
    const storedId = localStorage.getItem("id");
    
    if (storedId) {
      setIsLoggedIn(true);
      setUserId(storedId);
      
      // Check if profile pic is stored in localStorage and use it initially
      const storedProfilePic = localStorage.getItem("profilePicPath");
      if (storedProfilePic) {
        setProfilePic(storedProfilePic);
      }
      
      // Then fetch the latest user data
      fetchUserData(storedId);
    }
  }, []);

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

  // Handle logout
  const handleLogout = () => {
    // Clear localStorage items
    localStorage.removeItem("id");
    localStorage.removeItem("profilePicPath");
    // Any other items you need to clear
    
    // Update state
    setIsLoggedIn(false);
    setUserId('');
    setProfilePic('/assets/items/default-profile.png');
    
    // Redirect to home page
    navigate('/');
  };

  // For debugging - you can remove this in production
  useEffect(() => {
    console.log("Current profile pic:", profilePic);
  }, [profilePic]);

  return (
    <nav className="navbar">
      
      
      <div className="navbar">
  <div className="navbar-logo-container">
    <Link to="/">
      <img src={"/assets/items/logo.png"} alt="BHOOKBUSTER" className="navbar-logo" />
    </Link>
    <div className="navbar-left">
        <Link to="/">Home</Link>
        <Link to="/about">About Us</Link>
        <Link to="/menu">Menu</Link>
        <Link to="/offers">Special Offers</Link>
      </div>
  </div>
  {/* Other navbar items here */}
</div>


      <div className="navbar-right">
     
        <Link to="/rdashboard">Partner with us</Link>
        
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
        
        {isLoggedIn ? (
          <>
            <button
              onClick={handleLogout}
              className="logout-btn"
              style={{
                background: 'none',
                border: '1px solid var(--border-color)',
                borderRadius: '4px',
                padding: '0.5rem 0.75rem',
                color: 'var(--text-color)',
                cursor: 'pointer',
                transition: 'var(--transition)',
                marginLeft: '10px'
              }}
            >
              Logout
            </button>
            
            <Link to="/profile" className="profile-link">
              <img 
                src={profilePic} 
                alt="Profile" 
                className="profile-pic"
                style={{
                  width: '35px',
                  height: '35px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  marginLeft: '10px',
                  border: '2px solid var(--border-color)'
                }}
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = '/assets/items/default-profile.png';
                }}
              />
            </Link>
          </>
        ) : (
          <>
            <Link to="login">Login</Link>
            <Link to="signup">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default UserNavbar;