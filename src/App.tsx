import AddAccountForm from "./View/AddAccountForm";
import "./App.css";
import StartingAccountsTable from "./View/StartingAccountsTable";


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
    </div>
  );
}



export default App;
