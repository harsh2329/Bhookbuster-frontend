// import React, { useState, useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import { toast, ToastContainer } from 'react-toastify';
// import axios from 'axios';
// import 'react-toastify/dist/ReactToastify.css';
// import { useNavigate, useLocation } from 'react-router-dom';
// import '../../assets/css/Location.css';
// import Rsidebar from './Rsidebar';
// import { Link } from 'react-router-dom';


// const RestaurantRegistration = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [states, setStates] = useState([]);
//   const [cities, setCities] = useState([]);
//   const [areas, setAreas] = useState([]);
//   const [selectedState, setSelectedState] = useState('');
//   const [selectedCity, setSelectedCity] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [categories, setCategories] = useState([]);

//   // Get restaurant name from navigation state if it exists
//   const restaurantName = location.state?.restaurantName || '';

//   useEffect(() => {
//     getAllStates();
//   }, []);

//   const getAllStates = async () => {
//     const res = await axios.get("/state/getallstates");
//     setStates(res.data.data);
//   };
//   const getCityByStateId = async (id) => {
//     const res = await axios.get("/city/getcitybystateid/" + id);
//     // console.log("cities response....", res.data);
//     setCities(res.data.data);
//     // alert(id);
//   };

//   const getAreaByCityId = async (id) => {
//     console.log("city function");
    
//     const res = await axios.get("/area/getareabycity/" + id);
//     console.log(res.data);
//     setAreas(res.data.data);
//   };


  
//   const { 
//     register, 
//     handleSubmit, 
//     formState: { errors },
//     watch,
//     setValue
//   } = useForm({
//     defaultValues: {
//       active: true,
//       foodtype: 'Vegetarian',
//       title: restaurantName // Set the restaurant name from landing page
//     }
//   });
  
//   // Watch for changes in state and city selections
//   const watchState = watch('stateId');
//   const watchCity = watch('cityId');
  
 
  
//   // Get current location
//   const getCurrentLocation = () => {
//     if (navigator.geolocation) {
//       setIsLoading(true);
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setValue('latitude', position.coords.latitude.toString());
//           setValue('longtitude', position.coords.longitude.toString());
//           setIsLoading(false);
//           toast.success('Location detected successfully');
//         },
//         (error) => {
//           console.error('Error getting location:', error);
//           toast.error('Failed to get location');
//           setIsLoading(false);
//         }
//       );
//     } else {
//       toast.error('Geolocation is not supported by this browser');
//     }
//   };
  
//   useEffect(() => {
//       const fetchCategories = async () => {
//         try {
//           setLoading(true);
//           const response = await axios.get('/category/getallcategories');
//           if (response.data && response.data.data) {
//             setCategories(response.data.data);
//           }
//           setLoading(false);
//         } catch (err) {
//           setError('Failed to load categories');
//           setLoading(false);
//           console.error('Error fetching categories:', err);
//         }
//       };
  
//       fetchCategories();
//     }, []);  

//   const onSubmit = async (data) => {
//     try {
//       // Add user ID from localStorage
//       data.userId = localStorage.getItem('id');
      
//       setIsLoading(true);
//       const response = await axios.post('/location/locationwithfile', data);
//       //data.roleId=
//       if (response.status === 201) {
//         toast.success('Restaurant registered successfully!');
//         setTimeout(() => {
//           // navigate('/dashboard');
//         }, 2000);
//       }
//     } catch (error) {
//       console.error('Registration error:', error);
//       toast.error(error.response?.data?.message || 'Registration failed');
//     } finally {
//       setIsLoading(false);
//     }
//   };
  
//   return (
//     <>
//     <Rsidebar></Rsidebar>
//     <div className="restaurant-register-container">
//       <div className="restaurant-form-wrapper">
//         <div className="glow-effect"></div>
//         <h2>Register Your Restaurant</h2>
//         {restaurantName && <p className="pre-filled-notice">Welcome, {restaurantName}! Please complete your registration.</p>}
        
//         {/* Added form-content-scroll div to enable scrolling */}
//         <div className="form-content-scroll">
//           <form onSubmit={handleSubmit(onSubmit)} className="restaurant-form">
//             <div className="form-group">
//               <label htmlFor="title">Restaurant Name</label>
//               <input
//                 type="text"
//                 id="title"
//                 placeholder="Enter restaurant name"
//                 {...register("title", { required: "Restaurant name is required" })}
//                 className={errors.title ? "input-error" : ""}
//                 defaultValue={restaurantName}
//               />
//               {errors.title && <p className="error-message">{errors.title.message}</p>}
//             </div>
            
