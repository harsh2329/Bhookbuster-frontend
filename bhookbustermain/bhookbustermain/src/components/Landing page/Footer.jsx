import React from 'react'
import { FaLinkedin, FaInstagram, FaFacebook, FaPinterest, FaTwitter } from "react-icons/fa";
import { FaUtensils, FaBowlFood, FaBurger } from "react-icons/fa6";
import '../../assets/css/Footer.css';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <div className="logo-container">
            <FaUtensils className="logo-icon" />
            <h2>Bhookbuster</h2>
          </div>
          <p>© 2025 Bhookbuster Culinary Ventures</p>
        </div>
    
        <div className="footer-links">
          <div>
            <h3>Company</h3>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Our Team</a></li>
              <li><a href="#">Bhook Premier</a></li>
              <li><a href="#">Bhook Bazaar</a></li>
              <li><a href="#">Bhook Express</a></li>
              <li><a href="#">Chef Connect</a></li>
            </ul>
          </div>
    
          <div>
             <h3>Contact Us</h3>
              <ul>
                <li><a href="#">Help & Support</a></li>
                <li><a href="#">Restaurant Partners</a></li>
                <li><a href="#">Delivery Partners</a></li>
                <li><a href="#">Corporate Orders</a></li>
              </ul>
          </div>
    
          <div>
            <h3>Available In</h3>
              <ul>
                <li><a href="#">Mumbai</a></li>
                <li><a href="#">Delhi</a></li>
                <li><a href="#">Bangalore</a></li>
                <li><a href="#">Hyderabad</a></li>
                <li><a href="#">Chennai</a></li>
              </ul>
          </div>
    
          <div>
            <h3>Legal</h3>
            <ul>
              <li><a href="#">Terms & Conditions</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Cookie Policy</a></li>
              <li><a href="#">Refund Policy</a></li>
            </ul>
          </div>
    
          <div>
            <h3>Connect With Us</h3>
            <div className="social-icons">
              <a href="#" aria-label="LinkedIn"><FaLinkedin /></a>
              <a href="#" aria-label="Instagram"><FaInstagram /></a>
              <a href="#" aria-label="Facebook"><FaFacebook /></a>
              <a href="#" aria-label="Pinterest"><FaPinterest /></a>
              <a href="#" aria-label="Twitter"><FaTwitter /></a>
            </div>
          </div>
        </div>
      </div>
    
      <div className="footer-bottom">
        <div className="footer-tagline">
          <FaBowlFood className="footer-icon" />
          <p>Satisfying Your Cravings, One Delivery At A Time</p>
          <FaBurger className="footer-icon" />
        </div>
        <p>For a delicious experience, download the Bhookbuster app now</p>
        <div className="app-buttons">
          <a href="#"><img src="/api/placeholder/120/40" alt="App Store" /></a>
          <a href="#"><img src="/api/placeholder/120/40" alt="Google Play" /></a>
        </div>
      </div>
    </footer>
  )
}