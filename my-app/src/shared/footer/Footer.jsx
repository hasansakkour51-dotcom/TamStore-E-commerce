import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footerSection">
      <Container>
        <Row>
          {/* LEFT SIDE */}
          <Col lg={3} md={6} sm={12} className="footerCol">
            <h3 className="footerLogo">TamStore</h3>
            <p className="footerDesc">
              Best information about the company goes here but now lorem ipsum is.
            </p>
            <div className="socialIcons">
              <a href="#"><FaFacebookF /></a>
              <a href="#"><FaTwitter /></a>
              <a href="#"><FaLinkedinIn /></a>
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaYoutube /></a>
            </div>
          </Col>

          {/* ABOUT */}
          <Col lg={2} md={6} sm={6} className="footerCol">
            <h5>About</h5>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Find Store</a></li>
              <li><a href="#">Categories</a></li>
              <li><a href="#">Blogs</a></li>
            </ul>
          </Col>

          {/* PARTNERSHIP */}
          <Col lg={2} md={6} sm={6} className="footerCol">
            <h5>Partnership</h5>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Find Store</a></li>
              <li><a href="#">Categories</a></li>
              <li><a href="#">Blogs</a></li>
            </ul>
          </Col>

          {/* INFORMATION */}
          <Col lg={2} md={6} sm={6} className="footerCol">
            <h5>Information</h5>
            <ul>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Money Refund</a></li>
              <li><a href="#">Shipping</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </Col>

          {/* FOR USERS */}
          <Col lg={2} md={6} sm={6} className="footerCol">
            <h5>For Users</h5>
            <ul>
              <li><a href="#">Login</a></li>
              <li><a href="#">Register</a></li>
              <li><a href="#">Settings</a></li>
              <li><a href="#">My Orders</a></li>
            </ul>
          </Col>

          {/* GET APP */}
          <Col lg={3} md={6} sm={12} className="footerCol">
            <h5>Get App</h5>
            <div className="appButtons d-flex align-items-center gap-2">
              <a href="#" className="appBtn"> App Store</a>
              <a href="#" className="appBtn">▶ Google Play</a>
            </div>
          </Col>
        </Row>

        {/* BOTTOM */}
        <Row className="footerBottom">
          <Col md={6}>
            <p>© 2023 Ecommerce.</p>
          </Col>
          <Col md={6} className="text-end">
            <span className="langSelect">🌐 English</span>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
