import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/SearchBar.css'; // Import custom CSS

const SearchBar = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={10}>
          <div className="search-bar">
            <Form className="d-flex justify-content-between">
              <Form.Group controlId="formLocation" className="me-2 flex-grow-1">
                <Form.Control type="text" placeholder="Where" />
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
                <Form.Control type="text" placeholder="Guests" />
              </Form.Group>
              <Button variant="danger">
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
