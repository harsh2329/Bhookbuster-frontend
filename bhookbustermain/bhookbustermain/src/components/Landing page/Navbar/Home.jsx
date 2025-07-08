// import React from 'react';
// // import UserNavbar from '../../components/common/UserNavbar';
// import UserNavbar from '../../user/UserNavbar';
// import { Link } from 'react-router-dom';
// import '../../../assets/css/Home.css';

// const HomePage = () => {
//   // Sample featured offers data
//   const featuredOffers = [
//     {
//       id: 1,
//       restaurantName: "Spice Garden",
//       offerTitle: "20% Off on Family Meals",
//       description: "Enjoy 20% discount on all family meal packages from Monday to Thursday.",
//       expiryDate: "2025-04-15",
//       imageUrl: "src/assets/images/spaghetti.jpg"
//     },
//     {
//       id: 2,
//       restaurantName: "Pizza Palace",
//       offerTitle: "Buy 1 Get 1 Free",
//       description: "Order any large pizza and get a medium pizza absolutely free!",
//       expiryDate: "2025-04-10",
//       imageUrl: "src/assets/images/pizza.png"
//     },
//     {
//       id: 3,
//       restaurantName: "Sushi Heaven",
//       offerTitle: "30% Off on First Order",
//       description: "New customers get 30% off on their first order with code WELCOME30",
//       expiryDate: "2025-04-20",
//       imageUrl: "src/assets/images/Biriyani.png"
//     }
//   ];

//   return (
//     <div className="home-page">
//       <UserNavbar />
      
//       <div className="hero-section">
//         <div className="hero-content">
//           <h1>Discover the Best Food Deals Around You</h1>
//           <p>Bhookh Buster helps you find amazing restaurant offers and promotions in your area.</p>
//           <div className="search-container">
//             <input type="text" placeholder="Search by location, cuisine, or restaurant name" />
//             <button className="search-btn">Search</button>
//           </div>
//           <div className="hero-buttons">
//             <Link to="/signup" className="btn primary-btn">Join Now</Link>
//             {/* <Link to="/menu" className="btn secondary-btn">Browse Offers</Link> */}
//           </div>
//         </div>
//       </div>

//       <div className="features-section">
//         <h2>How Bhookh Buster Works</h2>
//         <div className="features-grid">
//           <div className="feature-card">
//             <div className="feature-icon">🔍</div>
//             <h3>Discover</h3>
//             <p>Find the best restaurant deals and offers in your vicinity with our advanced search options.</p>
//           </div>
//           <div className="feature-card">
//             <div className="feature-icon">💰</div>
//             <h3>Save</h3>
//             <p>Get exclusive discounts and offers from your favorite restaurants and eateries.</p>
//           </div>
//           <div className="feature-card">
//             <div className="feature-icon">📝</div>
//             <h3>Contribute</h3>
//             <p>Add offers you've discovered to help other food enthusiasts in the community.</p>
//           </div>
//           <div className="feature-card">
//             <div className="feature-icon">⭐</div>
//             <h3>Review</h3>
//             <p>Rate and review offers to help others make informed decisions.</p>
//           </div>
//         </div>
//       </div>

//       <div className="offers-section">
//         <h2>Featured Offers</h2>
//         <div className="offers-grid">
//           {featuredOffers.map(offer => (
//             <div key={offer.id} className="offer-card">
//               <div className="offer-image">
//                 <img src={offer.imageUrl} alt={offer.offerTitle} 
//                   onError={(e) => {
//                     e.target.onerror = null;
//                     e.target.src = "/assets/items/default-offer.jpg";
//                   }}
//                 />
//               </div>
//               <div className="offer-content">
//                 <h3>{offer.restaurantName}</h3>
//                 <h4>{offer.offerTitle}</h4>
//                 <p>{offer.description}</p>
//                 <div className="offer-expiry">Valid until: {new Date(offer.expiryDate).toLocaleDateString()}</div>
//                 <Link to={`/offer/${offer.id}`} className="btn view-offer-btn">View Details</Link>
//               </div>
//             </div>
//           ))}
//         </div>
//         <div className="view-more-container">
//           {/* <Link to="/menu" className="btn view-more-btn">View All Offers</Link> */}
//         </div>
//       </div>

//       <div className="cta-section">
//         <div className="cta-content">
//           <h2>Own a Restaurant?</h2>
//           <p>Join Bhookh Buster to showcase your offers and attract more customers.</p><br></br>
//           <Link to="/rdashboard" className="btn primary-btn">Partner With Us</Link>
//         </div>
//       </div>

//       <footer className="footer">
//         <div className="footer-content">
//           <div className="footer-logo">
//             <img src="/assets/items/logo.png" alt="Bhookh Buster" />
//             <p>Finding you the best food deals since 2023.</p>
//           </div>
//           <div className="footer-links">
//             <h3>Quick Links</h3>
//             <ul>
//               <li><Link to="/">Home</Link></li>
//               <li><Link to="/about">About Us</Link></li>
//               <li><Link to="/menu">Menu</Link></li>
//               <li><Link to="/offers">Special Offers</Link></li>
//               <li><Link to="/rdashboard">Partner with us</Link></li>
//             </ul>
//           </div>
//           <div className="footer-contact">
//             <h3>Contact Us</h3>
//             <p>Email: info@pocketbuddy.com</p>
//             <p>Phone: +1 (123) 456-7890</p>
//             <div className="social-icons">
//               <a href="#" aria-label="Facebook"><i className="fab fa-facebook"></i></a>
//               <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
//               <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
//             </div>
//           </div>
//         </div>
//         <div className="footer-bottom">
//           <p>&copy; {new Date().getFullYear()} Bhookh Buster. All rights reserved.</p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default HomePage;

