import React from "react";
import Rater from "react-rater";

const CommentRate = ({ title, id, handleChange, value }) => (
  <div className="commentForm_rate_item">
    {title}
    <Rater
      onRate={({ rating }) => {
        handleChange(rating, id);
      }}
      rating={value}
    />
  </div>
);

export default CommentRate;
