import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { BsPersonFill } from "react-icons/bs";
import { categories } from "./data/categories";
import bannerImage from "../../../../../assets/Images/Banner.png";
import "./HeroSection.css";

const back = {
  backgroundImage: `url(${bannerImage})`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  width: "100%",
};

const HeroSection = () => {
  return (
    <section className="HeroSection p-2">
      <Container>
        <Row className="align-items-start">
          {/* Sidebar Categories */}
          <Col lg={3}>
            <aside className="sideBarCategories">
              <nav>
                <ul className="categoriesList d-flex flex-column gap-3">
                  {categories.map((cat, index) => (
                    <li key={index} className="categoryItem">
                      <NavLink
                        to={`/category/${cat.toLowerCase().replace(/ /g, "-")}`}
                        className={({ isActive }) =>
                          isActive ? "category-link active" : "category-link"
                        }
                      >
                        <span className="iconBullet">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            fill="#0d6efd"
                            viewBox="0 0 16 16"
                          >
                            <circle cx="8" cy="8" r="6" />
                          </svg>
                        </span>
                        {cat}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>
          </Col>

          {/* Main Banner */}
          <Col lg={7}>
            <section className="banner d-flex flex-column py-5 px-5" style={back}>
              <Col lg={6}>
                <h3>
                  Latest trending{" "}
                  <span className="d-flex mt-2">Electronic items</span>
                </h3>
              </Col>
              <Col lg={4}>
                <Link
                  to="/learn-more"
                  className="learnMore d-flex justify-content-center align-items-center mt-3"
                >
                  Learn More
                </Link>
              </Col>
            </section>
          </Col>

          {/* Right Side User Boxes */}
          <Col lg={2}>
            <section className="leftSideBanner d-flex flex-column gap-3">
              <div className="userBox d-flex flex-column gap-3">
                <h2 className="d-flex align-items-center gap-2">
                  <span className="icon-circle">
                    <BsPersonFill size={30} color="#FFFFFF" />
                  </span>
                  Hi, user let’s get started
                </h2>

                <Button 
                  className="join-btn"
                  style={{ 
                    background: "linear-gradient(135deg, #0d6efd, #004085)", 
                    border: "none" 
                  }}
                >
                  Join In
                </Button>
                <Button 
                  className="login-btn"
                  style={{ 
                    background: "linear-gradient(135deg, #0d6efd, #004085)", 
                    border: "none" 
                  }}
                >
                  Login
                </Button>
              </div>

              <div className="userInfo">
                <p className="boxText">Get US $10 off with a new supplier</p>
              </div>
              <div className="userPromo">
                <p className="boxText">Send quotes with supplier preferences</p>
              </div>
            </section>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HeroSection;
