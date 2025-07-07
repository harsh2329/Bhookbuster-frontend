// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { Eye, Edit, Trash2, AlertCircle } from 'lucide-react';
// import axios from 'axios';
// // import Rsidebar from './Rsidebar';
// import '../../assets/css/RDasboard/Viewoffer.css';


// const OfferList = () => {
//   const [offers, setOffers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [confirmDelete, setConfirmDelete] = useState(null);

//   useEffect(() => {
//     fetchOffers();
//   }, []);

//   const fetchOffers = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get('https://686ac057b7da9600089cff07--bhookbuster.netlify.app/offer/all');
//       setOffers(response.data.data);
//       setError(null);
//     } catch (err) {
//       console.error('Error fetching offers:', err);
//       setError('Failed to load offers. Please try again later.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteConfirm = (offerId) => {
//     setConfirmDelete(offerId);
//   };

//   const handleDeleteCancel = () => {
//     setConfirmDelete(null);
//   };

//   const handleDelete = async (offerId) => {
//     try {
//       await axios.delete(`/offer/${offerId}`);
//       // Remove deleted offer from state
//       setOffers(offers.filter(offer => offer._id !== offerId));
//       setConfirmDelete(null);
//       alert('Offer deleted successfully');
//     } catch (err) {
//       console.error('Error deleting offer:', err);
//       alert('Failed to delete offer. Please try again.');
//     }
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     });
//   };

//   if (loading) {
//     return (
//       <>
//         {/* <Rsidebar /> */}
//         <div className="offer-list-container">
//           <div className="loading-spinner">Loading offers...</div>
//         </div>
//       </>
//     );
//   }

//   if (error) {
//     return (
//       <>
//         {/* <Rsidebar /> */}
//         <div className="offer-list-container">
//           <div className="error-message">
//             <AlertCircle size={24} />
//             <p>{error}</p>
//             <button onClick={fetchOffers} className="retry-button">Retry</button>
//           </div>
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       {/* <Rsidebar /> */}
//       <div className="offer-list-container">
//         <div className="offer-list-header">
//           <h2>All Offers</h2>
//           {/* <Link to="/offer" className="add-offer-button">
//             Add New Offer
//           </Link> */}
//         </div>

//         {offers.length === 0 ? (
//           <div className="no-offers">
//             <p>No offers found. Create your first offer to get started.</p>
//             <Link to="/admin/offers/add" className="add-offer-button">
//               Add New Offer
//             </Link>
//           </div>
//         ) : (
//           <div className="offers-table-container">
//             <table className="offers-table">
//               <thead>
//                 <tr>
//                   <th>Image</th>
//                   <th>Title</th>
//                   <th>Category</th>
//                   <th>Discount</th>
//                   <th>Duration</th>
//                   <th>Status</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {offers.map((offer) => (
//                   <tr key={offer._id} className={!offer.active ? 'inactive-offer' : ''}>
//                     <td className="offer-image-cell">
//                       <img 
//                         src={offer.OfferImage} 
//                         alt={offer.title} 
//                         className="offer-thumbnail" 
//                         onError={(e) => {
//                           e.target.onerror = null;
//                           e.target.src = '/placeholder-image.png'; // Fallback image
//                         }}
//                       />
//                     </td>
//                     <td>{offer.title}</td>
//                     <td>{offer.Category}</td>
//                     <td>{offer.discountPercentage}%</td>
//                     <td>
//                       {formatDate(offer.startDate)} - {formatDate(offer.endDate)}
//                     </td>
//                     <td>
//                       <span className={`status-badge ${offer.active ? 'active' : 'inactive'}`}>
//                         {offer.active ? 'Active' : 'Inactive'}
//                       </span>
//                     </td>
//                     <td className="actions-cell">
//                       <Link to={`/singleoffer`} className="action-button view">
//                         <Eye size={18} />
//                       </Link>
//                       <Link to={`/admin/offers/edit/${offer._id}`} className="action-button edit">
//                         <Edit size={18} />
//                       </Link>
//                       <button 
//                         onClick={() => handleDeleteConfirm(offer._id)} 
//                         className="action-button delete"
//                       >
//                         <Trash2 size={18} />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {confirmDelete && (
//           <div className="delete-confirmation-modal">
//             <div className="modal-content">
//               <h3>Confirm Delete</h3>
//               <p>Are you sure you want to delete this offer? This action cannot be undone.</p>
//               <div className="modal-actions">
//                 <button onClick={handleDeleteCancel} className="cancel-button">
//                   Cancel
//                 </button>
//                 <button onClick={() => handleDelete(confirmDelete)} className="delete-button">
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default OfferList;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Edit, Trash2, AlertCircle, List, Grid } from 'lucide-react';
import axios from 'axios';
// import Rsidebar from './Rsidebar';
import '../../assets/css/RDasboard/Viewoffer.css';

