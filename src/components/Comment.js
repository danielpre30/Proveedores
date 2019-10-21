import React from "react";
import "../styles/Comment.css";
import star from "../resources/star.png";

const Comment = ({ name, description, score }) => {
  return (
    <div className="providers__commentCard">
      <p>
        {score} <img className="comment__star" src={star} alt="RateStar" />
      </p>
      <h3 className="comment__title">{name}:</h3>
      <span className="comment__description">{description}</span>
    </div>
  );
};

export default Comment;
