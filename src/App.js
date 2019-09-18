import React from "react";
import "./App.css";
import "./resources/fonts/stylesheet.css";
import "./resources/animate.css";

import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <HashRouter>
      <div className="main">
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/inicio" />} />
          <Route exact path="/inicio" component={LandingPage} />
          <Route exact path="/home" component={HomePage} />
        </Switch>
        <div className="footer">
          Copyright © 2019 UpCluster. All Rights Reserved.
        </div>
      </div>
    </HashRouter>
  );
}

export default App;
