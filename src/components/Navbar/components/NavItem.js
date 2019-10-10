import React from "react";

const NavItem = ({ active, children }) => {
  return <li className={`nav_item ${active ? "active" : ""}`}>{children}</li>;
};

export default NavItem;
