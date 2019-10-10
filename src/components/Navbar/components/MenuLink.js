import React from "react";
import { Link, Route } from "react-router-dom";
import NavItem from "./NavItem";

const MenuLink = ({ label, to, onClick }) => {
  return (
    <Route path={to} exact={true}>
      {({ match }) => (
        <NavItem active={match}>
          <Link className="nav_item_link" to={to} onClick={onClick}>
            {label}
          </Link>
        </NavItem>
      )}
    </Route>
  );
};

export default MenuLink;
