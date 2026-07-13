import React, { useState } from "react";
import "./HomeAndOutdoorCard.css";
import useCartStore from "../../../../../cart/data/cartStore";
import ProductModal from "../../../../../products/ui/components/ProductModal/ProductModal";

const HomeAndOutdoorCard = ({ item, loading }) => {
  const addToCart = useCartStore((state) => state.addToCart);

  const [showModal, setShowModal] = useState(false);

  if (loading) {
    return (
      <div className="HomeAndOutdoorCard skeletonCard">
        <div className="skeleton skeleton-img"></div>
        <div className="skeleton skeleton-title"></div>
        <div className="skeleton skeleton-price"></div>
        <div className="skeleton skeleton-btn"></div>
      </div>
    );
  }

  return (
    <>
      {/* الكارد كامل يفتح المودال */}
      <div
        className="HomeAndOutdoorCard"
        onClick={() => setShowModal(true)}
        style={{ cursor: "pointer" }}
      >
        {/* صورة المنتج */}
        <img src={item.thumbnail} alt={item.title} />

        {/* عنوان المنتج */}
        <p className="homeCardTitle">{item.title}</p>

        {/* السعر */}
        <span className="homeCardPrice">From USD {item.price}</span>

        {/* زر إضافة للسلة */}
        <button
          className="addToCartBtn"
          onClick={(e) => {
            e.stopPropagation(); // يمنع فتح المودال
            addToCart(item);
          }}
        >
          <i className="fa-solid fa-cart-shopping"></i>
          Add to cart
        </button>
      </div>

      {/* مودال التفاصيل */}
      <ProductModal
        show={showModal}
        onHide={() => setShowModal(false)}
        item={item}
      />
    </>
  );
};

export default HomeAndOutdoorCard;
