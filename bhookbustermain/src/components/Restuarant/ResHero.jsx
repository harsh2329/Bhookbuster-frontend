import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/ResHero.css';
import Rsidebar from './Rsidebar';

const LandingPage = () => {
  const [restaurantName, setRestaurantName] = useState('');
  const navigate = useNavigate();

  const handleContinue = () => {
    if (restaurantName.trim()) {
      // Navigate to signup page and pass the restaurant name
      navigate('/locationform', { state: { restaurantName } });
    } else {
      alert('Please enter your restaurant name');
    }
  };

  return (
    <>
    <Rsidebar ></Rsidebar>
    <div className="landing-container">
      <div className="left-panel">
        <div className="left-content">
          <h1>Partner With Us</h1>
          <h2>Grow Your Restaurant Business</h2>
          <p>Join thousands of restaurants that have boosted their revenue by 35% on average.</p>
          
          <div className="features">
            <div className="feature-item">
              <div className="feature-icon">🚀</div>
              <div className="feature-text">
                <h3>Expand Your Reach</h3>
                <p>Connect with hungry customers in your area</p>
              </div>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">📊</div>
              <div className="feature-text">
                <h3>Real-time Analytics</h3>
                <p>Track your performance and optimize operations</p>
              </div>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">💸</div>
              <div className="feature-text">
                <h3>Boost Revenue</h3>
                <p>Increase orders and average ticket size</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="right-panel">
        <div className="welcome-card">
          <h2>Welcome to the Family</h2>
          <p>Let's get started with your restaurant profile</p>
          
          <div className="input-group">
            <label htmlFor="restaurantName">What's your restaurant name?</label>
            <input 
              type="text" 
              id="restaurantName" 
              value={restaurantName}
              onChange={(e) => setRestaurantName(e.target.value)}
              placeholder="Enter restaurant name"
            />
          </div>
          
          <button 
            className="continue-btn"
            onClick={handleContinue}
          >
            <span>Continue</span>
            <span className="btn-icon">→</span>
          </button>
          
          <p className="existing-account">
            Already have an account? <a href="/login">Log in</a>
          </p>
        </div>
      </div>
    </div>
    </>
  );
};

export default LandingPage;