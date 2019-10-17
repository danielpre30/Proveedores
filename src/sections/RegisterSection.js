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
      logoURL: "",
      providers: [],
      businessList: [],
      selectedBusinessId: "",
      addedBusiness: []
    };
  }

  static contextType = Auth0Context;

  componentDidMount() {
    Axios.get(`${BASE_LOCAL_ENDPOINT}/business?every=true`)
      .then(response => {
        const sortedData = response.data.sort((a, b) => b.name - a.name);
        this.setState(prevState => {
          return {
            ...prevState,
            businessList: sortedData,
            selectedBusinessId: sortedData ? sortedData[0]._id : ""
          };
        });
      })
      .catch(error => {
        // handle error
        console.error(error);
        this.setState(prevState => {
          return {
            ...prevState,
            error: error.message
          };
        });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.addedBusiness !== this.state.addedBusiness) {
      this.setState(state => {
        return {
          ...state,
          businessList: [
            ...state.businessList.filter(
              business =>
                business._id !==
                state.addedBusiness[state.addedBusiness.length - 1]
            )
          ]
        };
      });
    }
  }

  handleChange = (e, field) => {
    var value =
      field === "filterText" ? e.target.value.toLowerCase() : e.target.value;

    this.setState(prevState => {
      return {
        ...prevState,
        [field]: value //Los corchetes son para hacer referencia a la clave a partir de un string
      };
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

    Axios.post(`${BASE_LOCAL_ENDPOINT}/business&email=${user.email}`, {
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

  handleSelectChange = e => {
    const value = e.target.value;
    this.setState(prevState => {
      return {
        ...prevState,
        selectedBusinessId: value
      };
    });
  };

  addProvider = e => {
    e.preventDefault();
    this.setState(prevState => {
      return {
        ...prevState,
        addedBusiness: prevState.selectedBusinessId
          ? [...prevState.addedBusiness, prevState.selectedBusinessId]
          : prevState.addedBusiness,
        selectedBusinessId: ""
      };
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

            <div className="form_group">
              <label htmlFor="logoURL" className="form_group_label">
                Agregar proveedores
              </label>
              <select
                className="form_group_input"
                id="selectedBusinessId"
                onChange={e => this.handleSelectChange(e)}
                onBlur={e => this.handleSelectChange(e)}
                value={this.state.selectedBusinessId}
              >
                <option disabled selected value="">
                  Seleccione una opcion
                </option>
                {this.state.businessList.map(bussines => (
                  <option key={bussines._id} value={bussines._id}>
                    {bussines.name}
                  </option>
                ))}
              </select>
              <button
                className="submit_button"
                id="add_provider_button"
                onClick={e => this.addProvider(e)}
              >
                Agregar
              </button>
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
