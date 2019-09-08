
import React, { Component } from 'react';
import '../styles/NavBar.css';
import Logo from '../resources/LogoBA-xs.png';
import '@fortawesome/fontawesome-free/css/all.min.css'
import { Link as LinkSection } from "react-scroll";

import { Link, Route } from 'react-router-dom';

class NavBar extends Component {
    
    componentDidMount() {
        const menuIcon = document.getElementById('menu-icon');
        const menuContent = document.getElementById('menu-content');
        menuIcon.addEventListener('click', () => {
            menuContent.classList.toggle('active');
            menuIcon.classList.toggle('animated');
            menuIcon.classList.toggle('fadeInRight');
            menuIcon.classList.toggle('fa-times');
        });

    }
    render() {
        
        var menuLinks = [];
        
        if (this.props.logIn) {
            menuLinks.push(<MenuLink label="INICIO" to="/inicio" activeOnlyWhenExact={false}></MenuLink>);
            menuLinks.push(<LinkSection className="nav-item__Link linkSection" to="providersSection" smooth={true} duration={250} >PROVEEDORES</LinkSection>);
            
        }
        else {
            menuLinks.push(<MenuLink label="INICIO" to="/inicio" activeOnlyWhenExact={false}></MenuLink>);
            menuLinks.push(<MenuLink label="INICIAR SESIÓN" to="/home" activeOnlyWhenExact={false}></MenuLink>);
        }
        return (
            <nav className="nav-bar">
                <div className="logo-container">
                    <i className="fas fa-bars fa-2x" id="menu-icon"></i>
                    <img src={Logo} alt="Logo" className="logo"></img>
                </div>

                <ul className='nav-item-cont' id="menu-content">
                   {menuLinks[0]}
                   {menuLinks[1]}

                </ul>
            </nav>
        );

    }
}
function MenuLink({ label, to, activeOnlyWhenExact }) {
    return (
        <Route
            path={to}
            exact={activeOnlyWhenExact}
            children={({ match }) => (
                <li className={`nav-item ${match ? "active" : ""}`}>
                    <Link className="nav-item__Link" to={to}>{label}</Link>
                </li>
            )}
        />
    );
}

export default NavBar;