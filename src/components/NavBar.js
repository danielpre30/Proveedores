import React, { Component } from "react";
import "../styles/NavBar.css";
import Logo from "../resources/LogoBA-xs.png";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Link as LinkSection } from "react-scroll";

import { Link, Route } from "react-router-dom";

class NavBar extends Component {
  toggleMenu(e) {
    if (e.type === "click" || (e.type === "keydown" && e.key === "m")) {
      const menuContent = document.getElementById("menu-content");
      e.target.classList.toggle("animated");
      e.target.classList.toggle("fadeInRight");
      e.target.classList.toggle("fa-times");
      menuContent.classList.toggle("active");
    }
  }
  componentDidMount() {}
  render() {
    var menuLinks = [];

    if (this.props.logIn) {
      menuLinks.push(
        <MenuLink
          label="INICIO"
          to="/inicio"
          activeOnlyWhenExact={false}
        ></MenuLink>
      );
      menuLinks.push(
        <LinkSection
          className="nav-item__Link linkSection"
          to="providersSection"
          smooth={true}
          duration={250}
        >
          PROVEEDORES
        </LinkSection>
      );
    } else {
      menuLinks.push(
        <MenuLink
          label="INICIO"
          to="/inicio"
          activeOnlyWhenExact={false}
        ></MenuLink>
      );
      menuLinks.push(
        <MenuLink
          label="INICIAR SESIÓN"
          to="/home"
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
            onClick={e => this.toggleMenu(e)}
            role="button"
            tabIndex="-1"
            onKeyDown={e => this.toggleMenu(e)}
          ></i>
          <img src={Logo} alt="Logo" className="logo"></img>
        </div>

        <ul className="nav-item-cont" id="menu-content">
          {menuLinks[0]}
          {menuLinks[1]}
        </ul>
      </nav>
    );
  }
}
function MenuLink({ label, to, activeOnlyWhenExact }) {
  return (
    <Route path={to} exact={activeOnlyWhenExact}>
      {({ match }) => (
        <li className={`nav-item ${match ? "active" : ""}`}>
          <Link className="nav-item__Link" to={to}>
            {label}
          </Link>
        </li>
      )}
    </Route>
  );
}

export default NavBar;
