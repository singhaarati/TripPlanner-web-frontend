import React, { useState } from 'react';
import { Container, Dropdown, Form, Nav, Navbar } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../utils/authContext';

import logo from '../assets/logo.png';

export default function TopBar() {
  const auth = useAuth();
  const [isLogoHovered, setIsLogoHovered] = useState(false);


  const handleLogout = () => {
    window.location.href = '/';
  };

  const logoStyles = {
    width: '50px',
    height: 'auto',
    border: '2px solid #fff',
    borderRadius: '50%',
    filter: isLogoHovered && !auth.username ? 'grayscale(0%)' : 'grayscale(50%)',
    transition: 'filter 0.3s ease',
  };


  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-3">
      <Container>

        <Navbar.Brand as={Link} to="/">
          <img
            src={logo}
            alt="Your Logo"
            height="30"
            className="d-inline-block align-top"
            style={logoStyles}
            onMouseEnter={() => setIsLogoHovered(true)}
            onMouseLeave={() => setIsLogoHovered(false)}
          />
        </Navbar.Brand>


        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link as={Link} to="/trips">My Trips</Nav.Link> */}
            <Nav.Link as={NavLink} exact to="/">Home</Nav.Link>
            <Nav.Link as={NavLink} to="/aboutus">About Us</Nav.Link>
            <Nav.Link as={NavLink} to="/MyBookings">My Bookings</Nav.Link>
            <Nav.Link as={NavLink} to="/AddDestination">Add Destination</Nav.Link>
          </Nav>

          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
          </Form>

          {/* {auth.username ? (
            <Navbar.Text className="ms-3">Welcome, {auth.username}</Navbar.Text>
          ) : (
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
          )} */}

          <Dropdown>
            <Dropdown.Toggle data-testid="dropdown-toggle" variant="success" id="dropdown-basic">
              {auth && auth.username ? `Welcome, ${auth.username}` : 'Welcome'}
            </Dropdown.Toggle>

            <Dropdown.Menu data-testid="dropdown-menu">
              {auth && auth.username ? (
                <Dropdown.Item onClick={handleLogout} >Logout</Dropdown.Item>
              ) : (
                <>
                  <Dropdown.Item as={Link} to="/login">Login</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/signup">Signup</Dropdown.Item>
                </>
              )}
            </Dropdown.Menu>
          </Dropdown>



        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

