
import React, { Component } from 'react';
import '../styles/NavBar.css';
import Logo from '../resources/LogoBA-xs.png';
import { Link, Route, Switch, Redirect } from 'react-router-dom';

class NavBar extends Component {

    componentDidMount() {
        const menuIcon = document.getElementById('menu-icon');
        const menuContent = document.getElementById('menu-content');
        menuIcon.addEventListener('click', () => {
            menuContent.classList.toggle('active');
        });
    }
    render() {
        return (
            <nav className="nav-bar">
                <div className="logo-container">
                    <i className="fas fa-bars fa-2x" id="menu-icon"></i>
                    <img src={Logo} alt="Logo" className="logo"></img>
                </div>
                <ul className='nav-item-cont' id="menu-content">
                    <MenuLink label="INICIO" to="/inicio" activeOnlyWhenExact={false}></MenuLink>
                    <MenuLink label="INICIAR SESIÓN" to="/achievements" activeOnlyWhenExact={false}></MenuLink>             
                    
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
                    <Link to={to}>{label}</Link>
                </li>
            )}
        />
    );
}


export default NavBar;