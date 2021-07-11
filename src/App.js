import React, { useEffect } from "react";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.10.0";

// pages for this product
import LandingPage from "views/LandingPage/LandingPage.js";
import ReactGa from "react-ga";

var hist = createBrowserHistory();

const App = () => {
  useEffect(() => {
    ReactGa.initialize("UA-201612176-1");
    ReactGa.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <Router history={hist}>
      <Switch>
        <Route path="/" component={LandingPage} />
      </Switch>
    </Router>
  );
};

export default App;
