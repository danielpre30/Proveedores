import React from "react";
import "./App.css";
import "./resources/fonts/stylesheet.css";
import "./resources/animate.css";

import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import history from "./history";
import PrivateRoute from "./components/PrivateRoute";
function App() {
  return (
    <HashRouter history={history}>
      <div className="main">
        <NavBar logIn={false} />
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/home" />} />
          <Route exact path="/home" component={HomePage} />
          {/*TODO: Agregar componente de detalle de proveedor*/}
          <PrivateRoute path="/business/:id" />{" "}
        </Switch>
        <div className="footer">
          Copyright © 2019 UpCluster. All Rights Reserved.
        </div>
      </div>
    </HashRouter>
  );
}

export default App;
