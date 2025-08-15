import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/landing/HomePage';
import Login from './pages/auth/Login';
import DashboardRRH from './pages/rrh/DashboardRRH';
import DashboardEmployee from './pages/employee/DashboardEmployee';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/rrh/dashboard" element={<DashboardRRH />} />
        <Route path="/employee/dashboard" element={<DashboardEmployee />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;