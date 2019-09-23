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
      score: ""
    };
  }
  componentDidMount() {
    this.getObjects("business");
  }
  getObjects(url) {
    axios
      .get(`${BASE_LOCAL_ENDPOINT}/${url}`)
      .then(response => {
        this.setState({
          list: response.data.map(current => {
            return { ...current };
          })
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
    const { list } = this.state;
    let cards;
    cards = (
      <>
        {list.map(({ _id, name, logo, typeOfService, score }) => (
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
    return <div className="providers__card-container">{cards}</div>;
  }
}

export default CardContainer;
