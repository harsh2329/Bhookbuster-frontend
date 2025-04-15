// // SidebarComponent.jsx
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { 
//   Menu, X, ChevronRight, ChevronDown, 
//   Home, Store, ShoppingBag, PlusCircle, 
//   Eye, Building, LogOut, Coffee
// } from 'lucide-react';
// import '../../assets/css/RDasboard/Rsidebar.css'; // Adjust the path as necessary
// import Rnav from './Rnav';

// const Rsidebar = () => {
//   const [isOpen, setIsOpen] = useState(true);
//   const [activeItem, setActiveItem] = useState(null);

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

//   const handleItemClick = (item) => {
//     setActiveItem(activeItem === item ? null : item);
//   };

//   return (
//     <>
//       <Rnav />
      
//       <div className={`restaurant-sidebar ${isOpen ? 'expanded' : 'collapsed'}`}>
//         <div className="sidebar-toggle" onClick={toggleSidebar}>
//           {isOpen ? <X size={20} /> : <Menu size={20} />}
//         </div>

//         <div className="sidebar-brand">
//           <Coffee size={24} />
//           <h3 className={`brand-text ${!isOpen && 'hidden'}`}>Resto Admin</h3>
//         </div>

//         <div className="sidebar-content">
//           <div className={`sidebar-section ${activeItem === 'dashboard' ? 'active' : ''}`}>
//             <Link to="/dashboard" className="section-link">
//               <Home size={20} />
//               <span className={`section-text ${!isOpen && 'hidden'}`}>Dashboard</span>
//             </Link>
//           </div>

//           <div className="sidebar-divider"></div>

//           <div className={`sidebar-section ${activeItem === 'restaurant' ? 'active' : ''}`} onClick={() => handleItemClick('restaurant')}>
//             <div className="section-header">
//               <Store size={20} />
//               <span className={`section-text ${!isOpen && 'hidden'}`}>Restaurant</span>
//               {isOpen && (activeItem === 'restaurant' ? <ChevronDown size={16} /> : <ChevronRight size={16} />)}
//             </div>
            
//             {isOpen && activeItem === 'restaurant' && (
//               <div className="section-menu">
//                 <Link to="/locationform" className="menu-item">
//                   <PlusCircle size={16} />
//                   <span>Add Restaurant</span>
//                 </Link>
//                 <Link to="/add-branches" className="menu-item">
//                   <Building size={16} />
//                   <span>Add Branches</span>
//                 </Link>
//               </div>
//             )}
//           </div>

//           <div className="sidebar-divider"></div>

//           <div className={`sidebar-section ${activeItem === 'offers' ? 'active' : ''}`} onClick={() => handleItemClick('offers')}>
//             <div className="section-header">
//               <ShoppingBag size={20} />
//               <span className={`section-text ${!isOpen && 'hidden'}`}>Offers</span>
//               {isOpen && (activeItem === 'offers' ? <ChevronDown size={16} /> : <ChevronRight size={16} />)}
//             </div>
            
//             {isOpen && activeItem === 'offers' && (
//               <div className="section-menu">
//                 <Link to="/offer" className="menu-item">
//                   <PlusCircle size={16} />
//                   <span>Add Offer</span>
//                 </Link>
//                 <Link to="/viewoffer" className="menu-item">
//                   <Eye size={16} />
//                   <span>View Offers</span>
//                 </Link>
//               </div>
//             )}
//           </div>

//           <div className="sidebar-divider"></div>

//           <div className="sidebar-section">
//             <Link to="/branches" className="section-link">
//               <Building size={20} />
//               <span className={`section-text ${!isOpen && 'hidden'}`}>View Branches</span>
//             </Link>
//           </div>

//           <div className="sidebar-divider"></div>
//         </div>

//         <div className="sidebar-footer">
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

// SidebarComponent.jsx
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

  // Handle window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Rnav />
      
      <div className={`restaurant-sidebar ${isOpen ? 'expanded' : 'collapsed'}`}>
        <div className="sidebar-brand">
          <Coffee size={24} />
          <h3 className={`brand-text ${!isOpen && 'hidden'}`}>Resturant Dash</h3>
        </div>

        <div className="sidebar-content">
          <div className="sidebar-section">
            <Link to="/rdashboard" className="section-link">
              <Home size={20} />
              <span className={`section-text ${!isOpen && 'hidden'}`}>Dashboard</span>
            </Link>
          </div>

          <div className="sidebar-divider"></div>
          
          <div className="section-category">
            <span className={`category-text ${!isOpen && 'hidden'}`}>Restaurant</span>
          </div>

          <div className="sidebar-section">
            <Link to="/locationform" className="section-link">
              <Store size={20} />
              <span className={`section-text ${!isOpen && 'hidden'}`}>Add Restaurant</span>
            </Link>
          </div>

          <div className="sidebar-section">
            <Link to="viewresturant" className="section-link">
              <Eye size={20} />
              <span className={`section-text ${!isOpen && 'hidden'}`}>View Restaurant</span>
            </Link>
          </div>

          <div className="sidebar-divider"></div>
          
          <div className="section-category">
            <span className={`category-text ${!isOpen && 'hidden'}`}>Offers</span>
          </div>

          <div className="sidebar-section">
            <Link to="/offer" className="section-link">
              <PlusCircle size={20} />
              <span className={`section-text ${!isOpen && 'hidden'}`}>Add Offer</span>
            </Link>
          </div>

          <div className="sidebar-section">
            <Link to="" className="section-link">
              <Eye size={20} />
              <span className={`section-text ${!isOpen && 'hidden'}`}>View Offers</span>
            </Link>
          </div>

          <div className="sidebar-divider"></div>
        </div>

        <div className="sidebar-footer">
          {/* Toggle button placed at the bottom of the sidebar */}
          <div className="toggle-container">
            <button className="toggle-sidebar-btn" onClick={toggleSidebar}>
              {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
              <span className={`toggle-text ${!isOpen && 'hidden'}`}>
                {isOpen ? "Collapse" : "Expand"}
              </span>
            </button>
          </div>
          
          <div className="sidebar-section logout">
            <Link to="/logout" className="section-link">
              <LogOut size={20} />
              <span className={`section-text ${!isOpen && 'hidden'}`}>Logout</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Rsidebar;