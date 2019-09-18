import React from "react";
import "../styles/LandingPage.css";
import LandingSection from "../sections/LandingSection";
import NavBar from "../components/NavBar";
import PaymentSection from "../sections/PaymentSection";

function LandingPage() {
  return (
    <>
      <NavBar logIn={false} />
      <LandingSection NavBar logIn={false} />
      <PaymentSection />
    </>
  );
}

export default LandingPage;
