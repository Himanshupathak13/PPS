//import React from 'react';
//import { Link } from 'react-router-dom';
import {Container , Row, Col} from 'react-bootstrap'  

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


function Header () {
    return(
     <div>
        
    <Navbar collapseOnSelect Fixed ="top" bg="light" expand="sm" variant="light">
      <Container>
        <Navbar.Brand href="#home">PPS</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/Login">Login</Nav.Link>
            <Nav.Link href="/Register">Register</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  );
}

export default Header;