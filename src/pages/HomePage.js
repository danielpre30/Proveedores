import React from "react";
import "../styles/LandingPage.css";
import "../styles/HomePage.css";
import LandingSection from "../sections/LandingSection";
import NavBar from "../components/NavBar";
import ProvidersSection from "../sections/ProvidersSection";
import Scroll from "../resources/scroll.gif";
function LandingPage() {
  return (
    <>
      <NavBar logIn={true} />
      <LandingSection logIn={true} />
      <img className="scrollImage" src={Scroll} alt="scroll Image Gif" />
      <ProvidersSection />
    </>
  );
}

export default LandingPage;
