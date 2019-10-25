import React, { Component } from "react";
import Rater from "react-rater";
import Axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { BASE_LOCAL_ENDPOINT } from "../../../constants";

import "../styles/react-rater.scss";

import { Auth0Context } from "../../../components/Auth/react-auth0-wrapper";
import CommentRate from "./CommentRate";

class CommentForm extends Component {
  static contextType = Auth0Context;

  constructor(props) {
    super(props);
    this.state = {
      commentDescription: "",
      priceQuality: 0,
      puntuality: 0,
      communication: 0,
      afterSalesService: 0
    };
  }

  handleChange = (value, field) => {
    this.setState(prevState => ({
      ...prevState,
      [field]: value
    }));
  };

  sendComment = () => {
    const {
      commentDescription,
      priceQuality,
      puntuality,
      communication,
      afterSalesService
    } = this.state;
    const { profile } = this.context;
    const { id, updateProfile } = this.props;

    const MySwal = withReactContent(Swal);

    if (
      commentDescription &&
      priceQuality &&
      puntuality &&
      communication &&
      afterSalesService
    ) {
      const newComment = {
        target: id,
        description: commentDescription,
        business: profile._id,
        puntuality,
        communication,
        afterSalesService,
        priceQuality
      };

      Axios.post(`${BASE_LOCAL_ENDPOINT}/comments`, newComment).then(
        response => {
          updateProfile(response.data);
          MySwal.fire({
            type: "success",
            title: "¡Gracias!",
            text: "Tu comentario fue añadido exitósamente"
          });
        }
      );
    } else {
      MySwal.fire({
        type: "error",
        title: "Error",
        text: "Califica todas las categorías y asegúrate de dejar un comentario"
      });
    }
  };

  render() {
    const { rates } = this.props;

    return (
      <div className="commentForm">
        <h1 className="commentForm_header">Agregar un nuevo comentario</h1>

        <form
          className="commentForm_body"
          onSubmit={e => {
            e.preventDefault();
            this.sendComment();
          }}
        >
          <input
            className="commentForm_description"
            onChange={e =>
              this.handleChange(e.target.value, "commentDescription")
            }
          />

          <div className="commentForm_rate">
            {rates.map(({ id, title }) => (
              <CommentRate
                id={id}
                key={id}
                title={title}
                handleChange={this.handleChange}
                value={this.state[id]}
              />
            ))}
          </div>

          <button className="commentForm_button">Enviar Comentario</button>
        </form>
      </div>
    );
  }
}

export default CommentForm;
