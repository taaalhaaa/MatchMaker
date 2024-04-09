import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from './logo.png';
import './style.css';

function Header() {
  return (
    <>
      <Navbar variant="dark" expand="lg" className="custom-navbar">
        <Container>
          <Navbar.Brand>
            <img
              src={logo}
              width="350"
              height="80"
              className="logo"
              alt="Logo"
            />
          </Navbar.Brand>
          
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#features">About Us</Nav.Link>
              <Nav.Link href="#pricing">Price</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="header-line"></div>
    </>
  );
}

export default Header;
