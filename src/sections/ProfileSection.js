import React, { Component } from "react";
import axios from "axios";
import { BASE_LOCAL_ENDPOINT } from "../constants";
import "../styles/ProfileSection.css";
import star from "../resources/star.png";
import Rater from "react-rater";
import "../styles/react-rater.css";
import Comment from "../components/Comment";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Auth0Context } from "../Auth/react-auth0-wrapper";
class ProfileSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyProfileDetail: {},
      isContractor: false,
      commentsList: [],
      textComment: "",
      count: 1,
      score: {},
      id: "",
      servicesState: []
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
        console.log(response.data[0]);

        if (response.data[0].typeOfService === "Contratante") {
          this.setState({
            isContractor: true
          });
        } else {
          this.setState({
            isContractor: false,
            count: response.data[0].score.count,
            score: response.data[0].score,
            id: id
          });
        }
        //debugger;
        this.setState({
          companyProfileDetail: response.data[0],
          servicesState: response.data[0].services,
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
  handleChange = e => {
    this.setState({ textComment: e.target.value });
  };
  sendComment = (
    e,
    ratingQuality,
    ratingPuntuality,
    ratingCommunication,
    ratingService,
    generalScore,
    id,
    profile,
    services
  ) => {
    e.preventDefault();
    console.log(services);

    var general;
    if (
      ratingQuality == undefined ||
      ratingPuntuality === undefined ||
      ratingCommunication === undefined ||
      ratingService === undefined ||
      this.state.textComment === ""
    ) {
      const MySwal = withReactContent(Swal);
      MySwal.fire({
        type: "error",
        title: "Error",
        text: "Califica todas las categorías y asegurate de dejar un comentario"
      });
    } else {
      var tmpCount = this.state.count + 1;
      general =
        (ratingQuality +
          ratingPuntuality +
          ratingCommunication +
          ratingService) /
        generalScore;
      axios
        .post(`${BASE_LOCAL_ENDPOINT}/Comments/`, {
          idTo: id.toString(),
          description: this.state.textComment.toString,
          businessName: "Nathalia",
          business: "12233344",
          givenScore: {
            general: (this.state.score.general + general) / tmpCount,
            puntuality:
              (this.state.score.puntuality + ratingPuntuality) / tmpCount,
            communication:
              (this.state.score.communication + ratingCommunication) / tmpCount,
            afterSalesService:
              (this.state.score.afterSalesService + ratingService) / tmpCount,
            priceQuality:
              (this.state.score.priceQuality + ratingQuality) / tmpCount,
            count: tmpCount
          }
        })
        .then(function(response) {
          window.location.reload();
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  };
  static contextType = Auth0Context;

  render() {
    const {
      companyProfileDetail: { name, typeOfService, score, logo, services },
      isContractor,
      servicesState,
      commentsList,
      id
    } = this.state;

    const { profile } = this.context;

    var ratingQuality, ratingPuntuality, ratingCommunication, ratingService;
    let comments;
    let servicesArray;
    servicesArray = (
      <>
        {servicesState.map(({ typeOfService, name, contrato }) => (
          <li key={contrato}>
            <b>{typeOfService}s</b> de <b>{name}</b>
          </li>
        ))}
      </>
    );

    // for (var i = 0; i < services.length(); i++) {
    //   servicesArray.push(
    //     <li>
    //       <b>{services && services[i].typeOfService}s</b> de{" "}
    //       <b>{services && services[i].name}</b>
    //     </li>
    //   );
    // }

    if (isContractor) {
      comments = (
        <>
          <p>No existen comentarios para esta empresa</p>
        </>
      );
    } else {
      comments = (
        <>
          <h2>Comentarios</h2>
          {commentsList.map(
            ({ _id, businessName, description, givenScore }) => (
              <Comment
                name={businessName}
                description={description}
                score={givenScore.general}
                key={_id}
              />
            )
          )}
          <div className="providers__comment">
            <h3>Agregar un nuevo comentario</h3>

            <div className="providers__comment--text">
              <textarea
                onChange={this.handleChange}
                className="providers__comment--textArea"
              ></textarea>
              <div className="providers__comment--stars">
                <span id="calidad" className="providers__comment--span">
                  Calidad/Precio:
                  <Rater
                    total={5}
                    rating={0}
                    onRate={({ rating }) => {
                      ratingQuality = rating;
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
                      ratingPuntuality = rating;
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
                      ratingCommunication = rating;
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
                      ratingService = rating;
                    }}
                  />
                </span>
              </div>
              <br />
              <button
                className="providers__comment--button"
                onClick={e => {
                  this.sendComment(
                    e,
                    ratingQuality,
                    ratingPuntuality,
                    ratingCommunication,
                    ratingService,
                    score && score.general,
                    id,
                    profile,
                    services
                  );
                }}
              >
                Enviar Comentario
              </button>
            </div>
          </div>
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

          <div className="providers__servicios">
            <h2>Servicios</h2>
            <ul>{servicesArray}</ul>
          </div>
          {comments}
        </div>
      </div>
    );
  }
}

export default ProfileSection;
