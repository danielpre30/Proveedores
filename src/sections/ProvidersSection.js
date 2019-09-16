import React, { Component } from 'react';
import '../styles/ProvidersSection.css';
import CardContainer from '../containers/CardContainer'
class ProviderSection extends Component{
    render()
    {
        return(
            <div id="providersSection" className="providersSection">
                <p className="providers__title"><b>Busca Proveedores Aquí</b></p>
                <div>
                    <input placeholder="Nombre o tipo de servicio" className="providers__input"></input>
                </div>
                <CardContainer/>
                
            </div>
        );
    }
}

export default ProviderSection;