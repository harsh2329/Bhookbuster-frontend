
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { 
//   Menu, X, Home, Store, ShoppingBag, 
//   PlusCircle, Eye, LogOut, Coffee, ChevronLeft, ChevronRight
// } from 'lucide-react';
// import '../../assets/css/RDasboard/Rsidebar.css';
// import Rnav from './Rnav';

// const Rsidebar = () => {
//   const [isOpen, setIsOpen] = useState(true);

//   // Handle window resize for responsive behavior
//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth < 768) {
//         setIsOpen(false);
//       } else {
//         setIsOpen(true);
//       }
//     };

//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <>
//       <Rnav />
      
//       <div className={`restaurant-sidebar ${isOpen ? 'expanded' : 'collapsed'}`}>
//         <div className="sidebar-brand">
//           <Coffee size={24} />
//           <h3 className={`brand-text ${!isOpen && 'hidden'}`}>Resturant Dash</h3>
//         </div>

//         <div className="sidebar-content">
//           <div className="sidebar-section">
//             <Link to="/rdashboard" className="section-link">
//               <Home size={20} />
//               <span className={`section-text ${!isOpen && 'hidden'}`}>Dashboard</span>
//             </Link>
//           </div>

//           <div className="sidebar-divider"></div>
          
//           <div className="section-category">
//             <span className={`category-text ${!isOpen && 'hidden'}`}>Restaurant</span>
//           </div>

//           <div className="sidebar-section">
//             <Link to="/locationform" className="section-link">
//               <Store size={20} />
//               <span className={`section-text ${!isOpen && 'hidden'}`}>Add Restaurant</span>
//             </Link>
//           </div>

//           <div className="sidebar-section">
//             {/* <Link to="viewresturant" className="section-link">
//               <Eye size={20} />
//               <span className={`section-text ${!isOpen && 'hidden'}`}>View Restaurant</span>
//             </Link> */}
//           </div>

//           <div className="sidebar-divider"></div>
          
//           <div className="section-category">
//             <span className={`category-text ${!isOpen && 'hidden'}`}>Offers</span>
//           </div>

//           <div className="sidebar-section">
//             <Link to="/offer" className="section-link">
//               <PlusCircle size={20} />
//               <span className={`section-text ${!isOpen && 'hidden'}`}>Add Offer</span>
//             </Link>
//           </div>

//           <div className="sidebar-section">
//             {/* <Link to="" className="section-link">
//               <Eye size={20} />
//               <span className={`section-text ${!isOpen && 'hidden'}`}>View Offers</span>
//             </Link> */}
//           </div>

//           <div className="sidebar-divider"></div>
//         </div>

//         <div className="sidebar-footer">
//           {/* Toggle button placed at the bottom of the sidebar */}
//           <div className="toggle-container">
//             <button className="toggle-sidebar-btn" onClick={toggleSidebar}>
//               {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
//               <span className={`toggle-text ${!isOpen && 'hidden'}`}>
//                 {isOpen ? "Collapse" : "Expand"}
//               </span>
//             </button>
//           </div>
          
//           <div className="sidebar-section logout">
//             <Link to="/logout" className="section-link">
//               <LogOut size={20} />
//               <span className={`section-text ${!isOpen && 'hidden'}`}>Logout</span>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Rsidebar;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Menu, X, Home, Store, ShoppingBag,
  PlusCircle, Eye, LogOut, Coffee, ChevronLeft, ChevronRight
} from 'lucide-react';
import '../../assets/css/RDasboard/Rsidebar.css';
import Rnav from './Rnav';

const Rsidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Handle window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 675;
      setIsMobile(mobile);
      
      if (mobile) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    // Initial check
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Close sidebar when clicking outside on mobile
  const handleOverlayClick = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };

  // Close sidebar when clicking a link on mobile
  const handleLinkClick = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <Rnav />
      
      {/* Mobile menu button */}
      {isMobile && (
        <button 
          className="mobile-menu-btn" 
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      )}

      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div 
          className="sidebar-overlay" 
          onClick={handleOverlayClick}
        />
      )}

      <div className={`restaurant-sidebar ${isOpen ? 'expanded' : 'collapsed'} ${isMobile ? 'mobile' : ''}`}>
        <div className="sidebar-brand">
          <Coffee size={24} />
          <h3 className={`brand-text ${!isOpen && !isMobile && 'hidden'}`}>Restaurant Dash</h3>
        </div>

        <div className="sidebar-content">
          <div className="sidebar-section">
            <Link 
              to="/rdashboard" 
              className="section-link"
              onClick={handleLinkClick}
            >
              <Home size={20} />
              <span className={`section-text ${!isOpen && !isMobile && 'hidden'}`}>Dashboard</span>
            </Link>
          </div>

          <div className="sidebar-divider"></div>
          
          <div className="section-category">
            <span className={`category-text ${!isOpen && !isMobile && 'hidden'}`}>Restaurant</span>
          </div>

          <div className="sidebar-section">
            <Link 
              to="/locationform" 
              className="section-link"
              onClick={handleLinkClick}
            >
              <Store size={20} />
              <span className={`section-text ${!isOpen && !isMobile && 'hidden'}`}>Add Restaurant</span>
            </Link>
          </div>

          <div className="sidebar-section">
            {/* <Link to="viewresturant" className="section-link" onClick={handleLinkClick}>
              <Eye size={20} />
              <span className={`section-text ${!isOpen && !isMobile && 'hidden'}`}>View Restaurant</span>
            </Link> */}
          </div>

          <div className="sidebar-divider"></div>
          
          <div className="section-category">
            <span className={`category-text ${!isOpen && !isMobile && 'hidden'}`}>Offers</span>
          </div>

          <div className="sidebar-section">
            <Link 
              to="/offer" 
              className="section-link"
              onClick={handleLinkClick}
            >
              <PlusCircle size={20} />
              <span className={`section-text ${!isOpen && !isMobile && 'hidden'}`}>Add Offer</span>
            </Link>
          </div>

          <div className="sidebar-section">
            {/* <Link to="" className="section-link" onClick={handleLinkClick}>
              <Eye size={20} />
              <span className={`section-text ${!isOpen && !isMobile && 'hidden'}`}>View Offers</span>
            </Link> */}
          </div>

          <div className="sidebar-divider"></div>
        </div>

        <div className="sidebar-footer">
          {/* Toggle button - hidden on mobile */}
          {!isMobile && (
            <div className="toggle-container">
              <button className="toggle-sidebar-btn" onClick={toggleSidebar}>
                {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
                <span className={`toggle-text ${!isOpen && 'hidden'}`}>
                  {isOpen ? "Collapse" : "Expand"}
                </span>
              </button>
            </div>
          )}
          
          <div className="sidebar-section logout">
            <Link 
              to="/logout" 
              className="section-link"
              onClick={handleLinkClick}
            >
              <LogOut size={20} />
              <span className={`section-text ${!isOpen && !isMobile && 'hidden'}`}>Logout</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Rsidebar;