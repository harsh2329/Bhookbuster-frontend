// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import '../../assets/css/RDasboard/Rnav.css';
// import { Menu, Bell, User } from 'lucide-react';
// const Rnavbar = ({ toggleSidebar, isOpen }) => {
//   const [restaurantName, setRestaurantName] = useState('');
  
//   useEffect(() => {
//     // Retrieve restaurant name from localStorage on component mount
//     const storedRestaurantName = localStorage.getItem('restaurantName');
//     if (storedRestaurantName) {
//       setRestaurantName(storedRestaurantName);
//     }
//   }, []);

//   return (
//     <nav className="restaurant-navbar">
//       <div className="navbar-container">
//       <div className="restaurant-navbar">
      
      
      
//     </div>
//         {/* Left side logo/brand */}
//         <h1>hello hrlloo</h1>
        
//         <div className="navbar-brand">
//           <Link to="/">
//             <img src="/assets/images/logo.png" alt="FoodApp" className="logo" />
//           </Link>
//         </div>
        
//         {/* Center area - Restaurant Name */}
//         <div className="navbar-center">
//           {restaurantName && (
//             <h2 className="restaurant-title">{restaurantName}</h2>
//           )}
//         </div>
        
//         {/* Right side navigation items */}
//         <div className="navbar-buttons">
//           <Link to="/rsignup" className="nav-button register-button">
//             Register
//           </Link>
//           <Link to="/rlogin" className="nav-button login-button">
//             Login
//           </Link>
//         </div>
//       </div>
//     </nav>
//   );
// };



// export default Rnavbar;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/RDasboard/Rnav.css';
import { Menu, Bell, User, Search } from 'lucide-react';
// import Rsidebar from './Rsidebar';

const Rnavbar = ({ toggleSidebar, isOpen }) => {
  const [restaurantName, setRestaurantName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    // Retrieve restaurant name from localStorage on component mount
    const storedRestaurantName = localStorage.getItem('restaurantName');
    if (storedRestaurantName) {
      setRestaurantName(storedRestaurantName);
    }
  }, []);
  
  return (
    <nav className="restaurant-navbar">
      <div className="navbar-container">
        {/* Left side - Logo<Rsidebar /> */}
        <div className="navbar-brand">
          {/* <Link to="/">
            <img src="/assets/images/logo.png" alt="FoodApp" className="logo" />
          </Link> */}
        </div>
        
        {/* Center - Restaurant Name */}
        {restaurantName && (
          <div className="navbar-center">
            <h2 className="restaurant-title">{restaurantName}</h2>
          </div>
        )}
        
        {/* Search Bar */}
        <div className="search-container">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            className="search-input" 
            placeholder="Search restaurants, orders..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* Right side - Actions */}
        <div className="navbar-buttons">
          <Link to="/rlogin" className="nav-button login-button">
            Login
          </Link>
          <Link to="/rsignup" className="nav-button register-button">
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Rnavbar;