//             {/* <div className="form-group">
//               <label htmlFor="category">Category</label>
//               <select
//                 id="category"
//                 {...register("category", { required: "Category is required" })}
//                 className={errors.category ? "input-error" : ""}
//               >
//                 <option value="">Select a category</option>
//                 <option value="Fine Dining">Fine Dining</option>
//                 <option value="Casual Dining">Casual Dining</option>
//                 <option value="Fast Food">Fast Food</option>
//                 <option value="Cafe">Cafe</option>
//                 <option value="Buffet">Buffet</option>
//                 <option value="Food Truck">Food Truck</option>
//                 <option value="Pub & Bar">Pub & Bar</option>
//                 <option value="Bakery">Bakery</option>
//               </select>
//               {errors.category && <p className="error-message">{errors.category.message}</p>}
//             </div> */}

// <div className="form-row">
//   <div className="form-group">
//     <label htmlFor="category">Category</label>
//     <select
//       id="category"
//       name="category"
//       value={watch('category')}
//       onChange={(e) => setValue('category', e.target.value)}
//       className={`form-input ${errors.category ? 'input-error' : ''}`}
//     >
//       <option value="">Select Category</option>
//       {loading ? (
//         <option disabled>Loading categories...</option>
//       ) : categories.length === 0 ? (
//         <option disabled>No categories available</option>
//       ) : (
//         categories.map((category) => (
//           <option key={category._id} value={category._id}>
//             {category.name}
//           </option>
//         ))
//       )}
//     </select>
//     {errors.category && <p className="error-message">{errors.category}</p>}
//   </div>
// </div>
            
//             <div className="form-group">
//               <label htmlFor="description">Description</label>
//               <textarea
//                 id="description"
//                 placeholder="Tell us about your restaurant"
//                 rows="4"
//                 {...register("description", { 
//                   required: "Description is required",
//                   minLength: { value: 20, message: "Description must be at least 20 characters" }
//                 })}
//                 className={errors.description ? "input-error" : ""}
//               ></textarea>
//               {errors.description && <p className="error-message">{errors.description.message}</p>}
//             </div>
            
//             <div className="form-group">
//               <label htmlFor="timmings">Operating Hours</label>
//               <input
//                 type="text"
//                 id="timmings"
//                 placeholder="e.g. Mon-Fri: 9AM-10PM, Sat-Sun: 10AM-11PM"
//                 {...register("timmings", { required: "Operating hours are required" })}
//                 className={errors.timmings ? "input-error" : ""}
//               />
//               {errors.timmings && <p className="error-message">{errors.timmings.message}</p>}
//             </div>
            
//             <div className="form-group">
//               <label htmlFor="contactNumber">Contact Number</label>
//               <input
//                 type="text"
//                 id="contactNumber"
//                 placeholder="Enter contact number"
//                 {...register("contactNumber", { 
//                   required: "Contact number is required",
//                   pattern: { value: /^[0-9+\-\s()]{10,15}$/, message: "Please enter a valid phone number" }
//                 })}
//                 className={errors.contactNumber ? "input-error" : ""}
//               />
//               {errors.contactNumber && <p className="error-message">{errors.contactNumber.message}</p>}
//             </div>
            
//             <div className="form-group">
//               <label htmlFor="address">Address</label>
//               <textarea
//                 id="address"
//                 placeholder="Enter full address"
//                 rows="3"
//                 {...register("address", { required: "Address is required" })}
//                 className={errors.address ? "input-error" : ""}
//               ></textarea>
//               {errors.address && <p className="error-message">{errors.address.message}</p>}
//             </div>
            
//             <div className="form-row">
//               <div className="form-group">
//                 <label htmlFor="stateId">State</label>
//                 <select
//                   id="stateId"
//                   {...register("stateId", { required: "State is required" })}
//                   className={errors.stateId ? "input-error" : ""}
//                   onChange={(e) => getCityByStateId(e.target.value)}
//                 >
//                   <option value="">Select State</option>
//                   {states.map((state) => (
//                     <option key={state._id} value={state._id}>{state.name}</option>
//                   ))}
//                 </select>
//                 {errors.stateId && <p className="error-message">{errors.stateId.message}</p>}
//               </div>
              
