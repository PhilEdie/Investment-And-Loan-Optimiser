import AddAccountForm from "./View/AddAccountForm";
import "./App.css";
import StartingAccountsTable from "./View/StartingAccountsTable";
import ResultsTable from "./View/ResultsTable";
import { useDispatch, useSelector } from "react-redux";
import { selectStartingAccounts } from "./Model/StartingAccountsSlice";
import { runOptimiser } from "./Controller/AccountsController";
import currency from "currency.js";
import { set } from "./Model/HistorySlice";

function App() {

  const startingAccounts = useSelector(selectStartingAccounts);
  const dispatch = useDispatch(); 

  const run = () => {
    const history = runOptimiser(startingAccounts.accounts, 10, currency(10000));
    console.log(history);
    dispatch(set(history));
  }

  return (
    <div>
      <AddAccountForm/>
      <button onClick={(e) => run()}>Run</button>
      <StartingAccountsTable/>
      <ResultsTable/>
    </div>
  );
}



export default App;
