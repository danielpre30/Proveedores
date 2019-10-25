import React from "react";

import "../styles/CommentList.scss";

import Comment from "./Comment";

const CommentList = props => (
  <div className="comments">
    <h2 className="comments_title">Comentarios</h2>
    <div className="comments_body">
      {React.Children.count(props.children)
        ? React.Children.map(props.children, child => {
            return React.isValidElement(child)
              ? React.cloneElement(child, { ...props })
              : child;
          })
        : "No hay comentarios"}
    </div>
  </div>
);

CommentList.Comment = Comment;

export default CommentList;
