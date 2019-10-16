import React, { Component } from "react";
import axios from "axios";
import { BASE_LOCAL_ENDPOINT } from "../constants";
import "../styles/ProfileSection.css";
import star from "../resources/star.png";

class ProfileSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyProfileDetail: {}
    };
  }

  handleChange = (e, field) => {
    const value = e.target.value;
    this.setState(prevState => {
      return {
        companyProfileDetail: {
          ...prevState.companyProfileDetail,
          [field]: value //Los corchetes son para hacer referencia a la clave a partir de un string
        }
      };
    });
  };
  componentDidMount() {
    this.getObjects();
  }

  getObjects() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    axios

      .get(`${BASE_LOCAL_ENDPOINT}/business/${id}`)
      .then(response => {
        //debugger;
        this.setState({
          companyProfileDetail: response.data[0],
          error: ""
        });
      })
      .catch(error => {
        this.setState({
          error: error.message
        });
      });
  }

  render() {
    const {
      companyProfileDetail: { id, name, typeOfService, score, logo, services }
    } = this.state;

    return (
      <div className="ProfileCanvas">
        <div className="TitleText">
          <h1>{name}</h1>
        </div>

        <div className="SubtitleText">
          <h1>{typeOfService}</h1>
        </div>

        <img src={logo} alt="" className="ProfilePic" />

        <div className="RateBox">
          <h1 className="RateText">{score && score.general}</h1>
          <img className="Ratestar" src={star} alt="RateStar" />
        </div>

        <div className="StarBox">
          <div className="PuntualityStar">
            <ul>
              <h3>Puntualidad: {score && score.puntuality}</h3>
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
              <h3>Comunicación: {score && score.communication}</h3>
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
              <h3>Servicio Posventa: {score && score.afterSalesService}</h3>
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
              <h3>Calidad/Precio: {score && score.priceQuality}</h3>
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
            Mi lista de proveedores: <br />
            {services && services[0].name}
          </p>
        </div>
      </div>
    );
  }
}

export default ProfileSection;
