import React from "react";
import AddAccountForm from "./View/AddAccountForm";
import "./App.css";
import { GlobalContext, GlobalContextSingleton } from "./GlobalContextSingleton";
import { AccountsController } from "./Controller/AccountsController";

function App() {
  const globalContext = GlobalContextSingleton.getInstance();
  return (
    <AddAccountForm />
  );
}

export default App;
