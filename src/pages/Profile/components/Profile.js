import React, { Component } from "react";
import Axios from "axios";

import { BASE_LOCAL_ENDPOINT } from "../../../constants";

import "../styles/Profile.css";
import "../styles/react-rater.css";
import star from "../../../resources/star.png";

import Comment from "../../../components/Comment";
import { Auth0Context } from "../../../components/Auth/react-auth0-wrapper";
import CommentForm from "../../../components/CommentForm/components/CommentForm";

class Profile extends Component {
  static contextType = Auth0Context;
  constructor(props) {
    super(props);
    this.state = {
      isContractor: false,
      commentsList: []
    };
  }

  componentDidMount() {
    this.getProfile();
  }

  getProfile() {
    const {
      match: {
        params: { id }
      }
    } = this.props;

    Axios.get(`${BASE_LOCAL_ENDPOINT}/business/${id}`)
      .then(response => {
        this.setState(prevState => ({
          ...prevState,
          ...response.data
        }));
      })
      .catch(error => {
        this.setState(prevState => ({ ...prevState, error: error.message }));
      });
  }

  render() {
    const {
      name,
      typeOfService,
      score,
      logo,
      isContractor,
      servicesState,
      commentsList
    } = this.state;
    let comments;
    let servicesArray;
    const rates = [
      { id: "priceQuality", title: "Calidad/Precio" },
      { id: "puntuality", title: "Puntualidad" },
      { id: "communication", title: "Comunicación" },
      { id: "afterSalesService", title: "Servicio Posventa" }
    ];
    // servicesArray = (
    //   <>
    //     {servicesState.map(({ typeOfService, name, contrato }) => (
    //       <li key={contrato}>
    //         <b>{typeOfService}</b> de <b>{name}</b>
    //       </li>
    //     ))}
    //   </>
    // );

    comments = isContractor ? (
      <>
        <p>No existen comentarios para esta empresa</p>
      </>
    ) : (
      <>
        <h2>Comentarios</h2>
        {commentsList.map(({ _id, businessName, description, givenScore }) => (
          <Comment
            name={businessName}
            description={description}
            score={givenScore.general}
            key={_id}
          />
        ))}
        <CommentForm rates={rates} />
      </>
    );

    return (
      <div className="profile">
        <div className="profile_header">
          <h1 className="profile_title">{name}</h1>
          <h2 className="profile_subtitle">{typeOfService}</h2>
        </div>
        <div className="profile_body">
          <img src={logo} alt="" className="profile_picture" />

          <div className="rateBox">
            <span className="rateBox_text">{score && score.general}</span>
            <img className="rateBox_star" src={star} alt="Star" />
          </div>
        </div>

        <div className="score">
          <div className="score_item">
            Puntualidad: <b>{score && score.puntuality}</b>
          </div>

          <div className="score_item">
            Comunicación: <b>{score && score.communication}</b>{" "}
          </div>

          <div className="score_item">
            Servicio Posventa: <b>{score && score.afterSalesService}</b>
          </div>

          <div className="score_item">
            Calidad/Precio: <b>{score && score.priceQuality}</b>
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

export default Profile;
