// SidebarComponent.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/RDasboard/Rsidebar.css';
import Rnav from './Rnav';

const Rsidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [expandedItem, setExpandedItem] = useState(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleItem = (item) => {
    if (expandedItem === item) {
      setExpandedItem(null);
    } else {
      setExpandedItem(item);
    }
  };

  return (
    <>
    <Rnav></Rnav>
    
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="toggle-btn" onClick={toggleSidebar}>
        {isOpen ? '◀' : '▶'}
      </div>

      <div className="sidebar-header">
        <h3>Restaurant Dashboard</h3>
      </div>

      <div className="sidebar-items">
        <div className="sidebar-item">
          <div className="item-header" onClick={() => toggleItem('restaurant')}>
            <i className="icon">🍽️</i>
            <span>Restaurant</span>
            <i className={`arrow ${expandedItem === 'restaurant' ? 'down' : 'right'}`}>▼</i>
          </div>
          {expandedItem === 'restaurant' && (
            <div className="item-content">
              <Link to="/locationform" className="nav-link">
                <div className="sub-item">
                  <i className="icon">➕</i>
                  <span>Add Restaurant</span>
                </div>
              </Link>
              <Link to="/add-branches" className="nav-link">
                <div className="sub-item">
                  <i className="icon">🏢</i>
                  <span>Add Branches</span>
                </div>
              </Link>
            </div>
          )}
        </div>

        <div className="separator"></div>

        <div className="sidebar-item">
          <div className="item-header" onClick={() => toggleItem('offers')}>
            <i className="icon">🏷️</i>
            <span>Offers</span>
            <i className={`arrow ${expandedItem === 'offers' ? 'down' : 'right'}`}>▼</i>
          </div>
          {expandedItem === 'offers' && (
            <div className="item-content">
              <Link to="/add-offer" className="nav-link">
                <div className="sub-item">
                  <i className="icon">➕</i>
                  <span>Add Offer</span>
                </div>
              </Link>
              <Link to="/view-offers" className="nav-link">
                <div className="sub-item">
                  <i className="icon">👁️</i>
                  <span>View Offers</span>
                </div>
              </Link>
            </div>
          )}
        </div>

       
          <div className="sidebar-item">
            <div className="item-header">
              <i className="icon">🏢</i>
              <span>View Branches</span>
            </div>
          </div>
      

        <div className="separator"></div>

        
          <div className="sidebar-item logout">
            <div className="item-header">
              <i className="icon">🚪</i>
              <span>Logout</span>
            </div>
         
          </div>
     
      </div>
    </div>
    </>
  );
};

export default Rsidebar;