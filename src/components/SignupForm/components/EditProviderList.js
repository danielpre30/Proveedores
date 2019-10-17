import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

const EditProviderList = ({ providers }) => {
  return (
    <ul className="providerList">
      {providers.map(({ name }) => {
        <li providerList-item>
          <div className="item_title">{name}</div>
          <i className="item_delete fas fa-minus-circle"></i>
        </li>;
      })}
    </ul>
  );
};

export default EditProviderList;
