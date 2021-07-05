import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.10.0";

// pages for this product
import Components from "views/Components/Components.js";
import LandingPage from "views/LandingPage/LandingPage.js";
import ProfilePage from "views/ProfilePage/ProfilePage.js";
import LoginPage from "views/LoginPage/LoginPage.js";
import qoreContext from "qoreContext";

var hist = createBrowserHistory();

ReactDOM.render(
  <qoreContext.context.Provider
    value={{
      client: qoreContext.client,
    }}
  >
    <Router history={hist}>
      <Switch>
        <Route path="/submit-form" component={LandingPage} />
        <Route path="/profile-page" component={ProfilePage} />
        <Route path="/login-page" component={LoginPage} />
        <Route path="/" component={Components} />
      </Switch>
    </Router>
  </qoreContext.context.Provider>,
  document.getElementById("root")
);
