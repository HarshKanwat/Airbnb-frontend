import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PropertyList from './components/PropertyList';
import PropertyDetails from './components/PropertyDetails';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import UserProfile from './pages/UserProfile';
import SearchBar from './components/SearchBar';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import Footer from './components/Footer';
import CategoryIcons from './components/CategoryIcons'; // Ensure correct import

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <div className="container mt-4">
          <CategoryIcons /> {/* Use as a component */}
          <SearchBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/property/:id" element={<PropertyDetails />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/footer" element={<Footer />} />
            <Route path="/categoryIcons" element={<CategoryIcons />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
