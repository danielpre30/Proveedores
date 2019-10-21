import React from "react";
import "../styles/Comment.css";
const Comment = ({ name, description }) => {
  return (
    <div className="providers__commentCard">
      <h3 className="comment__title">{name}</h3>
      <span className="comment__description">{description}</span>
    </div>
  );
};

export default Comment;
