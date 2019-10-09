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
  if (isAuthenticated) {
    if (hasAProfile) {
      return (
        <>
          <LandingSection />
          <img className="scrollImage" src={Scroll} alt="Scroll Gif" />
          <ProvidersSection />
        </>
      );
    } else {
      return <RegisterSection />;
    }
  } else {
    return (
      <>
        <LandingSection />
        <PaymentSection />
        <RegisterSection />
      </>
    );
  }
}

export default HomePage;
