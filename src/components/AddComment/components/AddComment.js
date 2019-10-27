import React, { Component } from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { BASE_LOCAL_ENDPOINT } from "../../../constants";

import "../styles/react-rater.scss";
import "../styles/AddComment.scss";

import { Auth0Context } from "../../Auth/react-auth0-wrapper";
import CommentRate from "./CommentRate";

class AddComment extends Component {
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
          this.setState(prevState => ({
            ...prevState,
            commentDescription: "",
            priceQuality: 0,
            puntuality: 0,
            communication: 0,
            afterSalesService: 0
          }));
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
    const { commentDescription } = this.state;
    return (
      <div className="addComment">
        <h2 className="addComment_title">Agregar un nuevo comentario</h2>
        <div className="addComment_body">
          <form
            className="addComment_form"
            onSubmit={e => {
              e.preventDefault();
              this.sendComment();
            }}
          >
            <textarea
              value={commentDescription}
              className="addComment_description"
              onChange={e =>
                this.handleChange(e.target.value, "commentDescription")
              }
              placeholder="Escribe un comentario sobre la empresa"
              maxLength="300"
            />

            <div className="addComment_rate">
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

            <button className="addComment_button">Enviar Comentario</button>
          </form>
        </div>
      </div>
    );
  }
}

export default AddComment;