//               <div className="form-group">
//                 <label htmlFor="cityId">City</label>
//                 <select
//                   id="cityId"
//                   {...register("cityId", { required: "City is required" })}
//                   className={errors.cityId ? "input-error" : ""}
//                   onChange={(e) => getAreaByCityId(e.target.value)}
//                 >
//                   <option value="">Select City</option>     
//                   {cities && cities.map((city) => (
//                     <option key={city._id} value={city._id}>{city.name || city._id}</option>
//                   ))}
//                 </select>
//                 {errors.cityId && <p className="error-message">{errors.cityId.message}</p>}
//               </div>
//             </div>
            
//             <div className="form-group">
//               <label htmlFor="areaId">Area</label>
//               <select
//                 id="areaId"
//                 {...register("areaId")}
//               >
//                 <option value="">Select Area (Optional)</option>
//                 {areas?.map((area) => (
//                   <option key={area._id} value={area._id}>{area.name}</option>
//                 ))}
//               </select>
//             </div>
            
//             <div className="form-group">
//               <label htmlFor="foodtype">Food Type</label>
//               <select
//                 id="foodtype"
//                 {...register("foodtype", { required: "Food type is required" })}
//                 className={errors.foodtype ? "input-error" : ""}
//               >
//                 <option value="Vegetarian">Vegetarian</option>
//                 <option value="Non-Vegetarian">Non-Vegetarian</option>
//                 <option value="Both">Both</option>
//               </select>
//               {errors.foodtype && <p className="error-message">{errors.foodtype.message}</p>}
//             </div> 
            
//             <div className="form-row">
//               <div className="form-group">
//                 <label htmlFor="latitude">Latitude</label>
//                 <input
//                   type="text"
//                   id="latitude"
//                   placeholder="Latitude"
//                   {...register("latitude", { required: "Latitude is required" })}
//                   className={errors.latitude ? "input-error" : ""}
//                   readOnly
//                 />
//                 {errors.latitude && <p className="error-message">{errors.latitude.message}</p>}
//               </div>
              
//               <div className="form-group">
//                 <label htmlFor="longtitude">Longitude</label>
//                 <input
//                   type="text"
//                   id="longtitude"
//                   placeholder="Longitude"
//                   {...register("longtitude", { required: "Longitude is required" })}
//                   className={errors.longtitude ? "input-error" : ""}
//                   readOnly
//                 />
//                 {errors.longtitude && <p className="error-message">{errors.longtitude.message}</p>}
//               </div>
//             </div>
            
//             <button 
//               type="button" 
//               className="location-button"
//               onClick={getCurrentLocation}
//               disabled={isLoading}
//             >
//               {isLoading ? 'Detecting Location...' : 'Get Current Location'}
//             </button>
            
//             <div className="form-group checkbox-group">
//               <input
//                 type="checkbox"
//                 id="active"
//                 {...register("active")}
//               />
//               <label htmlFor="active">List as Active Restaurant</label>
//             </div>

//             <div className="form-group">
//   <label htmlFor="restaurantImage">Restaurant Image</label>
//   <input
//     type="file"
//     id="restaurantImage"
//     accept="image/*"
//     {...register("restaurantImage", { 
//       required: "Restaurant image is required" 
//     })}
//     className={errors.restaurantImage ? "input-error" : ""}
//   />
//   {errors.restaurantImage && <p className="error-message">{errors.restaurantImage.message}</p>}
// </div>
//           </form>
//         </div>

        
        
//         {/* Button positioned outside the scrollable area */}
//         <button 
//           onClick={handleSubmit(onSubmit)} 
//           className="submit-button"
//           disabled={isLoading}
//         >
//           {isLoading ? 'Processing...' : 'Register Restaurant'}
//         </button>
//       </div>
//       <ToastContainer position="top-right" autoClose={3000} />
//     </div>
//     </>
//   );
// };

// export default RestaurantRegistration;

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../assets/css/Location.css';
import Rsidebar from './Rsidebar';
import { Link } from 'react-router-dom';


