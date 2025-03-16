import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios'; // Add this import
import 'react-toastify/dist/ReactToastify.css';
import '../../assets/css/Auth.css';
import { useNavigate } from 'react-router-dom';

const UserLogin = ({ toggleForm }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [animating, setAnimating] = useState(false);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm();
  
  const onSubmit = async (data) => {
    try {
      const res = await axios.post("/user/login", data);
      if (res.status === 200) {
        toast.success("Login Success");
  
        localStorage.setItem("id", res.data.data?._id || "");
        localStorage.setItem("role", res.data.data?.roleId?.name || "");
  
        if (res.data.data?.roleId?.name === "USER") {
          navigate("/restaurant");
        } else if (res.data.data?.roleId?.name === "RESTAURANT") {
          navigate("/restaurant");
        }
      }
      setTimeout(() => {
       
        navigate('/user');
        // handleLoginTransition();
      }, 1500);
    } catch (error) {
      console.log(error);
      toast.error("Login Failed");
    }
  };
  
  const handleSignupTransition = () => {
    setAnimating(true);
    setTimeout(() => {
      navigate('/signup');
    }, 500);
    
  }; // Fixed missing closing brace
  
  // Moved return statement outside of handleSignupTransition
  return (
    <div className={`auth-container reversed ${animating ? 'slide-right' : ''}`}>
      <div className="auth-right">
        <div className="auth-form-container">
          <div className="glow-effect"></div>
          <h2>Login</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                {...register("email", { 
                  required: "Email is required", 
                  pattern: { 
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 
                    message: "Invalid email address" 
                  } 
                })}
                className={errors.email ? "input-error" : ""}
              />
              {errors.email && <p className="error-message">{errors.email.message}</p>}
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Enter your password"
                  {...register("password", { 
                    required: "Password is required"
                  })}
                  className={errors.password ? "input-error" : ""}
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
            
            <div className="form-options">
              <div className="remember-me">
                <input 
                  type="checkbox" 
                  id="remember" 
                  {...register("remember")} 
                />
                <label htmlFor="remember">Remember me</label>
              </div>
              <a href="#" className="forgot-password">Forgot Password?</a>
            </div>
            
            <button type="submit" className="auth-button">Login</button>
          </form>
        </div>
      </div>
      
      <div className="auth-left">
        <div className="auth-welcome">
          <h1>Welcome Back</h1>
          <p>Glad to see you again! Sign in to continue your journey with us.</p>
          
          <div className="auth-switch-left">
            <button 
              className="switch-button-left signup-button"
              onClick={handleSignupTransition}
            >
              <span>Sign Up</span>
              <div className="button-glow"></div>
            </button>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default UserLogin;