import React from "react";

import "../styles/Comment.scss";
import star from "../../../resources/star.png";

const Comment = ({ name, description, score }) => {
  return (
    <div className="comment">
      <div className="comment_score">
        {score} <img className="comment_star" src={star} alt="Rate Star" />
      </div>
      <div className="comment_body">
        <h3 className="comment_title">{name}:</h3>
        <div className="comment_description">{description}</div>
      </div>
    </div>
  );
};

export default Comment;