const OfferList = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://686ac057b7da9600089cff07--bhookbuster.netlify.app/offer/all');
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

  if (loading) {
    return (
      <>
        {/* <Rsidebar /> */}
        <div className="offer-list-container">
          <div className="loading-spinner">Loading offers...</div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        {/* <Rsidebar /> */}
        <div className="offer-list-container">
          <div className="error-message">
            <AlertCircle size={24} />
            <p>{error}</p>
            <button onClick={fetchOffers} className="retry-button">Retry</button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* <Rsidebar /> */}
      <div className="offer-list-container">
        <div className="offer-list-header">
          <h2>All Offers</h2>
          <div className="view-toggle-container">
            <button 
              className={`view-toggle-button ${viewMode === 'list' ? 'active' : ''}`} 
              onClick={() => setViewMode('list')}
              aria-label="List View"
            >
              <List size={18} />
            </button>
            <button 
              className={`view-toggle-button ${viewMode === 'grid' ? 'active' : ''}`} 
              onClick={() => setViewMode('grid')}
              aria-label="Grid View"
            >
              <Grid size={18} />
            </button>
            {/* <Link to="/admin/offers/add" className="add-offer-button">
              Add New Offer
            </Link> */}
          </div>
        </div>

        {offers.length === 0 ? (
          <div className="no-offers">
            <p>No offers found. Create your first offer to get started.</p>
            {/* <Link to="/admin/offers/add" className="add-offer-button">
              Add New Offer
            </Link> */}
          </div>
        ) : viewMode === 'list' ? (
          <div className="offers-table-container">
            <table className="offers-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Discount</th>
                  <th>Duration</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {offers.map((offer) => (
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
                    <td>{offer.Category}</td>
                    <td>{offer.discountPercentage}%</td>
                    <td>
                      {formatDate(offer.startDate)} - {formatDate(offer.endDate)}
                    </td>
                    <td>
                      <span className={`status-badge ${offer.active ? 'active' : 'inactive'}`}>
                        {offer.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="actions-cell">
                      <Link to={`/singleoffer`} className="action-button view">
                        <Eye size={18} />
                      </Link>
                      <Link to={`/admin/offers/edit/${offer._id}`} className="action-button edit">
                        <Edit size={18} />
                      </Link>
                      <button 
                        onClick={() => handleDeleteConfirm(offer._id)} 
                        className="action-button delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="offers-grid">
            {offers.map((offer) => (
              <div key={offer._id} className={`offer-card ${!offer.active ? 'inactive-offer' : ''}`}>
                <img 
                  src={offer.OfferImage} 
                  alt={offer.title} 
                  className="offer-card-image" 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/placeholder-image.png';
                  }}
                />
                <div className="offer-card-content">
                  <h3 className="offer-card-title">{offer.title}</h3>
                  <div className="offer-card-details">
                    <div className="offer-card-detail">
                      <span className="offer-card-detail-label">Category:</span>
                      <span>{offer.Category}</span>
                    </div>
                    <div className="offer-card-detail">
                      <span className="offer-card-detail-label">Discount:</span>
                      <span>{offer.discountPercentage}%</span>
                    </div>
                    <div className="offer-card-detail">
                      <span className="offer-card-detail-label">Duration:</span>
                      <span>{formatDate(offer.startDate)} - {formatDate(offer.endDate)}</span>
                    </div>
                    <div className="offer-card-detail">
                      <span className="offer-card-detail-label">Status:</span>
                      <span className={`status-badge ${offer.active ? 'active' : 'inactive'}`}>
                        {offer.active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                  <div className="offer-card-actions">
                    <Link to={`/singleoffer`} className="action-button view">
                      <Eye size={18} />
                    </Link>
                    <Link to={`/admin/offers/edit/${offer._id}`} className="action-button edit">
                      <Edit size={18} />
                    </Link>
                    <button 
                      onClick={() => handleDeleteConfirm(offer._id)} 
                      className="action-button delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

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
      </div>
    </>
  );
};

export default OfferList;