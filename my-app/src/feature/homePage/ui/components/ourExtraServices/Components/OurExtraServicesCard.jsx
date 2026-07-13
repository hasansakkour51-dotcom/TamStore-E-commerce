import React from "react";
import "./OurExtraServicesCard.css";

const ExtraServiceCard = ({ service }) => {
  return (
    <div className="ExtraServiceCard">
      <div className="serviceImgBox">
        <img src={service.image} alt={service.title} />
      </div>

      <h4 className="serviceTitle">{service.title}</h4>
      <p className="serviceDesc">{service.description}</p>
    </div>
  );
};

export default ExtraServiceCard;
