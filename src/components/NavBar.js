import React from "react";
import "../styles/NavBar.css";
import Logo from "../resources/LogoBA-xs.png";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Link as LinkSection } from "react-scroll";
import { useAuth0 } from "../Auth/react-auth0-wrapper";
import { Link, Route } from "react-router-dom";

const NavBar = props => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  var menuLinks = [];

  function toggleMenu(e) {
    if (e.type === "click" || (e.type === "keydown" && e.key === "m")) {
      const menuContent = document.getElementById("menu-content");
      e.target.classList.toggle("animated");
      e.target.classList.toggle("fadeInRight");
      e.target.classList.toggle("fa-times");
      menuContent.classList.toggle("active");
    }
  }

  menuLinks.push(
    <MenuLink label="INICIO" to="/home" activeOnlyWhenExact={false}></MenuLink>
  );
  if (!isAuthenticated) {
    menuLinks.push(
      <MenuLink
        label="INICIAR SESIÓN"
        onClick={() => loginWithRedirect({})}
        activeOnlyWhenExact={false}
      ></MenuLink>
    );
  } else {
    menuLinks.push(
      <LinkSection
        className="nav-item__Link linkSection"
        to="providersSection"
        smooth={true}
        duration={250}
      >
        PROVEEDORES
      </LinkSection>,
      <MenuLink
        label="CERRAR SESIÓN"
        onClick={() => logout()}
        activeOnlyWhenExact={false}
      ></MenuLink>
    );
  }
  return (
    <nav className="nav-bar">
      <div className="logo-container">
        <i
          className="fas fa-bars fa-2x"
          id="menu-icon"
          onClick={e => toggleMenu(e)}
          role="button"
          tabIndex="-1"
          onKeyDown={e => toggleMenu(e)}
        ></i>
        <img src={Logo} alt="Logo" className="logo"></img>
      </div>

      <ul className="nav-item-cont" id="menu-content">
        {menuLinks}
      </ul>
    </nav>
  );
};

function MenuLink({ label, to, activeOnlyWhenExact, onClick }) {
  return (
    <Route path={to} exact={activeOnlyWhenExact}>
      {({ match }) => (
        <li className={`nav-item ${match ? "active" : ""}`}>
          <Link className="nav-item__Link" to={to} onClick={onClick}>
            {label}
          </Link>
        </li>
      )}
    </Route>
  );
}

export default NavBar;
