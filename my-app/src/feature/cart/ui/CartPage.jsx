import React from "react";
import useCartStore from "../../cart/data/cartStore";
import { Button, Form, Row, Col } from "react-bootstrap";
import "./CartPage.css";
import Header from "../../../shared/header/Header";
import Footer from "../../../shared/footer/Footer";
import { toast } from "react-toastify";
import { FaLock, FaHeadset, FaTruck, FaShoppingCart } from "react-icons/fa";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, getTotalPrice, clearCart } =
    useCartStore();

  const subtotal = getTotalPrice();
  const discount = subtotal > 500 ? 90 : 0;
  const tax = subtotal * 0.01;
  const total = subtotal - discount + tax;

  if (cart.length === 0) {
    return (
      <>
        <Header />
        <div className="CartPage text-center mt-5 fadeIn">
          <h2> السلة فارغة</h2>
          <p>ابدأ بإضافة منتجاتك من الصفحة الرئيسية أو العروض.</p>
        </div>
        <Footer />
      </>
    );
  }

  const handleCheckout = () => {
    toast.success(
      `✅ Checkout Completed!\nProducts: ${
        cart.length
      }\nTotal: $${total.toFixed(2)}`,
      { position: "top-center" }
    );
  };

  const handleApplyCoupon = () => {
    toast.info(" تم تطبيق الكوبون بنجاح!", { position: "top-center" });
  };

  return (
    <>
      <Header />
      <div className="CartPage container mt-4 fadeIn mt-5">
        <h2 className="mb-4 slideDown align-items-center">
          <FaShoppingCart color="#0d6efd" className="me-2" /> My Cart
        </h2>

        <Row className="align-items-start">
          {/* المنتجات */}
          <Col lg={8} md={12}>
            <div className="cartItems">
              {cart.map((item) => (
                <div key={item.id} className="cartItem zoomIn">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="cartItemImg"
                  />
                  <div className="cartItemDetails">
                    <h5 className="cartItemTitle">{item.title}</h5>
                    <p className="cartItemPrice">${item.price}</p>
                    <div className="cartQuantity">
                      <label>Quantity:</label>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item.id, Number(e.target.value))
                        }
                        className="quantityInput"
                      />
                    </div>
                  </div>
                  <Button
                    variant="danger"
                    onClick={() => removeFromCart(item.id)}
                    className="bounceBtn"
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </Col>

          {/* الملخص */}
          <Col lg={4} md={12} className="">
            <div className="cartSummary slideUp p-4">
              <h4>Order Summary</h4>
              <p>Subtotal: ${subtotal.toFixed(2)}</p>
              <p>Discount: -${discount.toFixed(2)}</p>
              <p>Tax: ${tax.toFixed(2)}</p>
              <h5>Total: ${total.toFixed(2)}</h5>

              <div className="couponBox d-flex gap-2 mt-3">
                <Form.Control type="text" placeholder="Enter coupon code" />
                <Button variant="primary" onClick={handleApplyCoupon}>
                  Apply
                </Button>
              </div>

              <div className="cartActions d-flex gap-3 mt-3">
                <Button
                  variant="secondary"
                  onClick={clearCart}
                  className="shakeBtn"
                >
                  Clear Cart
                </Button>
                <Button
                  variant="success"
                  onClick={handleCheckout}
                  className="pulseBtn"
                >
                  Checkout
                </Button>
              </div>
            </div>
          </Col>
        </Row>

        {/* أيقونات ضمان */}
        <div className="cartIcons fadeIn mt-5">
          <div className="cartIconItem">
            <FaLock /> <span>Secure Payment</span>
          </div>
          <div className="cartIconItem">
            <FaHeadset /> <span>Customer Support</span>
          </div>
          <div className="cartIconItem">
            <FaTruck /> <span>Free Delivery</span>
          </div>
        </div>

        {/* Saved for later */}
        <div className="savedLater mt-5 slideUp">
          <h4>Saved for later</h4>
          <div className="savedItems">
            <div className="savedItem hoverGlow">📷 GoPro HERO 8K - $99.50</div>
            <div className="savedItem hoverGlow">💻 Laptop - $99.50</div>
            <div className="savedItem hoverGlow">📷 GoPro HERO 8K - $99.50</div>
            <div className="savedItem hoverGlow">📷 GoPro HERO 8K - $99.50</div>
          </div>
        </div>

        {/* Banner */}
        <div className="discountBanner mt-5 text-center fadeIn">
          <h5>🎉 Super discount on more than 100 USD</h5>
          <Button variant="info" className="bounceBtn">
            Shop now
          </Button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CartPage;
