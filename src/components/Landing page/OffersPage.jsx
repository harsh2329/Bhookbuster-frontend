import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/css/OffersPage.css"

const OffersPage = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await fetch("http://localhost:8000/offers");
        if (!response.ok) {
          throw new Error("Failed to fetch offers");
        }
        const data = await response.json();
        setOffers(data);
      } catch (error) {
        console.error("Error fetching offers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  if (loading) {
    return <div className="loading">Loading offers...</div>;
  }

  return (
    <div className="offers-container">
      <h1>All Food Offers</h1>
      <Link to="/" className="back-button">← Back to Home</Link>

      {offers.length > 0 ? (
        <div className="offers-grid">
          {offers.map((offer) => (
            <div className="offer-card" key={offer.id}>
              <img src={offer.image} alt={offer.title} className="offer-image" />
              <div className="offer-details">
                <h3>{offer.title}</h3>
                <p className="offer-description">{offer.description}</p>
                <p className="offer-discount">Discount: {offer.discountPercentage}%</p>
                <p className="offer-minOrder">Min Order: ₹{offer.minOrderAmount}</p>
                <button className="order-button">Order Now</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-offers">
          <p>No special offers available at the moment.</p>
        </div>
      )}
    </div>
  );
};

export default OffersPage;