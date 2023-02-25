import AddAccountForm from "./View/AddAccountForm";
import "./App.css";
import StartingAccountsTable from "./View/StartingAccountsTable";
import { AccountsController } from "./Controller/AccountsController";
import { useState } from "react";
import { Account } from "./Model/Account";
import ResultsTable from "./View/ResultsTable";
import currency from "currency.js";

function App() {

  // const run = () => {
  //   const accountsController = new AccountsController();
  //   accountsController.getAccountsModel().setStartingAccounts(startingAccounts);
  //   accountsController.run(10, currency(10000));
  //   console.log(accountsController.getAccountsModel().getHistory());
  // }

  return (
    <div>
      <AddAccountForm/>
      <StartingAccountsTable/>
      {/* <button onClick={() => run()}>Start</button> */}
    </div>
  );
}



export default App;
