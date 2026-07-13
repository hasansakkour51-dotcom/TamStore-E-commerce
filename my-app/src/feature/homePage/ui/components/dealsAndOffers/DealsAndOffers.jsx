import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaTags } from "react-icons/fa";

import "./dealsAndOffers.css";
import DealsAndOffersCard from "./components/DealsAndOffersCard/DealsAndOffersCard";
import { fetchDealsProducts } from "./data/fetchDeals";

const DealsAndOffers = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchDealsProducts();
      setProducts(data);
    };
    loadProducts();
  }, []);

  return (
    <section className="dealsAndOffers">
      <Container fluid>
        <Row className="align-items-center">
          {/* LEFT SIDE INFO */}
          <Col lg={3} md={12} className="mb-3 mb-lg-0">
            <div className="dealsInfo">
              <h3 className="dealsTitle">
                <FaTags className="me-2" /> Deals & Offers
              </h3>
              <p className="dealsCategory">Hygiene Equipments</p>

              <div className="timer">
                {[
                  { label: "Days", value: "04" },
                  { label: "Hours", value: "13" },
                  { label: "Min", value: "34" },
                  { label: "Sec", value: "56" },
                ].map((t, i) => (
                  <div key={i} className="timerBox">
                    <span className="timeNumber">{t.value}</span>
                    <span className="timeLabel">{t.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </Col>

          {/* RIGHT SIDE PRODUCTS */}
          <Col lg={9} md={12}>
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={20}
              pagination={{ clickable: true }}
              breakpoints={{
                320: { slidesPerView: 1 },
                480: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
              }}
              className="dealsSwiper"
            >
              {products.map((product, index) => (
                <SwiperSlide key={index}>
                  <DealsAndOffersCard product={product} />
                </SwiperSlide>
              ))}
            </Swiper>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default DealsAndOffers;
