import React from "react";
import "./SupplierCard.css";

const SupplierCard = ({ country, flag, url }) => {
  return (
    <div className="supplierCard">
      <img src={flag} alt={country} className="supplierFlag" />

      <h4 className="supplierCountry">{country}</h4>

      <a href={url} target="_blank" className="supplierLink">
        {url}
      </a>
    </div>
  );
};

export default SupplierCard;
