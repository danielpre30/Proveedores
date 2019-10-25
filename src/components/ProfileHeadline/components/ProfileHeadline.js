import React from "react";

import Header from "./Header";
import Body from "./Body";
import Score from "./Score";

const ProfileHeadline = ({ logo, name, typeOfService, score, children }) => {
  return (
    <div className="profile_headline">
      {React.Children.map(children, child => {
        return React.isValidElement(child)
          ? React.cloneElement(child, { logo, name, typeOfService, score })
          : child;
      })}
    </div>
  );
};

ProfileHeadline.Header = Header;
ProfileHeadline.Body = Body;
ProfileHeadline.Score = Score;

export default ProfileHeadline;
