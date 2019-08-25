import React from 'react';
import './App.css';
import './resources/fonts/stylesheet.css';
import NavBar from './components/NavBar';


import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <HashRouter>
      <NavBar />
      <div className="main">
      <Switch>
          <Route exact path="/"
            render={() => (
              <Redirect to="/inicio" />
            )}
          />
          <Route exact path="/inicio" component={LandingPage} />
          
        </Switch>
        <div className="footer">
          Copyright © 2019 UpCluster. All Rights Reserved.
        </div>
      </div>
    </HashRouter>
  );
}

export default App;
