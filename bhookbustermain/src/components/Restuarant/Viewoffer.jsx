import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import '../../assets/css/RDasboard/Viewoffer.css';

const OfferDetailsView = ({ offerId }) => {
  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchOfferDetails = async () => {
      try {
        // Changed from "_id" to "id" to match the working example
        const userId = localStorage.getItem("id");
        
        if (!userId) {
          throw new Error("User ID not found in localStorage");
        }
        
        console.log("Fetching offers for user ID:", userId);
        const response = await axios.get(`/offer/alloffer/${userId}`);
        
        setOffer(response.data.data);
        setLoading(false);
      } catch (err) {
        console.log('Error details:', {
          status: err.response?.status,
          data: err.response?.data,
          message: err.message
        });
        setError(err.response?.data?.message || err.message || 'Failed to fetch offer');
        setLoading(false);
      }
    };
    
    fetchOfferDetails();
  }, [offerId]);

  if (loading) return <div className="offer-details-loading">Loading...</div>;
  if (error) return <div className="offer-details-error">Error: {error}</div>;
  if (!offer) return <div className="offer-details-not-found">No offer found</div>;

  return (
    <div className="offer-details-container">
      <h2 className="offer-details-title">Offer Details</h2>
      <div className="offer-details-table-wrapper">
        <table className="offer-details-table">
          <thead>
            <tr>
              <th colSpan="2">Offer Information</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Title</td>
              <td>{offer.title}</td>
            </tr>
            <tr>
              <td>Description</td>
              <td>{offer.description}</td>
            </tr>
            <tr>
              <td>Active Status</td>
              <td>{offer.active ? 'Active' : 'Inactive'}</td>
            </tr>
            <tr>
              <td>Start Date</td>
              <td>{format(new Date(offer.startDate), 'PP')}</td>
            </tr>
            <tr>
              <td>End Date</td>
              <td>{format(new Date(offer.endDate), 'PP')}</td>
            </tr>
            <tr>
              <td>Discount Percentage</td>
              <td>{offer.discountPercentage}%</td>
            </tr>
            <tr>
              <td>Minimum Order Amount</td>
              <td>${offer.minOrderAmount.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Offer Image</td>
              <td>
                {offer.OfferImage && (
                  <img
                    src={offer.OfferImage}
                    alt="Offer"
                    className="offer-details-image"
                  />
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OfferDetailsView;