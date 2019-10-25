import React, { Component } from "react";
import Axios from "axios";

import { BASE_LOCAL_ENDPOINT, PROVIDER, CONTRACTOR } from "../../../constants";

import "../styles/Profile.scss";

import { Auth0Context } from "../../../components/Auth/react-auth0-wrapper";
import CommentForm from "../../../components/CommentForm";
import ServiceList from "../../../components/ServiceList";
import ProfileHeadline from "../../../components/ProfileHeadline";
import CommentList from "../../../components/CommentList";

class Profile extends Component {
  static contextType = Auth0Context;
  constructor(props) {
    super(props);
    this.state = {};
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

    const { profile } = this.context;

    Axios.get(`${BASE_LOCAL_ENDPOINT}/business/${id}?idRequest=${profile._id}`)
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

  updateProfile = data => {
    this.setState(prevState => ({
      ...prevState,
      score: data.score,
      comments: data.comments
    }));
  };

  render() {
    const {
      name,
      typeOfService,
      score,
      logo,
      services,
      isProvider,
      comments,
      _id
    } = this.state;
    const rates = [
      { id: "priceQuality", title: "Calidad/Precio" },
      { id: "puntuality", title: "Puntualidad" },
      { id: "communication", title: "Comunicación" },
      { id: "afterSalesService", title: "Servicio Posventa" }
    ];

    return (
      <div className="profile">
        <ProfileHeadline
          logo={logo}
          name={name}
          typeOfService={typeOfService}
          score={score}
        >
          <ProfileHeadline.Header />
          <ProfileHeadline.Body />
          <ProfileHeadline.Score>
            <ProfileHeadline.Score.Item
              label="Puntualidad"
              points={score && score.puntuality}
            />
            <ProfileHeadline.Score.Item
              label="Comunicación"
              points={score && score.communication}
            />
            <ProfileHeadline.Score.Item
              label="Servicio Posventa"
              points={score && score.afterSalesService}
            />
            <ProfileHeadline.Score.Item
              label="Calidad/Precio"
              points={score && score.priceQuality}
            />
          </ProfileHeadline.Score>
        </ProfileHeadline>

        <ServiceList
          services={services && services.servicesAsContractor}
          type={CONTRACTOR}
        />
        <ServiceList
          services={services && services.servicesAsProvider}
          type={PROVIDER}
        />
        {
          <CommentList>
            {comments &&
              comments.map(({ _id, name, description, general }) => (
                <CommentList.Comment
                  key={_id}
                  name={name}
                  description={description}
                  score={general}
                />
              ))}
          </CommentList>
        }
        {isProvider ? (
          <CommentForm
            rates={rates}
            id={_id}
            updateProfile={this.updateProfile}
          />
        ) : (
          "No puedes agregar comentarios a este perfil"
        )}
      </div>
    );
  }
}

export default Profile;
