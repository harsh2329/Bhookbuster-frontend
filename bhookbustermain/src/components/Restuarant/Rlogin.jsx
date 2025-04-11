import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import '../../assets/css/Auth.css';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Rlogin = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const res = await axios.post("/reslogsign/rlogin", data, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (res.status === 200) {
        toast.success('Logged in successfully!');
        
        // Store user data in localStorage
        localStorage.setItem("id", res.data.restaurant.id);
        localStorage.setItem("role", "RESTAURANT");
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userName", res.data.restaurant.name);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("email", res.data.restaurant.email);
        localStorage.setItem("isVerified", res.data.restaurant.is_verified);

        // Redirect to restaurant dashboard
        setTimeout(() => {
          navigate('/rdashboard');
        }, 1500);
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error.response) {
        if (error.response.status === 422) {
          toast.error('Invalid email or password');
        } else if (error.response.status === 401) {
          toast.error('Invalid credentials');
        } else {
          toast.error(error.response.data?.message || 'Login failed. Please try again.');
        }
      } else {
        toast.error('Network error. Please check your connection.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!resetEmail) {
      toast.error('Please enter your email address');
      return;
    }

    try {
      const res = await axios.post(`/restaurant/forgotpassword?email=${encodeURIComponent(resetEmail)}`);
      if (res.status === 200) {
        toast.success('Password reset link sent to your email');
        setShowForgotPassword(false);
        setResetEmail('');
      }
    } catch (error) {
      console.error('Forgot password error:', error);
      if (error.response) {
        toast.error(error.response.data?.message || 'Failed to send reset link. Please try again.');
      } else {
        toast.error('Network error. Please check your connection.');
      }
    }
  };

  const handleSignupTransition = () => {
    setAnimating(true);
    setTimeout(() => {
      navigate('/rsignup');
    }, 500);
  };

  return (
    <div className={`auth-container reversed ${animating ? 'slide-right' : ''}`}>
      <div className="auth-right">
        <div className="auth-form-container">
          <div className="glow-effect"></div>
          <h2>Restaurant Login</h2>
          {!showForgotPassword ? (
            <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
              <div className="form-group">
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
                <button 
                  type="button" 
                  className="text-button"
                  onClick={() => setShowForgotPassword(true)}
                >
                  Forgot Password?
                </button>
              </div>
              
              <button 
                type="submit" 
                className="auth-button"
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleForgotPassword} className="auth-form">
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-options">
                <button 
                  type="button" 
                  className="text-button"
                  onClick={() => setShowForgotPassword(false)}
                >
                  Back to Login
                </button>
              </div>
              <button type="submit" className="auth-button">Send Reset Link</button>
            </form>
          )}
        </div>
      </div>
      
      <div className="auth-left">
        <div className="auth-welcome">
          <h1>Welcome Back</h1>
          <p>Glad to see you again! Sign in to continue managing your restaurant.</p>
          
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

export default Rlogin;