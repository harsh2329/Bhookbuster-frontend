import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Edit, Trash2, AlertCircle, List, Grid, Calendar, DollarSign, Clock } from 'lucide-react';
import axios from 'axios';
import '../../assets/css/OfferFlipCard.css'; // Import your CSS file

const FlipCard = ({ frontContent, backContent }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className={`flip-card ${isFlipped ? "flipped" : ""}`}
      onClick={() => setIsFlipped((prev) => !prev)}
    >
      <div className="flip-card-inner">
        <div className="flip-card-front">
          {frontContent}
        </div>
        <div className="flip-card-back">
          {backContent}
        </div>
      </div>
    </div>
  );
};

const OfferCollection = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // Start with grid mode by default
  const [currentPage, setCurrentPage] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);

  // Items per page - display in groups of 5
  const itemsPerPage = 15; // 5 cards per row, 3 rows
  const cardsPerRow = 5;

  useEffect(() => {
    fetchOffers();
    
    // Check if user is admin
    const checkUserRole = () => {
      const userRole = localStorage.getItem("userRole");
      setIsAdmin(userRole === "admin");
    };
    
    checkUserRole();
  }, []);

  const fetchOffers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://bhookbuster.netlify.app/offer/all');
      setOffers(response.data.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching offers:', err);
      setError('Failed to load offers. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteConfirm = (offerId) => {
    setConfirmDelete(offerId);
  };

  const handleDeleteCancel = () => {
    setConfirmDelete(null);
  };

  const handleDelete = async (offerId) => {
    try {
      await axios.delete(`/offer/${offerId}`);
      // Remove deleted offer from state
      setOffers(offers.filter(offer => offer._id !== offerId));
      setConfirmDelete(null);
      alert('Offer deleted successfully');
    } catch (err) {
      console.error('Error deleting offer:', err);
      alert('Failed to delete offer. Please try again.');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Calculate total pages
  const totalPages = Math.ceil(offers.length / itemsPerPage);

  // Navigate carousel
  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Get current items to display
  const currentItems = offers.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  // Check if we should show carousel arrows
  const showCarouselArrows = offers.length > itemsPerPage;

  if (loading) {
    return (
      <div className="offer-collection-container">
        <div className="loading-container">
          <div className="loader"></div>
          <p>Loading offers...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="offer-collection-container">
        <div className="error-message">
          <AlertCircle size={24} />
          <p>{error}</p>
          <button onClick={fetchOffers} className="retry-button">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="hero-box-main-container">
        <h3 className="text-main">
          Exclusive Offers Just For You
        </h3>
      </div>

      <div className="view-mode-container">
        <div className="view-toggle-buttons">
          <button 
            className={`view-toggle-button ${viewMode === 'grid' ? 'active' : ''}`} 
            onClick={() => setViewMode('grid')}
            aria-label="Grid View"
          >
            <Grid size={18} />
          </button>
          <button 
            className={`view-toggle-button ${viewMode === 'list' ? 'active' : ''}`} 
            onClick={() => setViewMode('list')}
            aria-label="List View"
          >
            <List size={18} />
          </button>
        </div>
      </div>

      <div className="carousel-container">
        {offers.length === 0 ? (
          <div className="no-results">
            <p>No offers available at this time.</p>
          </div>
        ) : viewMode === 'list' ? (
          <div className="offers-table-container">
            <table className="offers-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Discount</th>
                  <th>Min. Order</th>
                  <th>Duration</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((offer) => (
                  <tr key={offer._id} className={!offer.active ? 'inactive-offer' : ''}>
                    <td className="offer-image-cell">
                      <img 
                        src={offer.OfferImage} 
                        alt={offer.title} 
                        className="offer-thumbnail" 
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/placeholder-image.png'; // Fallback image
                        }}
                      />
                    </td>
                    <td>{offer.title}</td>
                    <td>{offer.discountPercentage}%</td>
                    <td>${offer.minOrderAmount}</td>
                    <td>
                      {formatDate(offer.startDate)} - {formatDate(offer.endDate)}
                    </td>
                    <td>
                      <span className={`status-badge ${offer.active ? 'active' : 'inactive'}`}>
                        {offer.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="actions-cell">
                      <Link to={`/offer/${offer._id}`} className="action-button view">
                        <Eye size={18} />
                      </Link>
                      {isAdmin && (
                        <>
                          <Link to={`/admin/offers/edit/${offer._id}`} className="action-button edit">
                            <Edit size={18} />
                          </Link>
                          <button 
                            onClick={() => handleDeleteConfirm(offer._id)} 
                            className="action-button delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <>
            {/* Left Arrow */}
            {showCarouselArrows && (
              <button 
                className="carousel-arrow prev" 
                onClick={prevPage}
                disabled={currentPage === 0}
                aria-label="Previous set of offers"
              >
                <Clock className="arrow-icon" />
              </button>
            )}
            
            <div className="grid-container">
              {currentItems.map((offer) => (
                <FlipCard
                  key={offer._id}
                  frontContent={
                    <div className="offer-front">
                      <div className="offer-image-container">
                        <img
                          src={offer.OfferImage} 
                          alt={offer.title}
                          className="offer-image"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/placeholder-image.png'; // Fallback image
                          }}
                        />
                        <div className="discount-badge">
                          {offer.discountPercentage}% OFF
                        </div>
                      </div>
                      <div className="offer-name-container">
                        <h3>{offer.title}</h3>
                        <p className="offer-valid">Valid till {formatDate(offer.endDate)}</p>
                      </div>
                    </div>
                  }
                  backContent={
                    <div className="offer-back">
                      <h4>{offer.title}</h4>
                      
                      <div className="offer-description">
                        {offer.description}
                      </div>
                      
                      <div className="offer-details">
                        <div className="detail-item">
                          <Calendar className="detail-icon" />
                          <span>Valid from {formatDate(offer.startDate)} to {formatDate(offer.endDate)}</span>
                        </div>
                        
                        <div className="detail-item">
                          <DollarSign className="detail-icon" />
                          <span>Minimum Order: ${offer.minOrderAmount}</span>
                        </div>
                      </div>
                      
                      <div className="status-tag">
                        <span className={offer.active ? "active" : "inactive"}>
                          {offer.active ? "Active" : "Expired"}
                        </span>
                      </div>

                      <div className="action-buttons">
                        <Link 
                          to={`/offer/${offer._id}`}
                          className="view-btn"
                        >
                          View Details
                        </Link>
                        
                        {isAdmin && (
                          <div className="admin-buttons">
                            <button onClick={(e) => {
                              e.stopPropagation(); // Stop card flip
                              window.location.href = `/admin/offers/edit/${offer._id}`;
                            }} className="edit-btn">
                              <Edit />
                            </button>
                            <button onClick={(e) => {
                              e.stopPropagation(); // Stop card flip
                              handleDeleteConfirm(offer._id);
                            }} className="delete-btn">
                              <Trash2 />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  }
                />
              ))}
            </div>

            {/* Right Arrow */}
            {showCarouselArrows && (
              <button 
                className="carousel-arrow next" 
                onClick={nextPage}
                disabled={currentPage >= totalPages - 1}
                aria-label="Next set of offers"
              >
                <Clock className="arrow-icon" />
              </button>
            )}
          </>
        )}

        {/* Pagination for both views */}
        {totalPages > 1 && (
          <div className="pagination">
            <button 
              onClick={prevPage} 
              disabled={currentPage === 0}
              className="pagination-btn prev"
            >
              Prev
            </button>
            
            <div className="page-indicator">
              {currentPage + 1} / {totalPages}
            </div>
            
            <button 
              onClick={nextPage}
              disabled={currentPage === totalPages - 1}
              className="pagination-btn next"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {confirmDelete && (
        <div className="delete-confirmation-modal">
          <div className="modal-content">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this offer? This action cannot be undone.</p>
            <div className="modal-actions">
              <button onClick={handleDeleteCancel} className="cancel-button">
                Cancel
              </button>
              <button onClick={() => handleDelete(confirmDelete)} className="delete-button">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OfferCollection;