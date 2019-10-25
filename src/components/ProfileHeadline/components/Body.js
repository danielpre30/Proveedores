import React from "react";

import { NA } from "../../../constants";

import Star from "../../../resources/star.png";

const Body = ({ logo, score }) => (
  <div className="profile_body">
    <div className="profile_picture">
      <img src={logo} alt="" className="profile_picture_image" />
    </div>

    <div className="rateBox">
      <img className="rateBox_star" src={Star} alt="Star" />
      <div className="rateBox_text">
        Puntuación:
        <div className="rateBox_number">
          {score && score.general ? score.general : NA}
        </div>
      </div>
    </div>
  </div>
);

export default Body;
