import React, { useState, useContext } from "react";
import { FaCartPlus, FaHeart, FaBalanceScale, FaEye } from "react-icons/fa";
import "./ProductCard.css";
import ProductModal from "../ProductModal/ProductModal";
import { WishlistContext } from "../../../../../contextWishlist/WishlistContext";
import { toast } from "react-toastify";

const ProductCard = ({ item, loading }) => {
  const [showModal, setShowModal] = useState(false);
  const { addToWishlist } = useContext(WishlistContext);

  if (loading) {
    return (
      <div className="ProductCard skeleton d-flex flex-column">
        <div className="skeleton-box" />
        <div className="skeleton-line short" />
        <div className="skeleton-line long" />
      </div>
    );
  }

  const handleWishlist = () => {
    addToWishlist(item);
    toast.success(`${item.title} added to Wishlist ❤️`, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  return (
    <>
      <div className="ProductCard">
        <div className="cardTop">
          <span className="discountBadge">-{item.discountPercentage}%</span>
          <span className="ratingStars">
            {"★".repeat(Math.round(item.rating))}
            {"☆".repeat(5 - Math.round(item.rating))}
          </span>
        </div>
        <img
          src={item.thumbnail}
          alt={item.title}
          className="cardImg"
          onClick={() => setShowModal(true)}
        />
        <p className="productTitle">{item.title}</p>
        <span className="productPrice">${item.price}</span>

        <div className="cardActions">
          <button className="addToCartBtn">
            <FaCartPlus /> Add to cart
          </button>
          <button className="wishlistBtn" onClick={handleWishlist}>
            <FaHeart /> Wishlist
          </button>
          <button className="compareBtn">
            <FaBalanceScale /> Compare
          </button>
          <button className="quickViewBtn" onClick={() => setShowModal(true)}>
            <FaEye /> Quick View
          </button>
        </div>
      </div>

      <ProductModal
        show={showModal}
        onHide={() => setShowModal(false)}
        item={item}
      />
    </>
  );
};

export default ProductCard;
