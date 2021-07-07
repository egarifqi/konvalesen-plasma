import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.10.0";

// pages for this product
import LandingPage from "views/LandingPage/LandingPage.js";
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
        <Route path="/" component={LandingPage} />
      </Switch>
    </Router>
  </qoreContext.context.Provider>,
  document.getElementById("root")
);
