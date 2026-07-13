import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./OurExtraServices.css";

import ourExtra1 from "../../../../../assets/Images/ourExtra1.png";
import ourExtra2 from "../../../../../assets/Images/ourExtra2.png";
import ourExtra3 from "../../../../../assets/Images/ourExtra3.png";
import ourExtra4 from "../../../../../assets/Images/ourExtra4.png";
import ExtraServiceCard from "./Components/OurExtraServicesCard";

const services = [
  {
    image: ourExtra1,
    title: "Source from Industry Hubs",
    description: "Find suppliers from the biggest manufacturing hubs worldwide."
  },
  {
    image: ourExtra2,
    title: "Customize Your Products",
    description: "Choose colors, materials, and specifications that match your brand."
  },
  {
    image: ourExtra3,
    title: "Fast, Reliable Shipping",
    description: "Shipping by ocean or air with trusted logistics partners."
  },
  {
    image: ourExtra4,
    title: "Product Monitoring & Inspection",
    description: "Ensure product quality with professional inspection services."
  }
];

const OurExtraServices = () => {
  return (
    <section className="extraServicesSection mt-5">
      <Container>
        <h3 className="extraServicesTitle mb-4">Our Extra Services</h3>

        <Row className="g-4">
          {services.map((service, index) => (
            <Col lg={3} md={6} sm={6} xs={12} key={index}>
              <ExtraServiceCard service={service} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default OurExtraServices;
