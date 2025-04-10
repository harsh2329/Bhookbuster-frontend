import React from 'react'
import { FaLinkedin, FaInstagram, FaFacebook, FaPinterest, FaTwitter } from "react-icons/fa";

export const Footer = () => {
  return (
    
  <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <h2>Pocket Buddy</h2>
            <p>© 2025 Pocket Buddy Limited</p>
        </div>
    
        <div className="footer-links">
          <div>
            <h3>Company</h3>
            <ul>
              <li>About Us</li>
              <li>Careers</li>
              <li>Team</li>
              <li>Pocket Plus</li>
              <li>Pocket Market</li>
              <li>Pocket Dine</li>
              <li>Pocket Genie</li>
            </ul>
          </div>
    
          <div>
             <h3>Contact Us</h3>
              <ul>
                <li>Help & Support</li>
                <li>Partner With Us</li>
                <li>Ride With Us</li>
              </ul>
          </div>
    
          <div>
            <h3>Available In</h3>
              <ul>
                <li>New York</li>
                <li>Los Angeles</li>
                <li>Chicago</li>
                <li>Houston</li>
                <li>San Francisco</li>
              </ul>
          </div>
    
          <div>
            <h3>Legal</h3>
            <ul>
              <li>Terms & Conditions</li>
              <li>Privacy Policy</li>
              <li>Cookie Policy</li>
            </ul>
          </div>
    
          <div>
            <h3>Social Links</h3>
            <div className="social-icons">
              <FaLinkedin />
              <FaInstagram />
              <FaFacebook />
              <FaPinterest />
              <FaTwitter />
            </div>
          </div>
    </div>
  </div>
    
    <div className="footer-bottom">
      <p>For a better experience, download the Pocket Buddy app now</p>
      <div className="app-buttons">
        <img src="/app-store.png" alt="App Store" />
        <img src="/google-play.png" alt="Google Play" />
      </div>
    </div>
  </footer>
         
  )
}