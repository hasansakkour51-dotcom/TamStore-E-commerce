import React, { useState } from "react";
import "./DealsAndOffersCard.css";
import useCartStore from "../../../../../../cart/data/cartStore";
import ProductModal from "../../../../../../products/ui/components/ProductModal/ProductModal";

const DealsAndOffersCard = ({ product }) => {
  const addToCart = useCartStore((state) => state.addToCart);

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* الكارد كامل يفتح المودال */}
      <div
        className="DealsAndOffersCard d-flex flex-column align-items-center"
        onClick={() => setShowModal(true)}
        style={{ cursor: "pointer" }}
      >
        {/* صورة المنتج */}
        <div className="productImgBox">
          <img src={product.thumbnail} alt={product.title} />
        </div>

        {/* عنوان المنتج */}
        <p className="productTitle mt-2">{product.title}</p>

        {/* الخصم */}
        <span className="productDiscount">
          -{Math.round(product.discountPercentage)}%
        </span>

        {/* زر إضافة للسلة */}
        <button
          className="addToCartBtn"
          onClick={(e) => {
            e.stopPropagation(); // يمنع فتح المودال
            addToCart(product);
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
        item={product}
      />
    </>
  );
};

export default DealsAndOffersCard;
