// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import '../../assets/css/Auth.css';
// import { data ,useNavigate } from 'react-router-dom';
// import axios from 'axios';

// function UserSignup() {
//   const navigate = useNavigate();
//   const [animating, setAnimating] = useState(false);
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: ''
//   });

//   const { 
//     register, 
//     handleSubmit, 
//     watch, 
//     formState: { errors } 
//   } = useForm();
  
//   const password = React.useRef({});
//   password.current = watch("password", "");
  
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const submitHandler = async (data) => {
    
//       data.roleId = "67bfe67942572fb2ba64ef14";
//       console.log('data', data);

//       const res = await axios.post("/user", data);

// if(res.status === 201){
//       toast.success('Account created successfully!');
//       navigate('/user/login');
// }else{
//   toast.eroor("Usernot created")
// }
     
      
    
//   };

//   const handleLoginTransition = () => {
//     setAnimating(true);
//     setTimeout(() => {
//       navigate('/user/login');
//     }, 500); // Transition duration match karna
//   };

//   return (
//     <div className={`auth-container ${animating ? 'slide-left' : ''}`}>
//       <div className="auth-left">
//         <div className="auth-welcome">
//           <h1>Join Us Today</h1>
//           <p>Create an account and start your journey with us. It only takes a few minutes.</p>
          
//           <div className="auth-switch-left">
//             <button 
//               className="switch-button-left login-button"
//               onClick={handleLoginTransition}
//             >
//               <span>Login</span>
//               <div className="button-glow"></div>
//             </button>
//           </div>
//         </div>
//       </div>
      
//       <div className="auth-right">
//         <div className="auth-form-container">
//           <div className="glow-effect"></div>
//           <h2>Sign Up</h2>
//           <form onSubmit={handleSubmit(submitHandler)} className="auth-form">
//             <div className="form-group">
//               <label htmlFor="name">Full Name</label>
//               <input
//                 type="text"
//                 placeholder="Enter your full name"
//                 {...register("name", { 
//                   required: "Full name is required",
//                   minLength: { 
//                     value: 2, 
//                     message: "Name must be at least 2 characters" 
//                   } 
//                 })}
//                 className={errors.UserName ? "input-error" : ""}
//                 name="username"
//                 value={formData.username}
//                 onChange={handleChange}
//               />
//               {errors.UserName && <p className="error-message">{errors.UserName.message}</p>}
//             </div>
            
//             <div className="form-group">
//               <label htmlFor="email">Email</label>
//               <input
//                 type="email"
                
//                 placeholder="Enter your email"
//                 {...register("email", { 
//                   required: "Email is required", 
//                   pattern: { 
//                     value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 
//                     message: "Invalid email address" 
//                   } 
//                 })}
//                 className={errors.Email ? "input-error" : ""}
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//               />
//               {errors.Email && <p className="error-message">{errors.Emailmail.message}</p>}
//             </div>
            
//             <div className="form-group">
//               <label htmlFor="password">Password</label>
//               <div className="password-input-wrapper">
//                 <input
//                   type={showPassword ? "text" : "password"}
                 
//                   placeholder="Create a password"
//                   {...register("password", { 
//                     required: "Password is required",
//                     minLength: { 
//                       value: 8, 
//                       message: "Password must be at least 8 characters" 
//                     },
//                     pattern: {
//                       value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
//                       message: "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
//                     }
//                   })}
//                   className={errors.Password ? "input-error" : ""}
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                 />
//                 <button 
//                   type="button" 
//                   className="toggle-password"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? "Hide" : "Show"}
//                 </button>
//               </div>
//               {errors.Password && <p className="error-message">{errors.Password.message}</p>}
//             </div>
            
//             <div className="form-group">
//               <label htmlFor="confirmPassword">Confirm Password</label>
//               <div className="password-input-wrapper">
//                 <input
//                   type={showConfirmPassword ? "text" : "password"}
//                   id="confirmPassword"
//                   placeholder="Confirm your password"
//                   {...register("confirmPassword", { 
//                     required: "Please confirm your password",
//                     validate: value => value === password.current || "Passwords do not match"
//                   })}
//                   className={errors.confirmPassword ? "input-error" : ""}
//                 />
//                 <button 
//                   type="button" 
//                   className="toggle-password"
//                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                 >
//                   {showConfirmPassword ? "Hide" : "Show"}
//                 </button>
//               </div>
//               {errors.confirmPassword && <p className="error-message">{errors.confirmPassword.message}</p>}
//             </div>
            
//             <div className="form-group">
//               <label htmlFor="role">Role</label>
//               <select 
//                 id="role" 
//                 {...register("role", { required: "Please select a role" })}
//                 className={errors.Role ? "input-error" : ""}
//               >
//                 <option value="user">User</option>
//                 <option value="admin">Admin</option>
//                 <option value="manager">Manager</option>
//               </select>
//               {errors.role && <p className="error-message">{errors.role.message}</p>}
//             </div>
            
//             <button type="submit" className="auth-button">Sign Up</button>
//           </form>
//         </div>
//       </div>
//       <ToastContainer position="top-right" autoClose={3000} />
//       </div>
//     );
//   }


// export default UserSignup;

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../assets/css/Auth.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { v4 as uuidv4 } from 'uuid'; // For generating unique userId

function UserSignup() {
  const navigate = useNavigate();
  const [animating, setAnimating] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [formData, setFormData] = useState({
    // userId: uuidv4(), // Generate unique user ID
    firstname: '',
    lastname: '',
    gender: '',
    contact: '',
    email: '',
    password: '',
    age: '',
    profilePicPath: '',
    role: 'user'
  });

  const { 
    register, 
    handleSubmit, 
    watch, 
    formState: { errors } 
  } = useForm();
  
  const password = React.useRef({});
  password.current = watch("password", "");
  const [action, setAction] = useState("Sign Up");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    if (name === 'profilePic') {
      const file = files[0];
      setProfilePic(file);
      
      // Create a file reader to get the file path
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          profilePicPath: reader.result
        }));
      };
      
      if (file) {
        reader.readAsDataURL(file);
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const submitHandler = async (data) => {
    console.log(data)
    try {
      if (action === "Sign Up") {
        formData.roleId = "67bd3f8a8717278a8401f812"; // Default role assignment
        const res = await axios.post("/user", data);
        console.log(res.data);
        
        if (res.status === 201) {
          // alert("User registered successfully!");
          toast.success('User registered successfully!');
           
        
        } else {
            //alert("Signup failed. Please try again.");
            toast.error('Signup failed. Please try again.');
            
        }
      } 
      setTimeout(() => {
       
        navigate('/login');
        handleLoginTransition();
      }, 1500);
    } catch (err) {
      console.log(err);
      alert("An error occurred. Please try again later.");
    }
  };

  const handleLoginTransition = () => {
    setAnimating(true);
    setTimeout(() => {
      navigate('/login');
    }, 500);
  };

  return (
    <div className={`auth-container ${animating ? 'slide-left' : ''}`}>
      <div className="auth-left">
        <div className="auth-welcome">
          <h1>Join Us Today</h1>
          <p>Create an account and start your journey with us. It only takes a few minutes.</p>
          
          <div className="auth-switch-left">
            <button 
              className="switch-button-left login-button"
              onClick={handleLoginTransition}
            >
              <span>Login</span>
              <div className="button-glow"></div>
            </button>
          </div>
        </div>
      </div>
      
      <div className="auth-right">
        <div className="auth-form-container scrollable-form">
          <div className="glow-effect"></div>
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit(submitHandler)} className="auth-form">
            {/* First Name */}
            <div className="form-group">
              <label htmlFor="firstname">First Name</label>
              <input
                type="text"
                placeholder="Enter your first name"
                {...register("firstname", { 
                  required: "First name is required",
                  minLength: { 
                    value: 2, 
                    message: "First name must be at least 2 characters" 
                  } 
                })}
                className={errors.firstname ? "input-error" : ""}
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
              />
              {errors.firstname && <p className="error-message">{errors.firstname.message}</p>}
            </div>

            {/* Last Name */}
            <div className="form-group">
              <label htmlFor="lastname">Last Name</label>
              <input
                type="text"
                placeholder="Enter your last name"
                {...register("lastname", { 
                  required: "Last name is required",
                  minLength: { 
                    value: 2, 
                    message: "Last name must be at least 2 characters" 
                  } 
                })}
                className={errors.lastname ? "input-error" : ""}
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
              />
              {errors.lastname && <p className="error-message">{errors.lastname.message}</p>}
            </div>

            {/* Gender */}
            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <select 
                {...register("gender", { required: "Please select your gender" })}
                className={errors.gender ? "input-error" : ""}
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && <p className="error-message">{errors.gender.message}</p>}
            </div>

            {/* Contact */}
            <div className="form-group">
              <label htmlFor="contact">Contact Number</label>
              <input
                type="tel"
                placeholder="Enter your contact number"
                {...register("contact", { 
                  required: "Contact number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Please enter a valid 10-digit phone number"
                  }
                })}
                className={errors.contact ? "input-error" : ""}
                name="contact"
                value={formData.contact}
                onChange={handleChange}
              />
              {errors.contact && <p className="error-message">{errors.contact.message}</p>}
            </div>
