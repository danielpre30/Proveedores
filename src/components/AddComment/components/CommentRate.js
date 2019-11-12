import React from "react";
import Rater from "react-rater";

import "../styles/CommentRate.scss";

const CommentRate = ({ title, id, handleChange, value }) => (
  <div className="rate_item">
    <h4>{title}</h4>
    <Rater
      onRate={({ rating }) => {
        handleChange(rating, id);
      }}
      rating={value}
    />
  </div>
);

export default CommentRate;
