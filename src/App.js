import React from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import history from "./history";

import "./resources/fonts/stylesheet.css";
import "./resources/animate.css";

import "./App.css";
import Home from "./pages/Home/";
import Profile from "./pages/Profile/";
import NavBar from "./components/Navbar/";
import PrivateRoute from "./components/Auth/PrivateRoute";
import { useAuth0 } from "./components/Auth/react-auth0-wrapper";
import SignupForm from "./components/SignupForm";

function App() {
  const { loading } = useAuth0();

  return (
    <HashRouter history={history}>
      {loading ? (
        <div>Cargando</div>
      ) : (
        <>
          <NavBar />

          <div className="main">
            <Switch>
              <Route exact path="/" render={() => <Redirect to="/home" />} />
              <Route exact path="/home" component={Home} />
              <PrivateRoute exact path="/business/:id" component={Profile} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/profile/" component={Profile} />
              <PrivateRoute
                exact
                path="/profile/edit/"
                component={SignupForm}
              />
            </Switch>
          </div>
          <div className="footer">
            Copyright © 2019 UpCluster. All Rights Reserved.
          </div>
        </>
      )}
    </HashRouter>
  );
}

export default App;
