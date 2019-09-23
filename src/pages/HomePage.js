import React from "react";
import "../styles/LandingPage.css";
import "../styles/HomePage.css";
import LandingSection from "../sections/LandingSection";
import ProvidersSection from "../sections/ProvidersSection";
import PaymentSection from "../sections/PaymentSection";
import Scroll from "../resources/scroll.gif";
import { useAuth0 } from "../Auth/react-auth0-wrapper";

function HomePage() {
  const { isAuthenticated } = useAuth0();
  return (
    <>
      {isAuthenticated ? (
        <>
          <LandingSection />
          <img className="scrollImage" src={Scroll} alt="Scroll Gif" />
          <ProvidersSection />
        </>
      ) : (
        <>
          <LandingSection />
          <PaymentSection />
        </>
      )}
    </>
  );
}

export default HomePage;
