import React, { Component } from "react";
import "../styles/Card.css";
import ProviderCard from "../components/Card";
import { BASE_LOCAL_ENDPOINT } from "../constants";
import "../styles/ProvidersSection.css";
import axios from "axios";

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
  sortList = (a, b) => {
    return b.score.general - a.score.general;
  };
  handleChange = (e, field) => {
    var value =
      field === "filterText" ? e.target.value.toLowerCase() : e.target.value;

    this.setState({
      [field]: value //Los corchetes son para hacer referencia a la clave a partir de un string
    });
  };
  componentDidMount() {
    this.getObjects("business");
  }
  getObjects(url) {
    axios
      .get(`${BASE_LOCAL_ENDPOINT}/${url}`)
      .then(response => {
        console.log(response.data.sort(this.sortList));
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
            score={score.general}
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
