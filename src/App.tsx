import AddAccountForm from "./View/AddAccountForm";
import "./App.css";
import StartingAccountsTable from "./View/StartingAccountsTable";
import ResultsTable from "./View/ResultsTable";
import { useDispatch, useSelector } from "react-redux";
import { selectStartingAccounts } from "./Model/StartingAccountsSlice";
import { runOptimiser } from "./Controller/AccountsController";
import currency from "currency.js";
import { selectHistory, set } from "./Model/HistorySlice";
import OptimiserSettingsControls from "./View/OptimiserSettingsControls";
import { selectOptimiserSettings } from "./Model/OptimiserSettingsSlice";
import LineChart from "./View/LineChart";

function App() {
  return (
    <>
      <div className="pure-g">
        {/* <div className="pure-u-1-4" /> */}
        <span>
          <AddAccountForm />
          </span>
      </div>
      <div className="pure-g">
      <div className="pure-u-1-3" />
          <OptimiserSettingsControls />
      </div>
      <div className="pure-g">
        <div className="pure-u-1-3" />
          <StartingAccountsTable />
      </div>
      <div className="pure-g">
      <div className="pure-u-1-3"/>
          <LineChart />
        </div>
      <div className="pure-g">
      <div className="pure-u-1-3" />
          <ResultsTable />
      </div>
    </>
  );
}

export default App;
