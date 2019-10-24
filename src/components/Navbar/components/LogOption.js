import React from "react";

import NavItem from "./NavItem";

const LogOption = ({ label, onClick }) => {
  return (
    <NavItem>
      <button className="nav_item_link" onClick={onClick}>
        {label}
      </button>
    </NavItem>
  );
};

export default LogOption;
