import React from "react";
import "../styles/LandingPage.css";
import "../styles/HomePage.css";
import LandingSection from "../sections/LandingSection";
import ProvidersSection from "../sections/ProvidersSection";
import PaymentSection from "../sections/PaymentSection";
import RegisterSection from "../sections/RegisterSection";
import Scroll from "../resources/scroll.gif";
import { useAuth0 } from "../Auth/react-auth0-wrapper";

function HomePage() {
  const { isAuthenticated, hasAProfile } = useAuth0();
  let homePage;
  if (isAuthenticated) {
    if (hasAProfile) {
      homePage = (
        <>
          <LandingSection />
          <img className="scrollImage" src={Scroll} alt="Scroll Gif" />
          <ProvidersSection />
        </>
      );
    } else {
      homePage = <RegisterSection />;
    }
  } else {
    homePage = (
      <>
        <LandingSection />
        <PaymentSection />
        <RegisterSection />
      </>
    );
  }
  return <div className="home_page">{homePage}</div>;
}

export default HomePage;
