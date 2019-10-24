import React, { Component } from "react";
import Rater from "react-rater";
import Axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { BASE_LOCAL_ENDPOINT } from "../../../constants";

import { Auth0Context } from "../../../components/Auth/react-auth0-wrapper";

class CommentForm extends Component {
  static contextType = Auth0Context;

  constructor(props) {
    super(props);
    this.state = {
      commentDescription: "",
      general: 0,
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
    const { id } = this.props;

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
        text: "Califica todas las categorías y asegurate de dejar un comentario"
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
              <div key={id} className="commentForm_rate_item">
                {title}
                <Rater
                  onRate={({ rating }) => {
                    this.handleChange(rating, id);
                  }}
                />
              </div>
            ))}
          </div>

          <button className="commentForm_button">Enviar Comentario</button>
        </form>
      </div>
    );
  }
}

export default CommentForm;
