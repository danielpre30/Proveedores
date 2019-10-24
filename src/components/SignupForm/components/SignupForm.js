import React, { Component } from "react";
import Axios from "axios";

import { BASE_LOCAL_ENDPOINT } from "../../../constants";

import "../styles/SignupForm.scss";
import LogoBA from "../../../resources/LogoBA-xs.png";

import EditProviderList from "./EditProviderList";
import FormGroup from "./FormGroup";
import FormInput from "./FormInput";
import PaymentSection from "../../PaymentSection";
import { Auth0Context } from "../../Auth/react-auth0-wrapper";

class SignupForm extends Component {
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
      selectedBusiness: {}
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
            businessList: sortedData.map(business => {
              return {
                ...business,
                deleteProvider: this.deleteProvider,
                handleChange: this.handleChange
              };
            }),
            selectedBusiness: sortedData.find(business => !business.added)
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

  handleChange = (e, field, businessId) => {
    var value = e.target.value;
    if (businessId) {
      this.setState(prevState => {
        return {
          ...prevState,
          businessList: [
            ...prevState.businessList.map(business => {
              return business._id === businessId
                ? { ...business, [field]: value }
                : business;
            })
          ]
        };
      });
    } else {
      this.setState(prevState => {
        return {
          ...prevState,
          [field]: value
        };
      });
    }
  };

  signUp = async e => {
    e.preventDefault();
    var initialScore;
    const {
      name,
      typeOfService,
      foundationYear,
      webPageURL,
      logoURL,
      nit,
      businessList
    } = this.state;

    const { user, setHasAProfile, setProfile } = this.context;
    if (typeOfService === "Contratante") {
      initialScore = "N/A";
    } else {
      initialScore = 0;
    }
    const newProfile = {
      NIT: nit,
      email: user.email,
      name: name,
      typeOfService: typeOfService,
      yearOfCreation: foundationYear,
      webPage: webPageURL,
      logo: logoURL
    };

    const responseBusiness = await Axios.post(
      `${BASE_LOCAL_ENDPOINT}/business`,
      newProfile
    );

    const profileData =
      responseBusiness &&
      responseBusiness.data &&
      responseBusiness.data.ops.length !== 0 &&
      responseBusiness.data.ops[0];

    const services = [
      ...businessList
        .filter(
          business =>
            business.added &&
            business.contract &&
            business.receivedTypeOfService
        )
        .map(business => {
          return {
            providerId: business._id,
            contractorId: profileData._id,
            contract: business.contract,
            typeOfService: business.receivedTypeOfService,
            validContract: false
          };
        })
    ];

    const responseServices = await Axios.post(
      `${BASE_LOCAL_ENDPOINT}/services`,
      services
    );

    const servicesData =
      responseServices &&
      responseServices.data &&
      responseServices.data.ops.length !== 0 &&
      responseServices.data.ops[0];
    setProfile({ ...profileData, ...servicesData });
    setHasAProfile(true);
  };

  handleSelectChange = e => {
    const value = e.target.value;
    this.setState(prevState => {
      if (value)
        return {
          ...prevState,
          selectedBusiness: {
            ...prevState.businessList.find(business => business._id === value)
          }
        };
      else return prevState;
    });
  };

  changeAdded(id, value) {
    const { businessList } = this.state;
    return businessList.map(business => {
      return business._id === id
        ? { ...business, added: value ? value : !business.added, contract: "" }
        : business;
    });
  }
  addProvider = e => {
    e.preventDefault();

    this.setState(prevState => {
      if (
        Object.keys(prevState.selectedBusiness).length !== 0 &&
        prevState.selectedBusiness._id !== -1
      ) {
        const newBusinessList = this.changeAdded(
          prevState.selectedBusiness._id,
          true
        );

        return {
          ...prevState,
          businessList: [...newBusinessList],
          selectedBusiness: {
            ...newBusinessList.find(business => !business.added)
          }
        };
      } else return prevState;
    });
  };

  deleteProvider = id => {
    this.setState(prevState => {
      const newBusinessList = this.changeAdded(id, false);
      return {
        ...prevState,
        businessList: [...newBusinessList],
        selectedBusiness: {
          ...newBusinessList.find(business => !business.added)
        }
      };
    });
  };

  render() {
    const { businessList } = this.state;
    return (
      <div className="signup">
        <form className="form" onSubmit={this.signUp}>
          <div className="form_header">
            <h1 className="form_header_title">¡Registrate Ahora!</h1>
            <img className="form_header_logo" src={LogoBA} alt="Profile" />
          </div>

          <div className="form_body">
            <FormGroup inputId="nit" label="NIT">
              <FormInput
                type="number"
                placeholder="NIT"
                inputId="nit"
                onInputChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup inputId="name" label="Nombre de la empresa">
              <FormInput
                type="text"
                placeholder="Nombre"
                inputId="name"
                onInputChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup
              inputId="typeOfService"
              label="Tipo de servicio que ofrece la empresa"
            >
              <FormInput
                type="text"
                placeholder="Tipo de servicio"
                inputId="typeOfService"
                onInputChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup inputId="foundationYear" label="Año de fundación">
              <FormInput
                type="number"
                placeholder="Año"
                inputId="foundationYear"
                onInputChange={this.handleChange}
                min="1900"
                max="2099"
                step="1"
              />
            </FormGroup>

            <FormGroup inputId="webPageURL" label="Sitio web de la empresa">
              <FormInput
                type="url"
                placeholder="http://www.example.com"
                inputId="webPageURL"
                onInputChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup
              inputId="logoURL"
              label="Dirección URL de la imagen de el logo de la empresa"
            >
              <FormInput
                type="url"
                placeholder="URL a la página web"
                inputId="logoURL"
                onInputChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup inputId="selectedBusiness" label="Agregar proveedores">
              <select
                className="form_group_input"
                id="selectedBusiness"
                onChange={e => this.handleSelectChange(e)}
                onBlur={e => this.handleSelectChange(e)}
                value={this.state.selectedBusiness._id}
              >
                <option disabled value="-1">
                  Seleccione una opcion
                </option>
                {this.state.businessList
                  .filter(business => !business.added)
                  .map(bussines => (
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
              <EditProviderList
                providers={businessList.filter(business => business.added)}
              />
            </FormGroup>

            <input
              className="submit_button"
              id="submit_button"
              type="submit"
              value="Registrarse"
            />
          </div>
        </form>
        <PaymentSection />
      </div>
    );
  }
}

export default SignupForm;
