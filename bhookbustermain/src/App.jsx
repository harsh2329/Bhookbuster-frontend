import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Usersidebar from './components/user/UserSidebar';
import UserSignup from './components/common/UserSignup';
import UserLogin from './components/common/UserLogin';
import Rsidebar from './components/Restuarant/Rsidebar';
import Adminsidebar from './components/Admin/Adminsidebar';
import './assets/css/adminlte.css';
import './assets/css/adminlte.min.css';
import Rlogin from './components/Restuarant/Rlogin';
import Alogin from './components/Admin/Alogin';
import axios from 'axios';
import './app.css';
import { useEffect } from 'react';
import LandingPage from './components/Landing page/LandingPage';
import PrivateRoutes from "./hooks/PrivateRoutes";
import LocationForm from "./components/Restuarant/LocationForm";

function App() {
  useEffect(() => {
    // Apply saved theme on app load
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    document.body.classList.add(savedTheme === 'dark' ? 'dark-theme' : 'light-theme');
  }, []);
  axios.defaults.baseURL = "http://localhost:3000";
  return ( 
    <div className="layout-fixed sidebar-expand-lg bg-body-tertiary app-loaded">
      <div className="app-wrapper">
        <Routes>
        <Route path='/login' element={<UserLogin />} />
        <Route path='/signup' element={<UserSignup />} />
        <Route path='/' element={<LandingPage />} />
        
        <Route path="" element={<PrivateRoutes />}>
          <Route path='/user' element={<Usersidebar />}>
          <Route path='locationform' element={<LocationForm />} />
           
          </Route>
          <Route path='/restaurant' element={<Rsidebar />}>
            <Route path='rlogin' element={<Rlogin />} />
            <Route path='rsignup' element={<UserSignup />} />
           
          </Route>
          <Route path='/admin' element={<Adminsidebar />}>
            <Route path='alogin' element={<Alogin />} />
            <Route path='asignup' element={<UserSignup />} />
          </Route>
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
