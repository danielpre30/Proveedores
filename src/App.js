import React from "react";
import "./App.css";
import "./resources/fonts/stylesheet.css";
import "./resources/animate.css";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NavBar from "./components/Navbar";
import history from "./history";
import PrivateRoute from "./components/PrivateRoute";
import { useAuth0 } from "./Auth/react-auth0-wrapper";
import ProfileSection from "./sections/ProfileSection";

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
              <Route exact path="/home" component={HomePage} />
              <PrivateRoute
                exact
                path="/business/:id"
                component={ProfileSection}
              />
            </Switch>
            <div className="footer">
              Copyright © 2019 UpCluster. All Rights Reserved.
            </div>
          </div>
        </>
      )}
    </HashRouter>
  );
}

export default App;
