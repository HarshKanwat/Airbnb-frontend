import React from 'react';
import './Homepage.css'; // Import custom CSS

const Homepage = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-5 homepage-title">
        Welcome to AirBnb Clone
      </h1>
      <div className="row">
        <div className="col-md-6">
          <h2 className="mb-4 section-title">Featured Properties</h2>
          <div className="card mb-4" style={cardStyle}>
            <img src="https://img.vistarooms.com/gallery/the-cincin-e25cd0.jpg" className="card-img-top" alt="Luxury Villa" />
            <div className="card-body">
              <h5 className="card-title property-title">Luxury Villa</h5>
              <p className="card-text property-description">
                A beautiful villa with stunning views.
              </p>
              <a href="https://www.stayvista.com/collections/luxury-vistas" className="btn btn-danger">
                View Details
              </a>
            </div>
          </div>
          <div className="card mb-4" style={cardStyle}>
            <img src="https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=600" className="card-img-top" alt="Cozy Apartment" />
            <div className="card-body">
              <h5 className="card-title property-title">Cozy Apartment</h5>
              <p className="card-text property-description">
                A cozy apartment in the city center.
              </p>
              <a href="https://www.makemytrip.com/hotels/cozy_apartment_in_jaipur-details-jaipur.html?srsltid=AfmBOorNmehHc_t71ElbImdFAKJ0FWNUtECoJvug0iiAV5PXnJKUM6CA" className="btn btn-danger">
                View Details
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h2 className="mb-4 section-title">Famous Tourist Destinations</h2>
          <div className="card mb-4" style={cardStyle}>
            <img src="https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg?auto=compress&cs=tinysrgb&w=600" className="card-img-top" alt="Taj Mahal" />
            <div className="card-body">
              <h5 className="card-title destination-title">Taj Mahal</h5>
              <p className="card-text destination-description">
                One of the Seven Wonders of the World, located in Agra.
              </p>
              <a href="https://www.tajmahal.gov.in/" className="btn btn-info">
                Learn More
              </a>
            </div>
          </div>
          <div className="card mb-4" style={cardStyle}>
            <img src="https://images.pexels.com/photos/4430309/pexels-photo-4430309.jpeg?auto=compress&cs=tinysrgb&w=600" className="card-img-top" alt="Goa" />
            <div className="card-body">
              <h5 className="card-title destination-title">Goa</h5>
              <p className="card-text destination-description">
                Famous for its beautiful beaches and vibrant nightlife.
              </p>
              <a href="https://goa.gov.in/" className="btn btn-info">
                Learn More
              </a>
            </div>
          </div>
        </div>
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

export default Homepage;
