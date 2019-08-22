import React, { Component } from 'react';
import Background from '../resources/fondoSinRegistro.jpg';
import '../styles/SinglePage.css';


class LandingSection extends Component{
    render()
    {
        return(
            <div className="LandingSection">
                <img src={Background} className="LandingSection__img"></img>
            </div>
        );
    }
}

export default LandingSection;