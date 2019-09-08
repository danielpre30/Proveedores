import React, { Component } from 'react';
import '../styles/ProvidersSection.css';
import ProviderCard from '../containers/ProviderCard'
class ProviderSection extends Component{
    render()
    {
        return(
            <div id="providersSection" className="providersSection">
                <p className="providers__title"><b>Busca Proveedores Aquí</b></p>
                <div>
                    <input placeholder="Nombre o tipo de servicio" className="providers__input"></input>
                </div>
                <div className="providers__card-container">
                   <ProviderCard name="Balalaika" srcImage="https://pbs.twimg.com/profile_images/3736649905/260390ab5d8ddd02bea256b8959ba9bb.jpeg" points="4" category="Proveedora Textil"></ProviderCard>
                   <ProviderCard name="Gigha S.A." srcImage="https://media.licdn.com/dms/image/C4D0BAQEe1KgM4uK8Fg/company-logo_200_200/0?e=2159024400&v=beta&t=YfzUPNjqMLs6KJ2OvwxfJQ5z23s6NES6uy7iptGNhzo" points="4.9" category="Proveedora de Talento Humano"></ProviderCard>
                   <ProviderCard name="Socoda" srcImage="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFjeMXrpF5cKtYq8tuaLDX0de78r24MciBQ4UihZUHZJNa_jxZ"points="4.5" category="Proveedora de Acero"></ProviderCard>

                </div>
                
            </div>
        );
    }
}

export default ProviderSection;