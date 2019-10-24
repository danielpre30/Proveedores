import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

import "../styles/NavBar.scss";
import Logo from "../../../resources/LogoBA-xs.png";

import LogOption from "./LogOption";
import MenuLink from "./MenuLink";
import SectionLink from "./SectionLink";
import { useAuth0 } from "../../Auth/react-auth0-wrapper";

const NavBar = props => {
  const {
    isAuthenticated,
    loginWithRedirect,
    logout,
    hasAProfile,
    profile
  } = useAuth0();

  let links = [];
  let logOption = {};
  let sectionOptions: [];

  if (!isAuthenticated) {
    logOption = {
      label: "INICIAR SESIÓN",
      onClick: () => loginWithRedirect()
    };
  } else {
    logOption = {
      label: "CERRAR SESIÓN",
      onClick: () => logout()
    };
    if (hasAProfile) {
      sectionOptions = [{ label: "PROVEEDORES", to: "providersSection" }];
      links = [{ label: "INICIO", to: "/home" }];
    }
  }
  return (
    <div className="nav_container">
      <nav
        className="nav"
        style={{ position: "relative", visibility: "hidden" }}
      >
        <div className="brand">
          <img src={Logo} alt="Logo" className="brand_image"></img>
        </div>
      </nav>
      <nav className="nav">
        <div className="brand">
          <img src={Logo} alt="Logo" className="brand_image"></img>
          <i
            className="fas fa-bars fa-2x"
            id="menu-icon"
            onClick={e => toggleMenu(e)}
            role="button"
            tabIndex="-1"
            onKeyDown={e => toggleMenu(e)}
          ></i>
        </div>

        <ul className="nav_list" id="nav">
          {links &&
            links.map(({ label, to }) => (
              <MenuLink key={label} to={to} label={label} />
            ))}
          {sectionOptions &&
            sectionOptions.map(option => (
              <SectionLink
                key={option.label}
                label={option.label}
                to={option.to}
              ></SectionLink>
            ))}
          <LogOption label={logOption.label} onClick={logOption.onClick} />
        </ul>
      </nav>
    </div>
  );
};

const toggleMenu = e => {
  if (e.type === "click" || (e.type === "keydown" && e.key === "m")) {
    const menuContent = document.getElementById("nav");
    e.target.classList.toggle("animated");
    e.target.classList.toggle("zoomIn");
    e.target.classList.toggle("fa-times");
    menuContent.classList.toggle("active");
  }
};

export default NavBar;
