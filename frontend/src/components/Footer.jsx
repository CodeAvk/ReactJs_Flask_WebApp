import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-4">
      <Container fluid className="py-3">
        <Row>
          <Col md={6} className="text-center text-md-left">
            <p>
              &copy; {new Date().getFullYear()} YourBrand. All rights reserved.
            </p>
          </Col>
          <Col md={6} className="text-center text-md-right">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white mx-2"
            >
              <FaFacebook />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white mx-2"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white mx-2"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white mx-2"
            >
              <FaLinkedin />
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
