import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AccountsController } from "./Controller/AccountsController";
import { Provider } from "react-redux";
import store from "./Model/Store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);


root.render(
  <Provider store={store}>
    <App />
  </Provider>
);