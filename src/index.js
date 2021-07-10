import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

import "assets/scss/material-kit-react.scss?v=1.10.0";

// pages for this product
import qoreContext from "qoreContext";

ReactDOM.render(
  <qoreContext.context.Provider
    value={{
      client: qoreContext.client,
    }}
  >
    <App />
  </qoreContext.context.Provider>,
  document.getElementById("root")
);