StateSchema
            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                {...register("email", { 
                  required: "Email is required", 
                  pattern: { 
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 
                    message: "Invalid email address" 
                  } 
                })}
                className={errors.email ? "input-error" : ""}
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="error-message">{errors.email.message}</p>}
            </div>

            {/* Age */}
            <div className="form-group">
              <label htmlFor="age">Age</label>
              <input
                type="number"
                placeholder="Enter your age"
                {...register("age", { 
                  required: "Age is required",
                  min: {
                    value: 18,
                    message: "You must be at least 18 years old"
                  },
                  max: {
                    value: 120,
                    message: "Please enter a valid age"
                  }
                })}
                className={errors.age ? "input-error" : ""}
                name="age"
                value={formData.age}
                onChange={handleChange}
              />
              {errors.age && <p className="error-message">{errors.age.message}</p>}
            </div>

            {/* Profile Picture */}
            {/* <div className="form-group">
              <label htmlFor="profilePic">Profile Picture</label>
              <input
                type="file"
                accept="image/*"
                name="profilePic"
                onChange={handleChange}
                className={errors.profilePic ? "input-error" : ""}
              />
              {profilePic && (
                <div className="profile-preview">
                  <img 
                    src={URL.createObjectURL(profilePic)} 
                    alt="Profile Preview" 
                    className="preview-image"
                  />
                </div>
              )}
            </div> */}
            <div className="form-group">
  <label htmlFor="profilePic">Profile Picture</label>
  <input
    type="file"
    accept="image/*"
    name="profilePic"
    onChange={handleChange}
    className={errors.profilePic ? "input-error" : ""}
  />
  {profilePic && (
    <div className="file-indicator">
     
    
     
    </div>
  )}
</div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  {...register("password", { 
                    required: "Password is required",
                    minLength: { 
                      value: 8, 
                      message: "Password must be at least 8 characters" 
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message: "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
                    }
                  })}
                  className={errors.password ? "input-error" : ""}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button 
                  type="button" 
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.password && <p className="error-message">{errors.password.message}</p>}
            </div>
            
            {/* Confirm Password */}
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="password-input-wrapper">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  {...register("confirmPassword", { 
                    required: "Please confirm your password",
                    validate: value => value === password.current || "Passwords do not match"
                  })}
                  className={errors.confirmPassword ? "input-error" : ""}
                />
                <button 
                  type="button" 
                  className="toggle-password"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.confirmPassword && <p className="error-message">{errors.confirmPassword.message}</p>}
            </div>
            
            {/* Role Selection */}
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <select 
                {...register("role", { required: "Please select a role" })}
                className={errors.role ? "input-error" : ""}
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
              </select>
              {errors.role && <p className="error-message">{errors.role.message}</p>}
            </div>
            
            <button type="submit" className="auth-button">Sign Up</button>
          </form>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default UserSignup;