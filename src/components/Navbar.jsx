import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './style/NavbarComponent.css'; // Import custom CSS

const NavbarComponent = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <Navbar bg="light" expand="lg" className="navbar-custom">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src="https://w7.pngwing.com/pngs/196/980/png-transparent-airbnb-logo-coupon-privately-held-company-airbnb-logo-text-trademark-service-thumbnail.png"
            alt="airbnb"
            style={{ width: '40px', height: '40px' }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/stays">Stays</Nav.Link>
            <Nav.Link as={Link} to="/experiences">Experiences</Nav.Link>
            <Nav.Link as={Link} to="https://www.airbnb.co.in/host/experiences?from_nav=1">Become a Host</Nav.Link>
            <Dropdown align="end">
              <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
                <i className="fa fa-user-circle" />
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu-custom">
                {isLoggedIn ? (
                  <>
                    <Dropdown.Item as={Link} to="/profile">Profile</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item as="button" onClick={handleLogout}>Logout</Dropdown.Item>
                  </>
                ) : (
                  <>
                    <Dropdown.Item as={Link} to="/register">Register</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/login">Login</Dropdown.Item>
                  </>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
