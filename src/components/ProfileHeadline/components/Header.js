import React from "react";

const Header = ({ name, typeOfService }) => (
  <div className="profile_header">
    <h1 className="profile_title">{name}</h1>
    <h2 className="profile_subtitle">{typeOfService}</h2>
  </div>
);

export default Header;
