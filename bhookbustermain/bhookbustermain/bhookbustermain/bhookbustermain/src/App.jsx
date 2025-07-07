import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Usersidebar from './components/user/UserSidebar';
import UserSignup from './components/common/UserSignup';
import UserLogin from './components/common/UserLogin';
import Rsidebar from './components/Restuarant/Rsidebar';
// import Adminsidebar from './components/Admin/Adminsidebar';
import './assets/css/adminlte.css';
import './assets/css/adminlte.min.css';
import Rlogin from './components/Restuarant/Rlogin';
import Rsignup from './components/Restuarant/Rsignup';
// import Alogin from './components/Admin/Alogin';
import axios from 'axios';
import './app.css';
import { useEffect } from 'react';
import LandingPage from './components/Landing page/LandingPage';
import PrivateRoutes from "./hooks/PrivateRoutes";
import LocationForm from "./components/Restuarant/LocationForm";
import ResHero from "./components/Restuarant/ResHero";
import Offer from "./components/Restuarant/Offer";
import Rdashboard from "./components/Restuarant/Rdasborad";
import Home from './components/Landing page/Navbar/Home';
import Aboutus from './components/Landing page/Navbar/Aboutus';
import Viewoffer from './components/Restuarant/Viewoffer';
import ViewSingleOffer from './components/Restuarant/ViewSingleOffer';
import AdminSidebar from './components/Admin/AdminSidebar';
import AdminDashboard from './components/Admin/AdminDashboard';

import OffersPage from './components/Landing page/OffersPage';
import FoodPage from './components/Landing page/FoodPage';
import ResetPassword  from "../../bhookbustermain/src/components/common/ResetPassword";

import ViewRestaurant from "../../bhookbustermain/src/components/Restuarant/ViewRestaurant";
import ViewUser from "../../bhookbustermain/src/components/user/ViewUser";
import AdminLogin from './components/Admin/AdminLogin';
import AdminLogout from './components/Admin/AdminLogout';
import ResHome from '../../bhookbustermain/src/components/Restuarant/ResHome';
import ViewResParti from '../../bhookbustermain/src/components/Restuarant/ViewResParti';
import FirmCollections from '../src/components/Landing page/FirmCollections';


function App() {
  useEffect(() => {
    // Apply saved theme on app load
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    document.body.classList.add(savedTheme === 'dark' ? 'dark-theme' : 'light-theme');
  }, []);
  axios.defaults.baseURL = "https://bhookbuster-backend-3.onrender.com/";

  const ProtectedRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('adminLoggedIn') === 'true';
    
    if (!isAuthenticated) {
      return <Navigate to="/admin/login" />;
    }
    
    return children;
  };
  return ( 
    <div className="layout-fixed sidebar-expand-lg bg-body-tertiary app-loaded">
      <div className="app-wrapper">
        <Routes>
        <Route path='/login' element={<UserLogin />} />
        <Route path='/signup' element={<UserSignup />} />
        <Route path='/' element={<LandingPage />} />
        <Route path='/locationform' element={<LocationForm />} />
        <Route path='/herores' element={<ResHero />} />
        <Route path='/offer' element={<Offer />} />
        <Route path ='/rdashboard' element={<Rdashboard />} />
        <Route path="/resetpassword/:token" element={<ResetPassword />} />
        <Route path="/home" element={<Home />} />
        <Route path='/aboutus' element={<Aboutus />} />
        <Route path="/viewoffer" element={<Viewoffer />} />
        <Route path='rlogin' element={<Rlogin />} />
        <Route path='rsignup' element={<Rsignup />} />
        <Route path='singleoffer' element={<ViewSingleOffer />} />
        <Route path ='/admin' element={<AdminDashboard />} />
        <Route path ='/viewrestaurant' element={<ViewRestaurant />} />
        <Route path='/viewuser' element={<ViewUser />} />
        <Route path='/viewpartires' element={<ViewResParti />} />
        <Route path='/rescarddisplay' element={<FirmCollections />} />
 
        <Route path="admin/alogin" element={<AdminLogin />} />
        <Route 
          path="/admin/logout" 
          element={
            <ProtectedRoute>
              <AdminLogout />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/admin/login" />} />
        <Route path="/reshome" element ={<ResHome />} />
  
        <Route path="" element={<PrivateRoutes />}></Route>
       
        <Route path="/food/:category" element={<FoodPage />} /> 
        <Route path="/offers" element={<OffersPage />} /> 
    
          <Route path='/user' element={<Usersidebar />}>
           
          </Route>
          <Route path='/restaurant' element={<Rsidebar />}>
            <Route path='rlogin' element={<Rlogin />} />
            <Route path='rsignup' element={<UserSignup />} />
           
          </Route>
          {/* <Route path='/admin' element={<AdminDashboard />} > */}
          <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
          <Route path='admins' element={<AdminSidebar />} />
            {/* <Route path='alogin' element={<Alogin />} /> */}
            <Route path='asignup' element={<UserSignup />} />
              <Route path ='viewrestaurant' element={<ViewRestaurant />} />
          {/* </Route> */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
