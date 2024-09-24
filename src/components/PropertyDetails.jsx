import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles/PropertyDetails.css'; // Updated import path

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`/api/properties/${id}`);
        setProperty(response.data);
      } catch (error) {
        console.error('Error fetching property details:', error);
        setError('Failed to load property details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="property-details">
      <h1>{property.title}</h1>
      <img src={property.imageUrl} alt={property.title} className="property-image" />
      <p>{property.description}</p>
      <p><strong>${property.price} per night</strong></p>
      <button className="btn btn-primary">Book Now</button>
    </div>
  );
};

export default PropertyDetails;
