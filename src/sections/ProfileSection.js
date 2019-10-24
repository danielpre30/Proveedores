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
  static contextType = Auth0Context;
  constructor(props) {
    super(props);
    this.state = {
      companyProfileDetail: {},
      isContractor: false,
      commentsList: [],
      textComment: "",
      count: 1,
      id: "",
      servicesState: [],
      qualityRating: 1,
      puntualityRating: 1,
      communicationRating: 1,
      serviceRating: 1,
      generalRating: 1,
      validate: false
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
    this.getServices();
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
            isContractor: true
          });
        } else {
          this.setState({
            isContractor: false,
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
    var tmpPuntu = 0,
      tmpCommu = 0,
      tmpGeneral = 0,
      tmpServ = 0,
      tmpQua = 0;
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
          error: "",
          count: response.data.length
        });
        var scoreArray = [];
        this.state.commentsList.map(
          ({ _id, businessName, description, givenScore }) =>
            scoreArray.push(givenScore)
        );

        for (var i = 0; i < scoreArray.length; i++) {
          tmpPuntu += scoreArray[i].puntuality;
          tmpCommu += scoreArray[i].communication;
          tmpGeneral += scoreArray[i].general;
          tmpServ += scoreArray[i].afterSalesService;
          tmpQua += scoreArray[i].priceQuality;
        }
        this.setState({
          qualityRating: Math.floor(tmpQua / this.state.count),
          puntualityRating: Math.floor(tmpPuntu / this.state.count),
          communicationRating: Math.floor(tmpCommu / this.state.count),
          serviceRating: Math.floor(tmpServ / this.state.count),
          generalRating: Math.floor(tmpGeneral / this.state.count)
        });
      })
      .catch(error => {
        this.setState({
          error: error.message
        });
      });
  }
  getServices() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    const { profile } = this.context;
    axios
      .get(`${BASE_LOCAL_ENDPOINT}/services/${id}&${profile._id}`)
      .then(response => {
        if (response.data.length !== 0) {
          this.setState({
            validate: true
          });
        } else {
          this.setState({
            validate: false
          });
        }
        console.log("Hola");
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
    profile
  ) => {
    e.preventDefault();
    const MySwal = withReactContent(Swal);
    var general;
    if (
      ratingQuality === undefined ||
      ratingPuntuality === undefined ||
      ratingCommunication === undefined ||
      ratingService === undefined ||
      this.state.textComment === ""
    ) {
      MySwal.fire({
        type: "error",
        title: "Error",
        text: "Califica todas las categorías y asegurate de dejar un comentario"
      });
    } else {
      general = Math.floor(
        (ratingQuality +
          ratingPuntuality +
          ratingCommunication +
          ratingService) /
          4
      );
      const newComment = {
        target: id,
        description: this.state.textComment,
        businessName: profile.name,
        business: profile._id,
        givenScore: {
          general: general,
          puntuality: ratingPuntuality,
          communication: ratingCommunication,
          afterSalesService: ratingService,
          priceQuality: ratingQuality
        }
      };
      axios
        .post(`${BASE_LOCAL_ENDPOINT}/Comments`, newComment)
        .then(response => {
          MySwal.fire({
            type: "success",
            title: "Comentario añadido",
            text: "Comentario añadido correctamente"
          });
          console.log(response);
          window.location.reload();
        });
    }
  };

  render() {
    const { profile } = this.context;
    const {
      companyProfileDetail: { name, typeOfService, logo },
      isContractor,
      servicesState,
      commentsList,
      id,
      qualityRating,
      puntualityRating,
      communicationRating,
      serviceRating,
      generalRating,
      validate
    } = this.state;
    var ratingQuality, ratingPuntuality, ratingCommunication, ratingService;
    let comments;
    let servicesArray;
    servicesArray = (
      <>
        {servicesState.map(({ typeOfService, name, contrato }) => (
          <li key={contrato}>
            <b>{typeOfService}</b> de <b>{name}</b>
          </li>
        ))}
      </>
    );

    if (isContractor && !validate) {
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
                    generalRating,
                    id,
                    profile
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
      <div className="profile">
        <div className="profile_header">
          <h1 className="profile_title">{name}</h1>
          <h2 className="profile_subtitle">{typeOfService}</h2>
        </div>
        <div className="profile_body">
          <img src={logo} alt="" className="profile_picture" />

          <div className="rateBox">
            <span className="rateBox_text">{generalRating}</span>
            <img className="rateBox_star" src={star} alt="Star" />
          </div>
        </div>

        <div className="score">
          <div className="score_item">
            Puntualidad: <b>{puntualityRating}</b>
          </div>

          <div className="score_item">
            Comunicación: <b>{communicationRating}</b>{" "}
          </div>

          <div className="score_item">
            Servicio Posventa: <b>{serviceRating}</b>
          </div>

          <div className="score_item">
            Calidad/Precio: <b>{qualityRating}</b>
          </div>
        </div>
        <div className="services">
          <h2>Servicios</h2>
          <ul>{servicesArray}</ul>
        </div>
        {comments}
      </div>
    );
  }
}

export default ProfileSection;
