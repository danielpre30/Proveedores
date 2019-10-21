import React, { Component } from "react";
import "../styles/Card.css";
import ProviderCard from "../components/Card";
import { BASE_LOCAL_ENDPOINT } from "../constants";
import "../styles/ProvidersSection.css";
import axios from "axios";
import { Auth0Context } from "../Auth/react-auth0-wrapper";

import Rater from "react-rater";
import "../styles/react-rater.css";
class CardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      name: "",
      logo: "",
      typeOfService: "",
      score: "",
      filterText: ""
    };
  }

  static contextType = Auth0Context;

  sortList = (a, b) => {
    return b.score && a.score ? b.score.general - a.score.general : a;
  };
  handleChange = (e, field) => {
    var value =
      field === "filterText" ? e.target.value.toLowerCase() : e.target.value;

    this.setState({
      [field]: value //Los corchetes son para hacer referencia a la clave a partir de un string
    });
  };
  componentDidMount() {
    const { user } = this.context;
    this.getObjects(`business?every=true&email=${user.email}`);
  }
  getObjects(url) {
    axios
      .get(`${BASE_LOCAL_ENDPOINT}/${url}`)
      .then(response => {
        this.setState({
          list: response.data.sort(this.sortList)
        });
      })
      .catch(error => {
        // handle error
        console.error(error);
        this.setState({
          error: error.message
        });
      });
  }
  render() {
    const { list, filterText } = this.state;
    let cards;
    const filteredList = list
      .sort(this.sortList)
      .filter(
        val =>
          val.typeOfService.toLowerCase().includes(filterText) ||
          val.name.toLowerCase().includes(filterText)
      );
    cards = (
      <>
        {filteredList.map(({ _id, name, logo, typeOfService, score }) => (
          <ProviderCard
            name={name}
            logo={logo}
            typeOfService={typeOfService}
            score={score ? score.general : "N/A"}
            key={_id}
            id={_id}
          />
        ))}
      </>
    );
    return (
      <div>
        <div>
          <input
            placeholder="Nombre o tipo de servicio"
            className="providers__input"
            onChange={e => {
              this.handleChange(e, "filterText");
            }}
          ></input>
        </div>
        <div className="providers__card-container">{cards}</div>
      </div>
    );
  }
}

export default CardContainer;
