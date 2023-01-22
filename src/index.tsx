import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AccountsController } from "./Controller/AccountsController";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

export interface IGlobalContext {
  accountsController: AccountsController;
}

export const GlobalContext = React.createContext({ accountsController: new AccountsController() });

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);