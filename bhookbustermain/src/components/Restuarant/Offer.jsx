import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import '../../assets/css/Offer.css';
import Rsidebar from './Rsidebar';
import axios from 'axios';

const OfferForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    active: true,
    startDate: '',
    endDate: '',
    discountPercentage: '',
    minOrderAmount: '',
    locationId: '',
    OfferImage: null
  });

  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    // Handle file input separately
    if (type === 'file') {
      const file = files[0];
      setFormData(prevState => ({
        ...prevState,
        [name]: file
      }));

      // Create image preview
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    } else {
      // Handle other input types
      setFormData(prevState => ({
        ...prevState,
        [name]: type === 'checkbox' ? checked : value
      }));
    }

    // Clear specific field error when user starts typing
    if (errors[name]) {
      setErrors(prevErrors => {
        const newErrors = {...prevErrors};
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Required field validations
    const requiredFields = [
      'title', 'description', 'startDate', 'endDate', 
      'discountPercentage', 'minOrderAmount', 'locationId', 'OfferImage'
    ];

    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }
    });

    // Discount percentage validation
    if (formData.discountPercentage) {
      const discountPercentage = Number(formData.discountPercentage);
      if (isNaN(discountPercentage) || discountPercentage < 0 || discountPercentage > 100) {
        newErrors.discountPercentage = 'Discount must be between 0 and 100';
      }
    }

    // Date validations
    if (formData.startDate && formData.endDate) {
      const startDate = new Date(formData.startDate);
      const endDate = new Date(formData.endDate);

      if (startDate > endDate) {
        newErrors.endDate = 'End date must be after start date';
      }

      // Optional: Ensure dates are not in the past
      const today = new Date();
      if (startDate < today) {
        newErrors.startDate = 'Start date cannot be in the past';
      }
    }

    // Minimum order amount validation
    if (formData.minOrderAmount) {
      const minOrderAmount = Number(formData.minOrderAmount);
      if (isNaN(minOrderAmount) || minOrderAmount < 0) {
        newErrors.minOrderAmount = 'Minimum order amount must be a positive number';
      }
    }

    // Image validation
    if (formData.OfferImage) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(formData.OfferImage.type)) {
        newErrors.OfferImage = 'Only JPEG, PNG, and GIF images are allowed';
      }

      // Optional: File size validation
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (formData.OfferImage.size > maxSize) {
        newErrors.OfferImage = 'Image must be smaller than 5MB';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (validateForm()) {
  //     const formDataToSubmit = new FormData();
      
  //     // Append all form data to FormData object
  //     Object.keys(formData).forEach(key => {
  //       formDataToSubmit.append(key, formData[key]);
  //     });

  //     try {
  //       const response = await axios.post('/offer/addOfferWithFile',  formDataToSubmit);

  //       if (response.ok) {
  //         alert('Offer created successfully!');
  //         // Reset form
  //         setFormData({
  //           title: '',
  //           description: '',
  //           active: true,
  //           startDate: '',
  //           endDate: '',
  //           discountPercentage: '',
  //           minOrderAmount: '',
  //           locationId: '',
  //           OfferImage: null
  //         });
  //         setImagePreview(null);
  //       } else {
  //         const errorData = await response.json();
  //         alert(`Error: ${errorData.message}`);
  //       }
  //     } catch (error) {
  //       console.error('Submission error:', error);
  //       alert('An error occurred while submitting the form');
  //     }
  //   }
  // };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  
  //   if (validateForm()) {
  //     const formDataToSubmit = new FormData();
      
  //     // Append all form data to FormData object
  //     Object.keys(formData).forEach(key => {
  //       formDataToSubmit.append(key, formData[key]);
  //     });
  
  //     try {
  //       // Specify full URL
  //       // const response = await axios.post('http://localhost:3000/offer/addOfferWithFile', formDataToSubmit, {
  //       //   headers: {
  //       //     'Content-Type': 'multipart/form-data'
  //       //   }
  //       // });
  //        const response = await axios.post('/offer/addOfferWithFile', formData);
  
  //       // Handle response
  //       alert('Offer created successfully!');
  //       // Reset form...
  //     } catch (error) {
  //       console.log(error);
  //       alert('An error occurred while submitting the form');
  //     }
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (validateForm()) {
      const formDataToSubmit = new FormData();
      
      // Append all form data to FormData object
      Object.keys(formData).forEach(key => {
        formDataToSubmit.append(key, formData[key]);
      });
  
      try {
        const response = await axios.post('/offer/addOfferWithFile', formDataToSubmit, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
  
        alert('Offer created successfully!');
        // Reset form and other logic
      } catch (error) {
        console.error('Submission error:', error.response?.data || error.message);
        alert(`Error: ${error.response?.data?.message || 'Failed to submit offer'}`);
      }
    }
  };
  return (
    <>
    <Rsidebar></Rsidebar>
    <div className="offer-form-container">
      <h2 className="offer-form-title">Create New Offer</h2>
      <form onSubmit={handleSubmit} className="offer-form">
        {/* Title */}
        <div className="form-group">
          <label htmlFor="title" className="form-label">Offer Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`form-input ${errors.title ? 'input-error' : ''}`}
          />
          {errors.title && <p className="error-message">{errors.title}</p>}
        </div>

        {/* Description */}
        <div className="form-group">
          <label htmlFor="description" className="form-label">Offer Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={`form-input ${errors.description ? 'input-error' : ''}`}
          />
          {errors.description && <p className="error-message">{errors.description}</p>}
        </div>

        {/* Start Date */}
        <div className="form-group">
          <label htmlFor="startDate" className="form-label">Start Date</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className={`form-input ${errors.startDate ? 'input-error' : ''}`}
          />
          {errors.startDate && <p className="error-message">{errors.startDate}</p>}
        </div>

        {/* End Date */}
        <div className="form-group">
          <label htmlFor="endDate" className="form-label">End Date</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className={`form-input ${errors.endDate ? 'input-error' : ''}`}
          />
          {errors.endDate && <p className="error-message">{errors.endDate}</p>}
        </div>

        {/* Discount Percentage */}
        <div className="form-group">
          <label htmlFor="discountPercentage" className="form-label">Discount Percentage</label>
          <input
            type="number"
            id="discountPercentage"
            name="discountPercentage"
            value={formData.discountPercentage}
            onChange={handleChange}
            min="0"
            max="100"
            className={`form-input ${errors.discountPercentage ? 'input-error' : ''}`}
          />
          {errors.discountPercentage && <p className="error-message">{errors.discountPercentage}</p>}
        </div>

        {/* Minimum Order Amount */}
        <div className="form-group">
          <label htmlFor="minOrderAmount" className="form-label">Minimum Order Amount</label>
          <input
            type="number"
            id="minOrderAmount"
            name="minOrderAmount"
            value={formData.minOrderAmount}
            onChange={handleChange}
            min="0"
            className={`form-input ${errors.minOrderAmount ? 'input-error' : ''}`}
          />
          {errors.minOrderAmount && <p className="error-message">{errors.minOrderAmount}</p>}
        </div>

        {/* Location ID */}
        <div className="form-group">
          <label htmlFor="locationId" className="form-label">Location</label>
          <input
            type="text"
            id="locationId"
            name="locationId"
            value={formData.locationId}
            onChange={handleChange}
            className={`form-input ${errors.locationId ? 'input-error' : ''}`}
          />
          {errors.locationId && <p className="error-message">{errors.locationId}</p>}
        </div>

        {/* Active Checkbox */}
        <div className="form-group checkbox-group">
          <input
            type="checkbox"
            id="active"
            name="active"
            checked={formData.active}
            onChange={handleChange}
            className="form-checkbox"
          />
          <label htmlFor="active" className="checkbox-label">Active Offer</label>
        </div>

        {/* Offer Image */}
        <div className="form-group">
          <label htmlFor="OfferImage" className="form-label">Offer Image</label>
          <input
            type="file"
            id="OfferImage"
            name="OfferImage"
            accept="image/jpeg,image/png,image/gif"
            onChange={handleChange}
            className={`form-input ${errors.OfferImage ? 'input-error' : ''}`}
          />
          {errors.OfferImage && <p className="error-message">{errors.OfferImage}</p>}
          
          {/* Image Preview */}
          {imagePreview && (
            <div className="image-preview">
              <img 
                src={imagePreview} 
                alt="Offer Preview" 
                className="preview-image"
              />
            </div>
          )}
        </div>
       
            

        {/* Submit Button */}
        <div className="form-group">
          <button
            type="submit"
            className="submit-button"
          >
            Create Offer <ChevronRight size={20} />
          </button>
        </div>
      </form>
    </div>
    </>
  );
};

export default OfferForm;