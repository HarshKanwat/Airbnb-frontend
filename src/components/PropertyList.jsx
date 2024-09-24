import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('/api/properties'); // Adjust URL as needed
        setProperties(response.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchProperties();
  }, []);
  return (
    <div>
      <h2>Property Listings</h2>
      <div className="row">
        {Array.isArray(properties) && properties.map((property) => (
          <div key={property._id} className="col-md-4">
            <div className="card mb-4">
              <img src={property.imageUrl} className="card-img-top" alt={property.title} />
              <div className="card-body">
                <h5 className="card-title">{property.title}</h5>
                <p className="card-text">${property.price} per night</p>
                <Link to={`/property/${property._id}`} className="btn btn-primary">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )};  
export default PropertyList;
