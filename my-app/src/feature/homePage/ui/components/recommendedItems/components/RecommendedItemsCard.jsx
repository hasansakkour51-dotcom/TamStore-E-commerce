import React, { useContext, useState } from "react";
import "./RecommendedItemsCard.css";
import useCartStore from "../../../../../cart/data/cartStore";
import { WishlistContext } from "../../../../../../contextWishlist/WishlistContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ⭐ استدعاء مودال التفاصيل
import ProductModal from "../../../../../products/ui/components/ProductModal/ProductModal";

const RecommendedItemsCard = ({ item, loading }) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const { addToWishlist } = useContext(WishlistContext);

  // ⭐ State للتحكم بالمودال
  const [showModal, setShowModal] = useState(false);

  if (loading) {
    return (
      <div className="RecommendedItemsCard skeleton">
        <div className="recImgBox skeleton-box" />
        <div className="skeleton-line short" />
        <div className="skeleton-line long" />
        <div className="skeleton-line short" />
      </div>
    );
  }

  return (
    <>
      <div className="RecommendedItemsCard d-flex flex-column align-items-center">
        {/* Wishlist / Quick View / Compare */}
        <div className="recTopActions">
          <button
            className="iconBtn wishlistBtn"
            onClick={() => {
              addToWishlist(item);
              toast.success(`${item.title} added to wishlist!`);
            }}
          >
            ♥
          </button>

          {/* ⭐ زر فتح مودال التفاصيل */}
          <button
            className="iconBtn quickViewBtn"
            onClick={() => setShowModal(true)}
          >
            👁
          </button>

          <button className="iconBtn compareBtn">⇄</button>
        </div>

        {/* Image */}
        <div className="recImgBox">
          <img src={item.thumbnail} alt={item.title} />
        </div>

        {/* Title */}
        <p className="recItemTitle mt-2">{item.title}</p>

        {/* Price + Discount */}
        <div className="recPriceRow">
          <span className="recItemPrice">${item.price}</span>
          {item.discountPercentage && (
            <span className="recItemDiscount">
              -{Math.round(item.discountPercentage)}%
            </span>
          )}
        </div>

        {/* Rating */}
        {item.rating && (
          <div className="recItemRating">
            {"★".repeat(Math.round(item.rating))}
            {"☆".repeat(5 - Math.round(item.rating))}
          </div>
        )}

        {/* Add to cart */}
        <button className="addToCartBtn" onClick={() => addToCart(item)}>
          <i className="fa-solid fa-cart-shopping"></i>
          Add to cart
        </button>
      </div>

      {/* ⭐ مودال التفاصيل */}
      <ProductModal
        show={showModal}
        onHide={() => setShowModal(false)}
        item={item}
      />
    </>
  );
};

export default RecommendedItemsCard;
