// src/components/HostManagement.js
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import '../styles/HostManagement.css'; // Import custom CSS

const HostManagement = () => {
  const [properties, setProperties] = useState([]);
  const [newProperty, setNewProperty] = useState({ title: '', description: '', price: '', image: null });
  const [loading, setLoading] = useState(false);

  // Fetch user-specific properties on component mount
  useEffect(() => {
    const fetchUserProperties = async () => {
      try {
        const response = await axiosInstance.get('/properties/user'); // Fetch properties owned by the user
        setProperties(response.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchUserProperties();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProperty({ ...newProperty, [name]: value });
  };

  const handleImageChange = (e) => {
    setNewProperty({ ...newProperty, image: e.target.files[0] });
  };

  const handleAddProperty = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('title', newProperty.title);
    formData.append('description', newProperty.description);
    formData.append('price', newProperty.price);
    formData.append('image', newProperty.image); // Append the image file

    try {
      const response = await axiosInstance.post('/properties', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Specify the content type
        },
      }); // POST request to create a property
      setProperties([...properties, response.data]); // Add the new property to the list
      setNewProperty({ title: '', description: '', price: '', image: null }); // Reset form fields
    } catch (error) {
      console.error('Error adding property:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProperty = async (propertyId) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      try {
        await axiosInstance.delete(`/properties/${propertyId}`); // DELETE request to remove the property
        // Update the properties state by filtering out the deleted property
        setProperties(properties.filter(property => property._id !== propertyId));
      } catch (error) {
        console.error('Error deleting property:', error);
      }
    }
  };

  return (
    <div className="host-management">
      <h2>Manage Your Properties</h2>
      <form onSubmit={handleAddProperty}>
        <input
          type="text"
          name="title"
          value={newProperty.title}
          onChange={handleInputChange}
          placeholder="Title"
          required
        />
        <textarea
          name="description"
          value={newProperty.description}
          onChange={handleInputChange}
          placeholder="Description"
          required
        />
        <input
          type="number"
          name="price"
          value={newProperty.price}
          onChange={handleInputChange}
          placeholder="Price"
          required
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Property'}
        </button>
      </form>
      <h3>Your Properties</h3>
      <ul>
        {properties.length > 0 ? (
          properties.map((property) => (
            <li key={property._id}>
              <h4>{property.title}</h4>
              <p>{property.description}</p>
              <p>Price: ${property.price}</p>
              {property.image && <img src={property.image} alt={property.title} style={{ width: '100px', height: '100px' }} />} {/* Display image */}
              <button onClick={() => handleDeleteProperty(property._id)}>Delete Property</button>
            </li>
          ))
        ) : (
          <p>No properties added yet.</p>
        )}
      </ul>
    </div>
  );
};

export default HostManagement;
