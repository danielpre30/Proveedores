import React, { Component } from "react";
import axios from "axios";
import { BASE_LOCAL_ENDPOINT } from "../constants";
import "../styles/ProfileSection.css";
import star from "../resources/star.png";
import Rater from "react-rater";
import "../styles/react-rater.css";
import Comment from "../components/Comment";
class ProfileSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyProfileDetail: {},
      isProvider: false,
      commentsList: []
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
    this.getComments();
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
        if (response.data[0].typeOfService === "Contratante") {
          this.setState({
            isProvider: true
          });
        } else {
          this.setState({
            isProvider: false
          });
        }
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
  getComments() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    axios
      .get(`${BASE_LOCAL_ENDPOINT}/Comments/${id}`)
      .then(response => {
        //debugger;
        this.setState({
          commentsList: response.data,
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
      companyProfileDetail: { id, name, typeOfService, score, logo, services },
      isProvider,
      commentsList
    } = this.state;

    let comments;
    if (isProvider) {
      comments = (
        <>
          <p>No existen comentarios para esta empresa</p>
        </>
      );
    } else {
      comments = (
        <>
          {commentsList.map(({ _id, businessName, description }) => (
            <Comment name={businessName} description={description} key={_id} />
          ))}
        </>
      );
    }
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
            <p>
              Puntualidad: <b>{score && score.puntuality}</b>
            </p>
          </div>

          <div className="ComunicationStar">
            <p>
              Comunicación:<b>{score && score.communication}</b>{" "}
            </p>
          </div>

          <div className="ServiceStar">
            <p>
              Servicio Posventa: <b>{score && score.afterSalesService}</b>
            </p>
          </div>

          <div className="QualityStar">
            <p>
              Calidad/Precio: <b>{score && score.priceQuality}</b>
            </p>
          </div>
        </div>

        <div className="OpinionsChart">
          <div className="profile__nav">
            <ul className="profile__list">
              <li>
                <a className="profile__list--link" href="">
                  Opiniones
                </a>
              </li>
              <li>
                <a className="profile__list--link" href="">
                  Servicios
                </a>
              </li>
            </ul>
          </div>

          <p>
            Mi lista de proveedores: <br />
            {services && services[0].name}
          </p>
          {comments}
          <div className="providers__comment">
            <h2>Agregar un nuevo comentario</h2>
            <div className="providers__comment--stars">
              <span id="calidad" className="providers__comment--span">
                Calidad/Precio:
                <Rater
                  total={5}
                  rating={0}
                  onRate={({ rating }) => {
                    console.log(rating);
                  }}
                />
              </span>

              <br />
              <span id="puntualidad" className="providers__comment--span">
                Puntualidad:
                <Rater
                  total={5}
                  rating={0}
                  onRate={({ rating }) => {
                    console.log(rating);
                  }}
                />
              </span>

              <br />
              <span id="comunicacion" className="providers__comment--span">
                Comunicación:
                <Rater
                  total={5}
                  rating={0}
                  onRate={({ rating }) => {
                    console.log(rating);
                  }}
                />
              </span>

              <br />
              <span id="posventa" className="providers__comment--span">
                Servicio Posventa:
                <Rater
                  total={5}
                  rating={0}
                  onRate={({ rating }) => {
                    console.log(rating);
                  }}
                />
              </span>
            </div>
            <div className="providers__comment--text">
              <textarea className="providers__comment--textArea"></textarea>
              <br />
              <button className="providers__comment--button">
                Enviar Comentario
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileSection;
