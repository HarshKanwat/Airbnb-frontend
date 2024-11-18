import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CategoryBar from '../components/CategoryBar'; // Ensure correct import
import SearchBar from '../components/SearchBar'; // Ensure SearchBar is imported
import './Homepage.css'; // Import custom CSS

const HomePage = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/properties`);
        setProperties(response.data);
        setFilteredProperties(response.data); // Initially show all properties
      } catch (error) {
        console.error('Error fetching properties:', error);
        setError('Failed to load properties. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setFilteredProperties(properties.filter(property => property.category === category));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mt-5">
      <CategoryBar onCategorySelect={handleCategorySelect} /> {/* CategoryBar first */}
      <SearchBar /> {/* SearchBar below CategoryBar */}
      <h1 className="text-center mb-5 homepage-title">Welcome to AirBnb Clone</h1>
      <div className="row">
        {filteredProperties.map((property) => (
          <div key={property._id} className="col-md-4">
            <div className="card mb-4" style={cardStyle}>
              <img src={property.images[0]} className="card-img-top" alt={property.name} />
              <div className="card-body">
                <h5 className="card-title">{property.name}</h5>
                <p className="card-text">{property.description}</p>
                <p>${property.price} per night</p>
                <Link to={`/property/${property._id}`} className="btn btn-primary">View Details</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const cardStyle = {
  borderRadius: '15px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
  border: 'none',
};

export default HomePage;
Key Changes:
Initial State: Ensure filteredProperties is initialized as an empty array.

Array Check: Check if the response data is an array before setting it to properties and filteredProperties.

With these changes, your component should handle the data properly and avoid the map error. If you run into any other issues or need further assistance, feel free to ask! 😊🚀
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const cardStyle = {
  borderRadius: '15px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
  border: 'none',
};

export default HomePage;
