import React from 'react';
import '../styles/ProviderCard.css'
import { Link } from 'react-router-dom';
import ProviderSection from '../sections/ProvidersSection';
import star from '../resources/star.png'
const ProviderCard = ({ id, name, logo, typeOfService,score  }) => {
    return (
        <div className="providerCard">
            <div className="providerCard__thumb">
                <img src={logo} className="providerCard__profile" alt="Profile" />
            </div>
            <div className="providerCard__content">
                <header className="content__header">
                    <div className="row-wrapper">
                        <h2 className="providerCard-title">{name}</h2>
                    </div>
                </header>
                <span className="providerCard__description">
                    <span><b>Puntuación: </b>{score} <img className="img-points" src={star} alt="Points" /></span>
                    <p>Empresa <b>{typeOfService}</b></p>
                </span>
                <div></div>
                <footer className="content__footer">
                <Link key={id} to={`/Detail/${id}`}>Ver a detalle</Link>
                </footer>
            </div>
        </div>
    );
}

export default ProviderCard;