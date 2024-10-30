import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import PropertyList from './components/PropertyList';
import PropertyDetails from './components/PropertyDetails';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import UserProfile from './pages/UserProfile';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import Footer from './components/Footer';
import UserBookings from './pages/UserBooking'; // Import UserBookings
import UserReviews from './pages/UserReview';   // Import UserReviews
import HostManagement from './components/HostManagement'; // Import HostManagement

const App = () => {
  const location = useLocation();
  const hideSearchBarPaths = ['/login', '/register'];

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/stays" element={<UserBookings />} />         {/* Stays Page */}
          <Route path="/experiences" element={<UserReviews />} />    {/* Experiences Page */}
          <Route path="/host-management" element={<HostManagement />} /> {/* Host Management Page */}
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
