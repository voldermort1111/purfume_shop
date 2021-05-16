import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";
import "assets/css/app.css";
import "react-notifications/lib/notifications.css";
import { Provider } from "react-redux";
import store from "redux/store";
import { NotificationContainer } from "react-notifications";
import App from "app";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
      <NotificationContainer />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
