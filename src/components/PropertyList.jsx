import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import '../styles/PropertyList.css'; // Ensure to style appropriately

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axiosInstance.get('/properties');
        setProperties(response.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
        setError('Failed to load properties. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="property-list">
      {properties.map(property => (
        <div key={property._id} className="property-card">
          <img src={property.images[0]} alt={property.name} className="property-image" />
          <div className="property-info">
            <h3>{property.name}</h3>
            <p>{property.description}</p>
            <p><strong>${property.price}</strong> per night</p>
            <Link to={`/property/${property._id}`} className="btn btn-primary">View Details</Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PropertyList;
