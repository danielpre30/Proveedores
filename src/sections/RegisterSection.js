import React, { Component } from "react";
import "../styles/LandingSection.css";
import "../styles/RegisterSection.scss";
import LogoBA from "../resources/LogoBA-xs.png";
import Axios from "axios";
import { BASE_LOCAL_ENDPOINT } from "../constants";
import { Auth0Context } from "../Auth/react-auth0-wrapper";

class RegisterSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nit: "",
      name: "",
      typeOfService: "",
      foundationYear: "",
      webPageURL: "",
      logoURL: ""
    };
  }

  static contextType = Auth0Context;

  handleChange = (e, field) => {
    var value =
      field === "filterText" ? e.target.value.toLowerCase() : e.target.value;

    this.setState({
      [field]: value //Los corchetes son para hacer referencia a la clave a partir de un string
    });
  };

  signUp = e => {
    e.preventDefault();
    const {
      name,
      typeOfService,
      foundationYear,
      webPageURL,
      logoURL,
      nit
    } = this.state;
    const { user, setHasAProfile, setProfile } = this.context;

    Axios.post(`${BASE_LOCAL_ENDPOINT}/business`, {
      NIT: nit,
      email: user.email,
      name: name,
      typeOfService: typeOfService,
      yearOfCreation: foundationYear,
      webPage: webPageURL,
      logo: logoURL
    }).then(response => {
      setHasAProfile(true);
      setProfile(response);
    });
  };

  render() {
    return (
      <div className="signup">
        <form className="form" onSubmit={this.signUp}>
          <div className="form_header">
            <h1 className="form_header_title">¡Registrate Ahora!</h1>
            <img className="form_header_logo" src={LogoBA} alt="Profile" />
          </div>
          <div className="form_body">
            <div className="form_group">
              <label htmlFor="nit" className="form_group_label">
                NIT
              </label>
              <input
                type="number"
                className="form_group_input"
                placeholder="NIT"
                id="nit"
                onChange={e => this.handleChange(e, "nit")}
              />
            </div>

            <div className="form_group">
              <label htmlFor="name" className="form_group_label">
                Nombre de la empresa
              </label>
              <input
                type="text"
                className="form_group_input"
                placeholder="Nombre"
                id="name"
                onChange={e => this.handleChange(e, "name")}
              />
            </div>

            <div className="form_group">
              <label htmlFor="typeOfService" className="form_group_label">
                Tipo de servicio que ofrece la empresa
              </label>
              <input
                type="text"
                className="form_group_input"
                placeholder="Tipo de servicio"
                id="typeOfService"
                onChange={e => this.handleChange(e, "typeOfService")}
              />
            </div>

            <div className="form_group">
              <label htmlFor="foundationYear" className="form_group_label">
                Año de fundación
              </label>
              <input
                type="number"
                min="1900"
                max="2099"
                step="1"
                className="form_group_input"
                id="foundationYear"
                placeholder="Año"
                onChange={e => this.handleChange(e, "foundationYear")}
              />
            </div>

            <div className="form_group">
              <label htmlFor="webPageURL" className="form_group_label">
                Sitio web de la empresa
              </label>
              <input
                type="url"
                className="form_group_input"
                id="webPageURL"
                placeholder="www.example.com"
                onChange={e => this.handleChange(e, "webPageURL")}
              />
            </div>

            <div className="form_group">
              <label htmlFor="logoURL" className="form_group_label">
                Dirección URL de la imagen de el logo de la empresa
              </label>
              <input
                type="url"
                className="form_group_input"
                id="logoURL"
                placeholder="URL a la página web"
                onChange={e => this.handleChange(e, "logoURL")}
              />
            </div>

            <input
              className="submit_button"
              id="submit_button"
              type="submit"
              value="Registrarse"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default RegisterSection;