const RestaurantRegistration = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  // Get restaurant name from navigation state if it exists
  const restaurantName = location.state?.restaurantName || '';

  useEffect(() => {
    getAllStates();
  }, []);

  const getAllStates = async () => {
    const res = await axios.get("/state/getallstates");
    setStates(res.data.data);
  };
  const getCityByStateId = async (id) => {
    const res = await axios.get("/city/getcitybystateid/" + id);
    setCities(res.data.data);
  };

  const getAreaByCityId = async (id) => {
    console.log("city function");
    
    const res = await axios.get("/area/getareabycity/" + id);
    console.log(res.data);
    setAreas(res.data.data);
  };


  
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    watch,
    setValue
  } = useForm({
    defaultValues: {
      active: true,
      foodtype: 'Vegetarian',
      title: restaurantName // Set the restaurant name from landing page
    }
  });
  
  // Watch for changes in state and city selections
  const watchState = watch('stateId');
  const watchCity = watch('cityId');
  
 
  
  // Get current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setValue('latitude', position.coords.latitude.toString());
          setValue('longtitude', position.coords.longitude.toString());
          setIsLoading(false);
          toast.success('Location detected successfully');
        },
        (error) => {
          console.error('Error getting location:', error);
          toast.error('Failed to get location');
          setIsLoading(false);
        }
      );
    } else {
      toast.error('Geolocation is not supported by this browser');
    }
  };
  
  useEffect(() => {
      const fetchCategories = async () => {
        try {
          setLoading(true);
          const response = await axios.get('https://bhookbuster.netlify.app/category/getallcategories');
          if (response.data && response.data.data) {
            setCategories(response.data.data);
          }
          setLoading(false);
        } catch (err) {
          alert('Failed to load categories');
          setLoading(false);
          console.error('Error fetching categories:', err);
        }
      };
  
      fetchCategories();
    }, []);  

  // UPDATED: Modified onSubmit function to handle file uploads correctly
  const onSubmit = async (data) => {
    try { 
      // Create FormData object for file upload
      const formData = new FormData();
      
      // Add all form fields to FormData
      Object.keys(data).forEach(key => {
        if (key === 'restaurantImage') {
          // Handle file field separately
          if (data[key][0]) {
            formData.append('file', data[key][0]); // 'file' must match multer configuration
          }
        } else {
          formData.append(key, data[key]);
        }
      });
      
      // Add user ID from localStorage
      formData.append('userId', localStorage.getItem('id'));
      
      setIsLoading(true);
      const response = await axios.post('/location/locationwithfile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      if (response.status === 201) {
        toast.success('Restaurant registered successfully!');
        setTimeout(() => {
          // navigate('/dashboard');
        }, 2000);
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <>
    <Rsidebar></Rsidebar>
    <div className="restaurant-register-container">
      <div className="restaurant-form-wrapper">
        <div className="glow-effect"></div>
        <h2>Register Your Restaurant</h2>
        {restaurantName && <p className="pre-filled-notice">Welcome, {restaurantName}! Please complete your registration.</p>}
        
        {/* Added form-content-scroll div to enable scrolling */}
        <div className="form-content-scroll">
          {/* UPDATED: Added encType attribute for file upload */}
          <form onSubmit={handleSubmit(onSubmit)} className="restaurant-form" encType="multipart/form-data">
            <div className="form-group">
              <label htmlFor="title">Restaurant Name</label>
              <input
                type="text"
                id="title"
                placeholder="Enter restaurant name"
                {...register("title", { required: "Restaurant name is required" })}
                className={errors.title ? "input-error" : ""}
                defaultValue={restaurantName}
              />
              {errors.title && <p className="error-message">{errors.title.message}</p>}
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  name="category"
                  value={watch('category')}
                  onChange={(e) => setValue('category', e.target.value)}
                  className={`form-input ${errors.category ? 'input-error' : ''}`}
                >
                  <option value="">Select Category</option>
                  {loading ? (
                    <option disabled>Loading categories...</option>
                  ) : categories.length === 0 ? (
                    <option disabled>No categories available</option>
                  ) : (
                    categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))
                  )}
                </select>
                {errors.category && <p className="error-message">{errors.category}</p>}
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                placeholder="Tell us about your restaurant"
                rows="4"
                {...register("description", { 
                  required: "Description is required",
                  minLength: { value: 20, message: "Description must be at least 20 characters" }
                })}
                className={errors.description ? "input-error" : ""}
              ></textarea>
              {errors.description && <p className="error-message">{errors.description.message}</p>}
            </div>
            
            <div className="form-group">
              <label htmlFor="timmings">Operating Hours</label>
              <input
                type="text"
                id="timmings"
                placeholder="e.g. Mon-Fri: 9AM-10PM, Sat-Sun: 10AM-11PM"
                {...register("timmings", { required: "Operating hours are required" })}
                className={errors.timmings ? "input-error" : ""}
              />
              {errors.timmings && <p className="error-message">{errors.timmings.message}</p>}
            </div>
            
            <div className="form-group">
              <label htmlFor="contactNumber">Contact Number</label>
              <input
                type="text"
                id="contactNumber"
                placeholder="Enter contact number"
                {...register("contactNumber", { 
                  required: "Contact number is required",
                  pattern: { value: /^[0-9+\-\s()]{10,15}$/, message: "Please enter a valid phone number" }
                })}
                className={errors.contactNumber ? "input-error" : ""}
              />
              {errors.contactNumber && <p className="error-message">{errors.contactNumber.message}</p>}
            </div>
            
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <textarea
                id="address"
                placeholder="Enter full address"
                rows="3"
                {...register("address", { required: "Address is required" })}
                className={errors.address ? "input-error" : ""}
              ></textarea>
              {errors.address && <p className="error-message">{errors.address.message}</p>}
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="stateId">State</label>
                <select
                  id="stateId"
                  {...register("stateId", { required: "State is required" })}
                  className={errors.stateId ? "input-error" : ""}
                  onChange={(e) => getCityByStateId(e.target.value)}
                >
                  <option value="">Select State</option>
                  {states.map((state) => (
                    <option key={state._id} value={state._id}>{state.name}</option>
                  ))}
                </select>
                {errors.stateId && <p className="error-message">{errors.stateId.message}</p>}
              </div>
              
              <div className="form-group">
                <label htmlFor="cityId">City</label>
                <select
                  id="cityId"
                  {...register("cityId", { required: "City is required" })}
                  className={errors.cityId ? "input-error" : ""}
                  onChange={(e) => getAreaByCityId(e.target.value)}
                >
                  <option value="">Select City</option>     
                  {cities && cities.map((city) => (
                    <option key={city._id} value={city._id}>{city.name || city._id}</option>
                  ))}
                </select>
                {errors.cityId && <p className="error-message">{errors.cityId.message}</p>}
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="areaId">Area</label>
              <select
                id="areaId"
                {...register("areaId")}
              >
                <option value="">Select Area (Optional)</option>
                {areas?.map((area) => (
                  <option key={area._id} value={area._id}>{area.name}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="foodtype">Food Type</label>
              <select
                id="foodtype"
                {...register("foodtype", { required: "Food type is required" })}
                className={errors.foodtype ? "input-error" : ""}
              >
                <option value="Vegetarian">Vegetarian</option>
                <option value="Non-Vegetarian">Non-Vegetarian</option>
                <option value="Both">Both</option>
              </select>
              {errors.foodtype && <p className="error-message">{errors.foodtype.message}</p>}
            </div> 
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="latitude">Latitude</label>
                <input
                  type="text"
                  id="latitude"
                  placeholder="Latitude"
                  {...register("latitude", { required: "Latitude is required" })}
                  className={errors.latitude ? "input-error" : ""}
                  readOnly
                />
                {errors.latitude && <p className="error-message">{errors.latitude.message}</p>}
              </div>
              
              <div className="form-group">
                <label htmlFor="longtitude">Longitude</label>
                <input
                  type="text"
                  id="longtitude"
                  placeholder="Longitude"
                  {...register("longtitude", { required: "Longitude is required" })}
                  className={errors.longtitude ? "input-error" : ""}
                  readOnly
                />
                {errors.longtitude && <p className="error-message">{errors.longtitude.message}</p>}
              </div>
            </div>
            
            <button 
              type="button" 
              className="location-button"
              onClick={getCurrentLocation}
              disabled={isLoading}
            >
              {isLoading ? 'Detecting Location...' : 'Get Current Location'}
            </button>
            
            <div className="form-group checkbox-group">
              <input
                type="checkbox"
                id="active"
                {...register("active")}
              />
              <label htmlFor="active">List as Active Restaurant</label>
            </div>

            <div className="form-group">
              <label htmlFor="restaurantImage">Restaurant Image</label>
              <input
                type="file"
                id="restaurantImage"
                accept="image/*"
                {...register("restaurantImage", { 
                  required: "Restaurant image is required" 
                })}
                className={errors.restaurantImage ? "input-error" : ""}
              />
              {errors.restaurantImage && <p className="error-message">{errors.restaurantImage.message}</p>}
            </div>
          </form>
        </div>

        
        
        {/* Button positioned outside the scrollable area */}
        <button 
          onClick={handleSubmit(onSubmit)} 
          className="submit-button"
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : 'Register Restaurant'}
        </button>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
    </>
  );
};

export default RestaurantRegistration;