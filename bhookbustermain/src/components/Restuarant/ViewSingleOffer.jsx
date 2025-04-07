import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, Tag, DollarSign, MapPin, Edit, ArrowLeft, AlertTriangle } from 'lucide-react';
import axios from 'axios';
import Rsidebar from './Rsidebar';
import '../../assets/css/RDasboard/Singleoffer.css';

const OfferDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOfferDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/offer/${offer._id}`);
        setOffer(response.data.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching offer details:', err);
        setError('Failed to load offer details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchOfferDetails();
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <>
        <Rsidebar />
        <div className="offer-detail-container">
          <div className="loading-spinner">Loading offer details...</div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Rsidebar />
        <div className="offer-detail-container">
          <div className="error-container">
            <AlertTriangle size={48} className="error-icon" />
            <h3>Error Loading Offer</h3>
            <p>{error}</p>
            <div className="error-actions">
              <button onClick={() => navigate('/viewoffer')} className="back-button">
                <ArrowLeft size={16} />
                Back to Offers
              </button>
              <button 
                onClick={() => window.location.reload()} 
                className="retry-button"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!offer) {
    return (
      <>
        <Rsidebar />
        <div className="offer-detail-container">
          <div className="not-found-container">
            <h3>Offer Not Found</h3>
            <p>The offer you're looking for doesn't exist or has been removed.</p>
            <Link to="/admin/offers" className="back-button">
              <ArrowLeft size={16} />
              Back to Offers
            </Link>
          </div>
        </div>
      </>
    );
  }

  // Calculate remaining days if offer is active
  const currentDate = new Date();
  const endDate = new Date(offer.endDate);
  const remainingDays = Math.ceil((endDate - currentDate) / (1000 * 60 * 60 * 24));
  
  // Check if offer is expired
  const isExpired = currentDate > endDate;
  
  // Check if offer is upcoming
  const startDate = new Date(offer.startDate);
  const isUpcoming = currentDate < startDate;

  return (
    <>
      <Rsidebar />
      <div className="offer-detail-container">
        <div className="offer-detail-header">
          <button 
            onClick={() => navigate('/admin/offers')} 
            className="back-button"
          >
            <ArrowLeft size={16} />
            Back to Offers
          </button>
          <Link 
            to={`/admin/offers/edit/${offer._id}`} 
            className="edit-button"
          >
            <Edit size={16} />
            Edit Offer
          </Link>
        </div>

        <div className="offer-detail-content">
          <div className="offer-detail-main">
            <div className="offer-image-container">
              <img 
                src={offer.OfferImage} 
                alt={offer.title} 
                className="offer-detail-image" 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/placeholder-image.png'; // Fallback image
                }}
              />
              <div className="offer-status-badge">
                {isExpired ? (
                  <span className="status expired">Expired</span>
                ) : isUpcoming ? (
                  <span className="status upcoming">Upcoming</span>
                ) : offer.active ? (
                  <span className="status active">Active</span>
                ) : (
                  <span className="status inactive">Inactive</span>
                )}
              </div>
            </div>

            <div className="offer-detail-info">
              <h1 className="offer-title">{offer.title}</h1>
              
              <div className="offer-meta">
                <div className="meta-item">
                  <Tag className="meta-icon" />
                  <span className="meta-label">Category:</span>
                  <span className="meta-value">{offer.Category}</span>
                </div>
                
                <div className="meta-item">
                  <Calendar className="meta-icon" />
                  <span className="meta-label">Valid:</span>
                  <span className="meta-value">
                    {formatDate(offer.startDate)} - {formatDate(offer.endDate)}
                  </span>
                </div>
                
                {!isExpired && !isUpcoming && offer.active && (
                  <div className="meta-item highlight">
                    <span className="meta-label">Remaining:</span>
                    <span className="meta-value">
                      {remainingDays} {remainingDays === 1 ? 'day' : 'days'}
                    </span>
                  </div>
                )}
                
                <div className="meta-item">
                  <DollarSign className="meta-icon" />
                  <span className="meta-label">Min Order:</span>
                  <span className="meta-value">${offer.minOrderAmount}</span>
                </div>
                
                <div className="meta-item">
                  <MapPin className="meta-icon" />
                  <span className="meta-label">Location:</span>
                  <span className="meta-value">{offer.locationId}</span>
                </div>
              </div>
              
              <div className="discount-badge">
                {offer.discountPercentage}% OFF
              </div>
              
              <div className="offer-description">
                <h3>Description</h3>
                <p>{offer.description}</p>
              </div>
            </div>
          </div>
          
          <div className="offer-detail-sidebar">
            <div className="offer-stats">
              <h3>Offer Statistics</h3>
              <div className="stats-item">
                <span className="stats-label">Created On:</span>
                <span className="stats-value">
                  {new Date(offer.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="stats-item">
                <span className="stats-label">Last Updated:</span>
                <span className="stats-value">
                  {new Date(offer.updatedAt).toLocaleDateString()}
                </span>
              </div>
              {/* Additional stats could be added here */}
            </div>
            
            <div className="offer-actions">
              <Link to={`/admin/offers/edit/${offer._id}`} className="action-button edit-full">
                Edit Offer
              </Link>
              <button 
                onClick={() => {
                  // Toggle active status
                  const updatedOffer = {...offer, active: !offer.active};
                  axios.put(`/offer/${offer._id}`, updatedOffer)
                    .then(response => {
                      setOffer(response.data.data);
                      alert(`Offer ${updatedOffer.active ? 'activated' : 'deactivated'} successfully`);
                    })
                    .catch(err => {
                      console.error('Error updating offer status:', err);
                      alert('Failed to update offer status');
                    });
                }} 
                className={`action-button ${offer.active ? 'deactivate' : 'activate'}`}
              >
                {offer.active ? 'Deactivate Offer' : 'Activate Offer'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OfferDetail;