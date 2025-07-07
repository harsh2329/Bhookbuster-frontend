import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../../assets/css/FoodPage.css";
import axios from "axios"; // Import axios for HTTP requests

const FoodPage = () => {
  const { category } = useParams();
  const [foodOffers, setFoodOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOffers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`https://bhookbuster-backend-3.onrender.com/:id`); // ✅ Update API endpoint
        
        if (!response.ok) {
          throw new Error("Failed to fetch food offers");
        }
        const data = await response.json();

        // Filter offers based on selected food category
        const filteredOffers = data.filter((offer) =>
          offer.foodType.toLowerCase().includes(category.toLowerCase())
        );

        setFoodOffers(filteredOffers);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, [category]); // ✅ Dependency on `category` ensures re-fetching when it changes

  const formatCategoryName = (name) =>
    name.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="food-detail-container">
      <div className="food-detail-header">
        <Link to="/" className="back-button">← Back to All Foods</Link>
        <h1>{formatCategoryName(category)} Offers</h1>
      </div>

      {foodOffers.length > 0 ? (
        <div className="food-offers-grid">
          {foodOffers.map((offer) => (
            <div className="food-offer-card" key={offer.id}>
              <img src={offer.image} alt={offer.title} className="offer-image" />
              <div className="offer-content">
                <h3>{offer.title}</h3>
                <p className="offer-price">Discount: {offer.discountPercentage}%</p>
                <p className="offer-description">{offer.description}</p>
                <p className="offer-minOrder">Min Order: ₹{offer.minOrderAmount}</p>
                <button className="order-button">Now</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-offers">
          <p>No special offers available for {formatCategoryName(category)} at the moment.</p>
          <p>Check back soon for exciting deals!</p>
        </div>
      )}
    </div>
  );
};

export default FoodPage;