import React from "react";

import "../styles/Score.scss";

import ScoreItem from "./ScoreItem";

const Score = ({ score, children }) => (
  <div className="score">
    {React.Children.map(children, child => {
      return React.isValidElement(child)
        ? React.cloneElement(child, { score, children })
        : child;
    })}
  </div>
);

Score.Item = ScoreItem;

export default Score;
