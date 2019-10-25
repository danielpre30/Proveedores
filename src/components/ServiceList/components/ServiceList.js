import React from "react";
import ServiceItem from "./ServiceItem";

import "../styles/ServiceList.scss";
import { PROVIDER, CONTRACTOR } from "../../../constants";

const ServiceList = ({ services, type }) => {
  let label;

  switch (type) {
    case PROVIDER:
      label = "Servicios Prestados";
      break;
    case CONTRACTOR:
      label = "Servicios Contratados";
      break;
    default:
      label = "WTF are you doing men!";
  }
  return (
    <div className="services">
      <h2 className="services_header">{label}</h2>
      <ul className="services_list">
        {services &&
          (services.length !== 0
            ? services.map(service => (
                <ServiceItem key={service._id} service={service} />
              ))
            : "No existen servicios aún")}
      </ul>
    </div>
  );
};

export default ServiceList;
