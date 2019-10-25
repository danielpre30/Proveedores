import React from "react";

import "../styles/ScoreItem.scss";

import { NA } from "../../../constants";

const ScoreItem = ({ label, points }) => (
  <div className="score_item">
    <h4 className="score_item_title">{label}</h4>
    <div className="score_item_content">{points ? points : NA}</div>
  </div>
);

export default ScoreItem;
