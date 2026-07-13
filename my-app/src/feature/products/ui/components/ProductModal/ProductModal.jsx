import React, { useContext } from "react";
import { Modal, Button } from "react-bootstrap";
import { FaCartPlus, FaHeart, FaBalanceScale } from "react-icons/fa";
import "./ProductModal.css";
import useCartStore from "../../../../cart/data/cartStore";
import { WishlistContext } from "../../../../../contextWishlist/WishlistContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductModal = ({ show, onHide, item }) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const { addToWishlist } = useContext(WishlistContext);

  if (!item) return null;

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      size="lg"
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>{item.title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="modalContent">
          {/* صورة المنتج */}
          <img src={item.thumbnail} alt={item.title} className="modalImg" />

          {/* تفاصيل المنتج */}
          <div className="modalDetails">
            <h5 className="modalPrice">${item.price}</h5>

            <p className="modalRating">
              {"★".repeat(Math.round(item.rating))}
              {"☆".repeat(5 - Math.round(item.rating))}
            </p>

            <p className="modalDesc">{item.description}</p>

            {/* أزرار التفاعل */}
            <div className="modalActions">
              <Button variant="primary" onClick={() => addToCart(item)}>
                <FaCartPlus /> Add to Cart
              </Button>

              {/* ⭐ زر المفضلة مفعّل */}
              <Button
                variant="danger"
                onClick={() => {
                  addToWishlist(item);
                  toast.success(`${item.title} added to wishlist!`);
                }}
              >
                <FaHeart /> Wishlist
              </Button>

              <Button variant="secondary">
                <FaBalanceScale /> Compare
              </Button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ProductModal;
