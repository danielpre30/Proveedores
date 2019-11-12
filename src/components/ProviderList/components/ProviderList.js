import React, { Component } from "react";

import "../styles/ProviderList.css";

import CardContainer from "./CardContainer";

class ProviderList extends Component {
  render() {
    return (
      <div id="providersSection" className="providersSection">
        <p className="providers__title">
          <b>Busca Proveedores Aquí</b>
        </p>
        <CardContainer />
      </div>
    );
  }
}

export default ProviderList;
