import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-light text-center text-lg-start mt-5">
      <Container className="p-4">
        <Row>
          <Col lg={6} className="mb-4 mb-lg-0">
            <h5 className="text-uppercase">About Us</h5>
            <p>
              This is a clone of the Airbnb website made for educational purposes.
            </p>
          </Col>
          <Col lg={6} className="mb-4 mb-lg-0">
            <h5 className="text-uppercase">Contact Us</h5>
            <p>Email: contact@airbnbclone.com</p>
            <p>Phone: +123 456 7890</p>
          </Col>
        </Row>
      </Container>
      <div className="text-center p-3 bg-dark text-white">
        &copy; 2024 Airbnb Clone. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
