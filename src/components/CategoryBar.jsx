import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style/CategoryBar.css'; // Import the CSS file

const categories = [
  { name: 'Beach', icon: '🏖️' },
  { name: 'Cabins', icon: '🏕️' },
  { name: 'Tiny homes', icon: '🏠' },
  { name: 'Luxury', icon: '🏰' },
  { name: 'Camping', icon: '⛺' },
  { name: 'Lakefront', icon: '🌅' },
  { name: 'Countryside', icon: '🌄' },
  { name: 'Arctic', icon: '❄️' },
  { name: 'Urban', icon: '🏙️' },
  { name: 'Desert', icon: '🏜️' },
  { name: 'Mountain', icon: '🏔️' },
  { name: 'Historical', icon: '🏛️' },
  { name: 'Forest', icon: '🌲' },
  { name: 'Island', icon: '🏝️' },
  { name: 'Waterfalls', icon: '🌊' },
  { name: 'Vineyards', icon: '🍇' },
  { name: 'Caves', icon: '🕳️' },
  { name: 'Riverside', icon: '🏞️' },
  { name: 'Jungle', icon: '🌴' },
  { name: 'Savannah', icon: '🌾' },
];

const CategoryBar = ({ onCategorySelect }) => {
  return (
    <div className="category-bar d-flex overflow-auto p-3 bg-white shadow-sm sticky-top">
      {categories.map((category) => (
        <button
          key={category.name}
          className="btn btn-light d-flex flex-column align-items-center mx-2 category-icon"
          onClick={() => onCategorySelect(category.name)}
          aria-label={`Select category: ${category.name}`}
        >
          <span className="icon">{category.icon}</span>
          <span className="category-name">{category.name}</span>
        </button>
      ))}
    </div>
  );
};

// Corrected propTypes
CategoryBar.propTypes = {
  onCategorySelect: PropTypes.func.isRequired,
};

export default CategoryBar;
