import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import requestImage from "../../../../../assets/Images/request.png";
import "./RequestQuoteSection.css";
const RequestQuoteSection = () => {
  const back = {
    backgroundImage: `url(${requestImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <section className="mt-3">
      <Container>
        <Row className="RequestQuoteSection justify-content-between" style={back}>
          <Col lg={5}>
            <Row className=" flex-column gap-2">
              <h3>An easy way to send requests to all suppliers</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt.
              </p>
            </Row>
          </Col>
          <Col lg={5}>
            <div className="quoteRight">
              <form className="quoteForm d-flex flex-column">
                <input
                  type="text"
                  placeholder="What item you need?"
                  className="quoteInput"
                />

                <textarea
                  placeholder="Type more details"
                  className="quoteTextarea"
                ></textarea>

                <div className="quantityRow">
                  <input
                    type="number"
                    placeholder="Quantity"
                    className="quantityInput"
                  />

                  <select className="quantityUnitSelect">
                    <option>Pcs</option>
                    <option>Kg</option>
                    <option>Box</option>
                  </select>
                </div>

                <button className="quoteSubmitBtn">Send inquiry</button>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default RequestQuoteSection;
