import React, { useState, useContext } from "react";
import logo from "../../assets/Images/logo.png";
import { Col, Container, Row, Form, Button, Offcanvas } from "react-bootstrap";
import {
  BsPerson,
  BsChatLeftText,
  BsBagCheck,
  BsCart,
  BsSearch,
  BsMoon,
  BsSun,
} from "react-icons/bs";
import "./Header.css";
import { Link } from "react-router-dom";
import useCartStore from "../../feature/cart/data/cartStore";
import { ThemeContext } from "../../contextTheme/ThemeContext"; // ⭐ استدعاء الثيم

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const cartCount = useCartStore((state) =>
    state.cart.reduce((total, item) => total + item.quantity, 0)
  );

  // ⭐ الثيم
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="header">
      <Container>
        <Row className="align-items-center">
          {/* Logo */}
          <Col lg={2} md={4} sm={8}>
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
          </Col>

          {/* Search Bar (Desktop) */}
          <Col lg={6} className="d-none d-lg-block">
            <Row>
              <Col lg={7} className="px-0">
                <Form.Control type="text" placeholder="Search products..." />
              </Col>
              <Col lg={3} className="px-0">
                <Form.Select>
                  <option>All category</option>
                </Form.Select>
              </Col>
              <Col lg={2} className="px-0">
                <Button variant="primary" className="w-100">
                  Search
                </Button>
              </Col>
            </Row>
          </Col>

          {/* Navigation + Mobile Search Trigger */}
          <Col lg={4} md={8} sm={4}>
            <nav>
              <ul className="headerList d-flex align-items-center mb-0 gap-4 justify-content-end">
                <li>
                  <Link
                    to="/profile"
                    className="d-flex flex-column align-items-center gap-1"
                  >
                    <BsPerson size={22} /> Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/authForm"
                    className="d-flex flex-column align-items-center gap-1"
                  >
                    <BsChatLeftText size={22} /> Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products"
                    className="d-flex flex-column align-items-center gap-1"
                  >
                    <BsBagCheck size={22} /> Products
                  </Link>
                </li>
                <li className="cartIconWrapper">
                  <Link
                    to="/cart"
                    className="d-flex flex-column align-items-center gap-1 position-relative"
                  >
                    <BsCart size={22} /> My cart
                    {cartCount > 0 && (
                      <span className="cartBadge">{cartCount}</span>
                    )}
                  </Link>
                </li>

                {/* ⭐ زر تبديل الثيم */}
                <li>
                  <button className="themeToggleBtn" onClick={toggleTheme}>
                    {theme === "light" ? (
                      <BsMoon size={20} />
                    ) : (
                      <BsSun size={20} />
                    )}
                  </button>
                </li>

                {/* Mobile Search Icon */}
                <li className="d-lg-none">
                  <button
                    className="searchToggleBtn"
                    onClick={() => setShowSearch(true)}
                  >
                    <BsSearch size={22} />
                  </button>
                </li>
              </ul>
            </nav>
          </Col>
        </Row>
      </Container>

      {/* Offcanvas Search (Mobile) */}
      <Offcanvas
        show={showSearch}
        onHide={() => setShowSearch(false)}
        placement="top"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Search Products</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Row>
            <Col xs={7}>
              <Form.Control type="text" placeholder="Search products..." />
            </Col>
            <Col xs={3}>
              <Form.Select>
                <option>All category</option>
              </Form.Select>
            </Col>
            <Col xs={2}>
              <Button variant="primary" className="w-100">
                Search
              </Button>
            </Col>
          </Row>
        </Offcanvas.Body>
      </Offcanvas>
    </header>
  );
};

export default Header;
