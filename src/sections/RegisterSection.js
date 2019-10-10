import React, { Component } from "react";
import "../styles/LandingSection.css";
import "../styles/RegisterSection.css";
import LogoBA from "../resources/LogoBA-xs.png";

class RegisterSection extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="landing-section">
        <div className="landing__register-info">
          <h1>¡Registrate Ahora!</h1>
          <img className="logoReg" src={LogoBA} alt="Profile" />
          <form className="">
            <p className="regInfo__text">Nombre de la empresa:</p>
            <input
              className="reg__input"
              name="companyName"
              placeholder="Nombre de la empresa"
            />
            <p className="regInfo__text">Tipo de servicio que ofrecen:</p>
            <input
              className="reg__input"
              name="typeOfService"
              placeholder="Tipo de servicio"
            />
            <p className="regInfo__text">Año de fundación:</p>
            <input
              className="reg__input"
              name="creationYear"
              placeholder="Año fundación"
            />
            <p className="regInfo__text">
              Dirección URL a la página web de la empresa:
            </p>
            <input
              className="reg__input"
              name="webPageURL"
              placeholder="URL a la página web"
            />
            <p className="regInfo__text">
              Dirección URL a el logo de la empresa:
            </p>
            <input
              className="reg__input"
              name="logoURL"
              placeholder="URL a la página web"
            />
            <br />
            <input
              className="button-register"
              name="Submit"
              type="submit"
              value="Registrarse"
            />
          </form>
        </div>
      </div>
    );
  }
}

export default RegisterSection;
