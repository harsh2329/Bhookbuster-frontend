import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import UserSidebar from '../../bhookbustermain/src/components/common/UserSidebar';
import UserSignup from '../../bhookbustermain/src/components/common/UserSignup';
import UserLogin from '../bhookbustermain/src/components/common/UserLogin';
import RSidebar from '../bhookbustermain/src/components/Restuarant/Rsidebar';
// import AdminSidebar from './components/Admin/AdminSidebar';
import './assets/css/adminlte.css';
import './assets/css/adminlte.min.css';
import RLogin from '../../bhookbustermain/src/components/Restuarant/Rlogin';
import RSignup from './components/restaurant/RSignup';
// import ALogin from './components/Admin/ALogin';
import axios from 'axios';
// import './App.css';
// import './App.css';
import { useEffect } from 'react';
import LandingPage from '../bhookbustermain/src/components/Landing page/LandingPage';
import PrivateRoutes from "../../bhookbustermain/src/hooks/PrivateRoutes";
import LocationForm from "../bhookbustermain/src/components/Restuarant/LocationForm";
import ResHero from "../../bhookbustermain/src/components/Restuarant/ResHero";
import Offer from "../../bhookbustermain/src/components/Restuarant/Offer";
import RDashboard from "../../bhookbustermain/src/components/Restuarant/Rdasborad";
import Home from '../../bhookbustermain/src/components/Landing page/Navbar/Home';
import AboutUs from '../../bhookbustermain/src/components/Landing page/Navbar/Aboutus';
import ViewOffer from '../bhookbustermain/src/components/Restuarant/Viewoffer';
import ViewSingleOffer from '../../bhookbustermain/src/components/Restuarant/ViewSingleOffer';
import AdminSidebar from '../../bhookbustermain/src/components/Admin/Adminsidebar';
import AdminDashboard from '../../bhookbustermain/src/components/Admin/AdminDashboard';

import OffersPage from '../../bhookbustermain/src/components/Landing page/OffersPage';
import FoodPage from '../../bhookbustermain/src/components/Landing page/FoodPage';
import ResetPassword  from "../../bhookbustermain/src/components/common/ResetPassword";

import ViewRestaurant from "../../bhookbustermain/src/components/Restuarant/ViewRestaurant";
import ViewUser from "../../bhookbustermain/src/components/Admin/ViewUser";
import AdminLogin from '../../bhookbustermain/src/components/Admin/AdminLogin';
import AdminLogout from '../../bhookbustermain/src/components/Admin/AdminLogout';
import ResHome from '../../bhookbustermain/src/components/Restuarant/ResHome';
import ViewResParti from '../../bhookbustermain/src/components/Admin/ViewResParti';
import FirmCollections from '../../bhookbustermain/src/components/Restuarant/FirmCollections';


function App() {
  useEffect(() => {
    // Apply saved theme on app load
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    document.body.classList.add(savedTheme === 'dark' ? 'dark-theme' : 'light-theme');
  }, []);
  axios.defaults.baseURL = "http://localhost:3000";

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
  <Route path ='/rdashboard' element={<RDashboard />} />
  <Route path="/resetpassword/:token" element={<ResetPassword />} />
  <Route path="/home" element={<Home />} />
  <Route path='/aboutus' element={<AboutUs />} />
  <Route path="/viewoffer" element={<ViewOffer />} />
  <Route path='rlogin' element={<RLogin />} />
  <Route path='rsignup' element={<RSignup />} />
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

    <Route path='/user' element={<UserSidebar />}>
     
    </Route>
    <Route path='/restaurant' element={<RSidebar />}>
      <Route path='rlogin' element={<RLogin />} />
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
      {/* <Route path='alogin' element={<ALogin />} /> */}
      <Route path='asignup' element={<UserSignup />} />
        <Route path ='viewrestaurant' element={<ViewRestaurant />} />
    {/* </Route> */}
        </Routes>
      </div>
    </div>
  );
}

export default App;

// all changes made 
