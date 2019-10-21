import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../EditProviderItem.scss";

const EditProviderItem = ({ name, deleteProvider, _id, handleChange }) => (
  <li className="providerList_item">
    <div className="providerList_item_header">
      <div className="item_title">{name}</div>
      <i
        className="item_delete fas fa-minus-circle fa-lg"
        onClick={() => deleteProvider(_id)}
        role="button"
        tabIndex="-1"
        onKeyPress
      ></i>
    </div>
    <div className="providerList_item_body">
      <input
        className="providerList_item_input"
        type="text"
        placeholder="Número de Contrato"
        onChange={e => handleChange(e, "contract", _id)}
      />
      <input
        className="providerList_item_input"
        type="text"
        placeholder="Tipo de Servicio"
        onChange={e => handleChange(e, "receivedTypeOfService", _id)}
      />
    </div>
  </li>
);

export default EditProviderItem;
