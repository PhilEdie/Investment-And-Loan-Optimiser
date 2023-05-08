import AddAccountForm from "./View/AddAccountForm";
import "./App.css";
import StartingAccountsTable from "./View/StartingAccountsTable";
import ResultsTable from "./View/ResultsTable";
import { useDispatch, useSelector } from "react-redux";
import { selectStartingAccounts } from "./Model/StartingAccountsSlice";
import { runOptimiser } from "./Controller/AccountsController";
import currency from "currency.js";
import { set } from "./Model/HistorySlice";
import OptimiserSettingsControls from "./View/OptimiserSettingsControls";
import { selectOptimiserSettings } from "./Model/OptimiserSettingsSlice";

function App() {

  const startingAccounts = useSelector(selectStartingAccounts);
  const optimiserSettings = useSelector(selectOptimiserSettings);
  const dispatch = useDispatch(); 

  const run = () => {
    const history = runOptimiser(startingAccounts.accounts, 10, currency(10000));
    dispatch(set(history));
  }

  return (
    <div>
      <AddAccountForm/>
      <OptimiserSettingsControls/>
      <StartingAccountsTable/>
      <ResultsTable/>
    </div>
  );
}



export default App;
