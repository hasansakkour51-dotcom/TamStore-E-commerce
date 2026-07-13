import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Newsletter.css";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      alert("Subscribed successfully!");
    }, 1500);
  };

  return (
    <section className="newsletterSection">
      <Container>
        <Row className="align-items-center">
          <Col lg={6} md={12} className="textBox">
            <h2 className="newsletterTitle">Subscribe on our newsletter</h2>
            <p className="newsletterSubtitle">
              Get daily news on upcoming offers from many suppliers all over the world
            </p>
          </Col>

          <Col lg={6} md={12} className="formBox">
            <form onSubmit={handleSubscribe} className="newsletterForm">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="newsletterInput"
              />
              <button type="submit" className="newsletterBtn">
                {loading ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Newsletter;
