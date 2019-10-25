import React from "react";

import "../styles/Home.scss";
import Scroll from "../../../resources/scroll.gif";

import Headline from "../../../components/Headline/components/Headline";
import ProviderList from "../../../components/ProviderList";
import SignupForm from "../../../components/SignupForm";
import { useAuth0 } from "../../../components/Auth/react-auth0-wrapper";

function Home() {
  const { isAuthenticated, hasAProfile } = useAuth0();
  let homePage;
  if (isAuthenticated) {
    if (hasAProfile) {
      homePage = (
        <>
          <Headline />
          <img className="scrollImage" src={Scroll} alt="Scroll Gif" />
          <ProviderList />
        </>
      );
    } else {
      homePage = <SignupForm />;
    }
  } else {
    homePage = (
      <>
        <Headline />
      </>
    );
  }
  return <div className="home_page">{homePage}</div>;
}

export default Home;
