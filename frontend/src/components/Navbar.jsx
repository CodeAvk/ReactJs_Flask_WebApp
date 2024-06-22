import React from "react";
import { Navbar, Nav, Container, Image, Button } from "react-bootstrap";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaSignOutAlt,
} from "react-icons/fa";

const AppNavbar = ({ isLoggedIn, onLogout, userName, userPicture }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#">AvkReactApp</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            <Nav.Link href="https://facebook.com" target="_blank">
              <FaFacebook />
            </Nav.Link>
            <Nav.Link href="https://twitter.com" target="_blank">
              <FaTwitter />
            </Nav.Link>
            <Nav.Link href="https://instagram.com" target="_blank">
              <FaInstagram />
            </Nav.Link>
            <Nav.Link href="https://linkedin.com" target="_blank">
              <FaLinkedin />
            </Nav.Link>
            {isLoggedIn && (
              <Nav.Item className="d-flex align-items-center">
                <Image
                  src={userPicture}
                  alt="User"
                  roundedCircle
                  className="user-icon me-2"
                  width="32"
                  height="32"
                />
                <span className="text-light me-2">{userName}</span>
                <Button
                  variant="danger"
                  onClick={onLogout}
                  className="d-flex align-items-center"
                >
                  <FaSignOutAlt className="me-1" />
                  Logout
                </Button>
              </Nav.Item>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
