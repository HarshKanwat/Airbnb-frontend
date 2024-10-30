// src/components/HostManagement.js
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import '../styles/HostManagement.css'; // Import custom CSS

const HostManagement = () => {
  const [properties, setProperties] = useState([]);
  const [newProperty, setNewProperty] = useState({ title: '', description: '', price: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axiosInstance.get('/properties');
        setProperties(response.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchProperties();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProperty({ ...newProperty, [name]: value });
  };

  const handleAddProperty = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axiosInstance.post('/properties', newProperty);
      setNewProperty({ title: '', description: '', price: '' });
      // Refresh property list
      const response = await axiosInstance.get('/properties');
      setProperties(response.data);
    } catch (error) {
      console.error('Error adding property:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="host-management">
      <h2>Manage Your Properties</h2>
      <form onSubmit={handleAddProperty}>
        <input type="text" name="title" value={newProperty.title} onChange={handleInputChange} placeholder="Title" required />
        <textarea name="description" value={newProperty.description} onChange={handleInputChange} placeholder="Description" required />
        <input type="number" name="price" value={newProperty.price} onChange={handleInputChange} placeholder="Price" required />
        <button type="submit" disabled={loading}>{loading ? 'Adding...' : 'Add Property'}</button>
      </form>
      <h3>Your Properties</h3>
      <ul>
        {properties.map((property) => (
          <li key={property.id}>
            <h4>{property.title}</h4>
            <p>{property.description}</p>
            <p>Price: ${property.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HostManagement;
