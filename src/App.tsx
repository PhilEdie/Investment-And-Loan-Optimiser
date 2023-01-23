import AddAccountForm from "./View/AddAccountForm";
import "./App.css";
import StartingAccountsTable from "./View/StartingAccountsTable";
import { AccountsController } from "./Controller/AccountsController";
import { useState } from "react";
import { Account } from "./Model/Account";

function App() {
  const [startingAccounts, setStartingAccounts] = useState<Account[]>([]);

  const addAccount = (account: Account) => {
    setStartingAccounts([...startingAccounts, account]);
  };

  return (
    <div>
      <AddAccountForm addAccount={addAccount} />
      <StartingAccountsTable startingAccounts={startingAccounts} />
    </div>
  );
}

export default App;
