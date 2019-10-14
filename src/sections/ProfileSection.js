import React, { Component } from "react";

import "../styles/ProfileSection.css";
import star from "../resources/star.png";

class ProfileSection extends Component {
  render() {
    return (
      <div className="ProfileCanvas">
        <div className="TitleText">
          <h1>Nombre empresa</h1>
        </div>

        <div className="SubtitleText">
          <h1>Tipo de servicio</h1>
        </div>

        <div className="ProfilePic"></div>

        <div className="RateBox">
          <h1 className="RateText">4,9</h1>
          <img className="Ratestar" src={star} alt="RateStar" />
        </div>

        <div className="PuntualityStar">
          <ul>
            <h3>Puntualidad</h3>
            <li>
              <img className="star" src={star} alt="starPuntuality" />
            </li>
            <li>
              <img className="star" src={star} alt="starPuntuality" />
            </li>
            <li>
              <img className="star" src={star} alt="starPuntuality" />
            </li>
            <li>
              <img className="star" src={star} alt="starPuntuality" />
            </li>
            <li>
              <img className="star" src={star} alt="starPuntuality" />
            </li>
          </ul>
        </div>

        <div className="ComunicationStar">
          <ul>
            <h3>Comunicación</h3>
            <li>
              <img className="star" src={star} alt="starPuntuality" />
            </li>
            <li>
              <img className="star" src={star} alt="starPuntuality" />
            </li>
            <li>
              <img className="star" src={star} alt="starPuntuality" />
            </li>
            <li>
              <img className="star" src={star} alt="starPuntuality" />
            </li>
            <li>
              <img className="star" src={star} alt="starPuntuality" />
            </li>
          </ul>
        </div>

        <div className="ServiceStar">
          <ul>
            <h3>Servicio Posventa</h3>
            <li>
              <img className="star" src={star} alt="starPuntuality" />
            </li>
            <li>
              <img className="star" src={star} alt="starPuntuality" />
            </li>
            <li>
              <img className="star" src={star} alt="starPuntuality" />
            </li>
            <li>
              <img className="star" src={star} alt="starPuntuality" />
            </li>
            <li>
              <img className="star" src={star} alt="starPuntuality" />
            </li>
          </ul>
        </div>

        <div className="QualityStar">
          <ul>
            <h3>Calidad/Precio</h3>
            <li>
              <img className="star" src={star} alt="starPuntuality" />
            </li>
            <li>
              <img className="star" src={star} alt="starPuntuality" />
            </li>
            <li>
              <img className="star" src={star} alt="starPuntuality" />
            </li>
            <li>
              <img className="star" src={star} alt="starPuntuality" />
            </li>
            <li>
              <img className="star" src={star} alt="starPuntuality" />
            </li>
          </ul>
        </div>

        <div className="OpinionsChart">
          <div className="NavBarOptions">
            <ul>
              <li>
                <input
                  className="button-GoOpinions"
                  name="Submit"
                  type="submit"
                  value="opiniones"
                />
              </li>
              <li>
                <input
                  className="button-GoOpinions"
                  name="Submit"
                  type="submit"
                  value="Proveedores"
                />
              </li>
            </ul>
          </div>

          <p>
            {" "}
            Mi lista de proveedores, proveedor actual, proveedor contrato
            pasado, reporte de errores
          </p>
        </div>
      </div>
    );
  }
}

export default ProfileSection;
