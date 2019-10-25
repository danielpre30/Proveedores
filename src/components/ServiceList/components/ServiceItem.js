import React from "react";

import "../styles/ServiceItem.scss";
import Star from "../../../resources/star.png";

const ServiceItem = ({ service }) => {
  return (
    <li className="services_item">
      <img src={Star} alt="star" className="services_item_pic" />
      <div className="services_item_body">
        <div>Tipo de servicio: {service.typeOfService}</div>
        <div>Empresa: {service.name}</div>
      </div>
    </li>
  );
};

export default ServiceItem;
