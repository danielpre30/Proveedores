import React from "react";
import NavItem from "./NavItem";
import { Link as LinkSection } from "react-scroll";

const SectionLink = ({ label, to }) => {
  return (
    <NavItem>
      <LinkSection
        className="nav_item_link"
        to={to}
        smooth={true}
        duration={250}
      >
        {label}
      </LinkSection>
    </NavItem>
  );
};

export default SectionLink;
