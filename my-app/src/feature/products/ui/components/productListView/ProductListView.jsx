import React, { useState, useContext } from "react";
import { FaCartPlus, FaHeart, FaBalanceScale, FaEye } from "react-icons/fa";
import "./ProductListView.css";
import ProductModal from "../ProductModal/ProductModal";
import { WishlistContext } from "../../../../../contextWishlist/WishlistContext";
import { toast } from "react-toastify"; // ✅ استدعاء Toastify

const ProductListView = ({ item, loading }) => {
  const [showModal, setShowModal] = useState(false);
  const { addToWishlist } = useContext(WishlistContext);

  if (loading) {
    return (
      <div className="ProductListView skeleton">
        <div className="skeleton-img" />
        <div className="skeleton-line long" />
        <div className="skeleton-line short" />
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
      <div className="ProductListView">
        <div className="listImgWrapper" onClick={() => setShowModal(true)}>
          <img src={item.thumbnail} alt={item.title} className="listImg" />
          <span className="discountBadge">-{item.discountPercentage}%</span>
        </div>
        <div className="listContent">
          <h5 className="listTitle">{item.title}</h5>
          <p className="listPrice">${item.price}</p>
          <p className="listRating">
            {"★".repeat(Math.round(item.rating))}
            {"☆".repeat(5 - Math.round(item.rating))}
          </p>
          <p className="listShipping">Free Shipping</p>

          <div className="listActions">
            <button className="addToCartBtn"><FaCartPlus /> Add to cart</button>
            <button className="wishlistBtn" onClick={handleWishlist}>
              <FaHeart /> Wishlist
            </button>
            <button className="compareBtn"><FaBalanceScale /> Compare</button>
            <button className="quickViewBtn" onClick={() => setShowModal(true)}>
              <FaEye /> Quick View
            </button>
          </div>
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

export default ProductListView;
