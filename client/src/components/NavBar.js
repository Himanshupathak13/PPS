import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom'
import NavDropdown from 'react-bootstrap/NavDropdown';


const NavBar = () => {
  const auth = localStorage.getItem('new');
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate('/')
  }
  return (
    <div>
      <Navbar collapseOnSelect fixed='top' bg="light" expand="sm" variant='light' >
        <Container>
          <Navbar.Brand href="#home">PPS</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {
                auth ?
                  <>
                    <Nav.Link className="btn btn-warning m-1 p-2" href="/Profile">Profile</Nav.Link>
                    <Nav.Link className="btn btn-warning m-1 p-2" href="/Dashboard">Dashboard</Nav.Link>
                    <Nav.Link className="btn btn-warning m-1 p-2" onClick={logout} to="/">Logout</Nav.Link>
                  </>
                  : <>
                    <Nav.Link className="btn btn-warning m-1 p-2" href="/">Home</Nav.Link>
                    <Nav.Link className="btn btn-warning m-1 p-2" href="/Register">Register</Nav.Link>
                    <NavDropdown title="Login" id="basic-nav-dropdown">
                      <NavDropdown.Item href="/Login">User</NavDropdown.Item>
                      <NavDropdown.Item href="/LoginAdmin">Admin</NavDropdown.Item>
                    </NavDropdown>
                  </>
              }
            </Nav>
          </Navbar.Collapse> 
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBar;
