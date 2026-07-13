import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import "./RecommendedItems.css";
import { fetchRecommendedItems } from "./data/fetchRecommendedItems";
import RecommendedItemsCard from "./components/RecommendedItemsCard";
import { Link } from "react-router-dom";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const RecommendedItems = () => {
  const [products, setProducts] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchRecommendedItems();
      setProducts(data);
      setLoading(false);
    };
    getProducts();
  }, []);

  const visibleProducts = showAll ? products : products.slice(0, 12);

  return (
    <section className="recommendedSection">
      <Container>
        <h3 className="recommendedTitle">Recommended Items</h3>

        {loading ? (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={15}
            slidesPerView={2}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            breakpoints={{
              576: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              992: { slidesPerView: 4 },
              1200: { slidesPerView: 6 },
            }}
          >
            {[...Array(12)].map((_, index) => (
              <SwiperSlide key={index}>
                <RecommendedItemsCard loading={true} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <Swiper
            modules={[ Pagination, Autoplay]}
            spaceBetween={15}
            slidesPerView={2}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            breakpoints={{
              576: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              992: { slidesPerView: 4 },
              1200: { slidesPerView: 6 },
            }}
          >
            {visibleProducts.map((item, index) => (
              <SwiperSlide key={index}>
                <RecommendedItemsCard item={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {!showAll && !loading && (
          <div className="viewMoreWrapper">
            <Link to="/products" className="viewMoreBtn">
              View More
            </Link>
          </div>
        )}
      </Container>
    </section>
  );
};

export default RecommendedItems;
