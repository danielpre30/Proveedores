import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Link } from "react-router-dom";

import "../styles/Header.scss";
import { EDIT } from "../../../constants";

const Header = ({ name, typeOfService, isMyProfilePage }) => (
  <div className="profile_header">
    {isMyProfilePage ? (
      <Link to={EDIT}>
        <i className="profile_edit far fa-edit fa-2x"></i>
      </Link>
    ) : null}
    <h1 className="profile_title">{name}</h1>
    <h2 className="profile_subtitle">{typeOfService}</h2>
  </div>
);

export default Header;
