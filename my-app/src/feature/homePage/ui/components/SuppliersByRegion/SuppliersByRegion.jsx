import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { suppliersData } from "./data/suppliersData";
import "./SuppliersByRegion.css";
import SupplierCard from "./Components/SupplierCard";

const SuppliersByRegion = () => {
  return (
    <section className="suppliersSection">
      <Container>
        <h2 className="suppliersTitle">Suppliers by Region</h2>
        <p className="suppliersSubtitle">
          Explore our global supplier network across multiple regions.
        </p>

        <Row className="suppliersRow">
          {suppliersData.map((item, index) => (
            <Col key={index} lg={3} md={4} sm={6} xs={12} className="supplierCol">
              <SupplierCard
                country={item.country}
                flag={item.flag}
                url={item.url}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default SuppliersByRegion;
