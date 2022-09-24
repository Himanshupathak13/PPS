import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom'
import NavDropdown from 'react-bootstrap/NavDropdown';

const NavBar = () => {
  const auth = localStorage.getItem('new');
  const auth2 = localStorage.getItem('admin');
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
                    <Nav.Link className="btn btn-warning m-1 p-2" href="/UserProfile">Profile</Nav.Link>
                    <Nav.Link className="btn btn-warning m-1 p-2" href="/Upload">Upload</Nav.Link>
                    <Nav.Link className="btn btn-warning m-1 p-2" href="/UserDashboard">Dashboard</Nav.Link>
                    <Nav.Link className="btn btn-warning m-1 p-2" onClick={logout} to="/">Logout</Nav.Link>
                  </>
                  : auth2 ?
                    <>
                      <Nav.Link className="btn btn-warning m-1 p-2" href="/AdminProfile">Profile</Nav.Link>
                      <Nav.Link className="btn btn-warning m-1 p-2" href="/AdminDashboard">Dashboard</Nav.Link>
                      <Nav.Link className="btn btn-warning m-1 p-2" onClick={logout} to="/">Logout</Nav.Link>
                    </>
                    : <>
                      <Nav.Link className="btn btn-warning m-1 p-2 text-center" href="/">Home</Nav.Link>
                      <Nav.Link className="btn btn-warning m-1 p-2 text-center" href='/Register'>Register</Nav.Link>
                      <NavDropdown className="btn btn-warning p-0 m-1" title="Login" >
                        <NavDropdown.Item href="/UserLogin">User</NavDropdown.Item>
                        <NavDropdown.Item href="/AdminLogin">Admin</NavDropdown.Item>
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