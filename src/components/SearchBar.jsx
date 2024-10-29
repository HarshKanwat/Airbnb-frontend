import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import axiosInstance from '../../utils/axiosInstance'; // Ensure the correct path
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/SearchBar.css'; // Import custom CSS

const SearchBar = ({ onSearch }) => {
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [guests, setGuests] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.get('/properties/search', {
        params: { location, startDate, endDate, guests },
      });
      onSearch(response.data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={10}>
          <div className="search-bar">
            <Form className="d-flex justify-content-between" onSubmit={handleSearch}>
              <Form.Group controlId="formLocation" className="me-2 flex-grow-1">
                <Form.Control
                  type="text"
                  placeholder="Where"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formCheckIn" className="me-2">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  placeholderText="Check in"
                  className="form-control"
                />
              </Form.Group>
              <Form.Group controlId="formCheckOut" className="me-2">
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  placeholderText="Check out"
                  className="form-control"
                />
              </Form.Group>
              <Form.Group controlId="formGuests" className="me-2">
                <Form.Control
                  type="text"
                  placeholder="Guests"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                />
              </Form.Group>
              <Button type="submit" variant="danger">
                GO
                <i className="fa fa-search" />
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SearchBar;