import React, { useState, useEffect } from 'react';
import UserNavbar from '../../user/UserNavbar';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown, ChevronUp } from 'lucide-react';
import '../../../assets/css/Home.css';

const HomePage = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    quickLinks: false,
    contact: false
  });

  // Handle window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      if (!mobile) {
        setIsMenuOpen(false);
        setExpandedSections({
          quickLinks: false,
          contact: false
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Sample featured offers data
  const featuredOffers = [
    {
      id: 1,
      restaurantName: "Spice Garden",
      offerTitle: "20% Off on Family Meals",
      description: "Enjoy 20% discount on all family meal packages from Monday to Thursday.",
      expiryDate: "2025-04-15",
      imageUrl: "src/assets/images/spaghetti.jpg"
    },
    {
      id: 2,
      restaurantName: "Pizza Palace",
      offerTitle: "Buy 1 Get 1 Free",
      description: "Order any large pizza and get a medium pizza absolutely free!",
      expiryDate: "2025-04-10",
      imageUrl: "src/assets/images/pizza.png"
    },
    {
      id: 3,
      restaurantName: "Sushi Heaven",
      offerTitle: "30% Off on First Order",
      description: "New customers get 30% off on their first order with code WELCOME30",
      expiryDate: "2025-04-20",
      imageUrl: "src/assets/images/Biriyani.png"
    }
  ];

  return (
    <div className="home-page">
      <UserNavbar />
      
      <div className="hero-section">
        <div className="hero-content">
          <h1>Discover the Best Food Deals Around You</h1>
          <p>Bhookh Buster helps you find amazing restaurant offers and promotions in your area.</p>
          <div className="search-container">
            <input type="text" placeholder="Search by location, cuisine, or restaurant name" />
            <button className="search-btn">Search</button>
          </div>
          <div className="hero-buttons">
            <Link to="/signup" className="btn primary-btn">Join Now</Link>
            {/* <Link to="/menu" className="btn secondary-btn">Browse Offers</Link> */}
          </div>
        </div>
      </div>

      <div className="features-section">
        <h2>How Bhookh Buster Works</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>Discover</h3>
            <p>Find the best restaurant deals and offers in your vicinity with our advanced search options.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💰</div>
            <h3>Save</h3>
            <p>Get exclusive discounts and offers from your favorite restaurants and eateries.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📝</div>
            <h3>Contribute</h3>
            <p>Add offers you've discovered to help other food enthusiasts in the community.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⭐</div>
            <h3>Review</h3>
            <p>Rate and review offers to help others make informed decisions.</p>
          </div>
        </div>
      </div>

      <div className="offers-section">
        <h2>Featured Offers</h2>
        <div className="offers-grid">
          {featuredOffers.map(offer => (
            <div key={offer.id} className="offer-card">
              <div className="offer-image">
                <img src={offer.imageUrl} alt={offer.offerTitle} 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/assets/items/default-offer.jpg";
                  }}
                />
              </div>
              <div className="offer-content">
                <h3>{offer.restaurantName}</h3>
                <h4>{offer.offerTitle}</h4>
                <p>{offer.description}</p>
                <div className="offer-expiry">Valid until: {new Date(offer.expiryDate).toLocaleDateString()}</div>
                <Link to={`/offer/${offer.id}`} className="btn view-offer-btn">View Details</Link>
              </div>
            </div>
          ))}
        </div>
        <div className="view-more-container">
          {/* <Link to="/menu" className="btn view-more-btn">View All Offers</Link> */}
        </div>
      </div>

      <div className="cta-section">
        <div className="cta-content">
          <h2>Own a Restaurant?</h2>
          <p>Join Bhookh Buster to showcase your offers and attract more customers.</p><br></br>
          <Link to="/rdashboard" className="btn primary-btn">Partner With Us</Link>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <img src="/assets/items/logo.png" alt="Bhookh Buster" />
            <p>Finding you the best food deals since 2023.</p>
          </div>
          
          <div className="footer-links">
            <div className="footer-section-header" onClick={() => toggleSection('quickLinks')}>
              <h3>Quick Links</h3>
              {isMobile && (
                <span className="toggle-icon">
                  {expandedSections.quickLinks ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </span>
              )}
            </div>
            <ul className={`footer-list ${isMobile ? (expandedSections.quickLinks ? 'expanded' : 'collapsed') : ''}`}>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/menu">Menu</Link></li>
              <li><Link to="/offers">Special Offers</Link></li>
              <li><Link to="/rdashboard">Partner with us</Link></li>
            </ul>
          </div>
          
          <div className="footer-contact">
            <div className="footer-section-header" onClick={() => toggleSection('contact')}>
              <h3>Contact Us</h3>
              {isMobile && (
                <span className="toggle-icon">
                  {expandedSections.contact ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </span>
              )}
            </div>
            <div className={`footer-contact-content ${isMobile ? (expandedSections.contact ? 'expanded' : 'collapsed') : ''}`}>
              <p>Email: info@pocketbuddy.com</p>
              <p>Phone: +1 (123) 456-7890</p>
              <div className="social-icons">
                <a href="#" aria-label="Facebook"><i className="fab fa-facebook"></i></a>
                <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Bhookh Buster. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;