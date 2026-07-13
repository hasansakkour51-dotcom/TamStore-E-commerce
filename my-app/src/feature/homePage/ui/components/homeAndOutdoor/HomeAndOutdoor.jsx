import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "./HomeAndOutdoor.css";

import HomeAndOutdoorCard from "./components/HomeAndOutdoorCard";
import { fetchHomeAndOutdoorProducts } from "./data/fetchHomeAndOutdoorProducts";

const HomeAndOutdoor = ({ img, title, category }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchHomeAndOutdoorProducts(category);
      setProducts(data);
    };
    loadProducts();
  }, [category]);

  return (
    <section className="homeOutdoor-section">
      <Container fluid>
        <Row className="align-items-center">
          {/* LEFT BANNER */}
          <Col lg={3} md={12} className="p-0">
            <div
              className="homeOutdoor-banner"
              style={{ backgroundImage: `url(${img})` }}
            >
              <div className="banner-overlay"></div>
              <div className="banner-content">
                <h3 className="banner-title">{title}</h3>
                <Link to="" className="banner-btn">
                  Source Now
                </Link>
              </div>
            </div>
          </Col>

          {/* PRODUCTS SLIDER */}
          <Col lg={9} md={12} className="p-0">
            <Swiper
              modules={[Grid, Pagination]}
              spaceBetween={20}
              pagination={{ clickable: true }}
              breakpoints={{
                320: { slidesPerView: 2, grid: { rows: 2 } },
                768: { slidesPerView: 3, grid: { rows: 2 } },
                1024: { slidesPerView: 4, grid: { rows: 2 } },
              }}
              className="homeOutdoor-swiper"
            >
              {products.length === 0
                ? [...Array(12)].map((_, i) => (
                    <SwiperSlide key={i}>
                      <HomeAndOutdoorCard loading={true} />
                    </SwiperSlide>
                  ))
                : products.map((item, index) => (
                    <SwiperSlide key={index}>
                      <HomeAndOutdoorCard item={item} loading={false} />
                    </SwiperSlide>
                  ))}
            </Swiper>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HomeAndOutdoor;
