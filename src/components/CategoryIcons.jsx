import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTree, faBuilding, faHome,  faMountain, faSwimmingPool } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const categories = [ 
  { name: 'Apartments', icon: faBuilding},
  { name: 'Homes', icon: faHome },
  { name: 'Mountains', icon: faMountain },
  { name: 'Pools', icon: faSwimmingPool },
];

const CategoryIcons = () => {
  return (
    <Container className="my-4">
      <Row className="text-center">
        {categories.map((category, index) => (
          <Col key={index} md={2}>
            <div className="category-icon">
              <FontAwesomeIcon icon={category.icon}  />
              <p className="mt-2">{category.name}</p>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CategoryIcons;
