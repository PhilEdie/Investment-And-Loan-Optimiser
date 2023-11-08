import AddAccountForm from "./View/AddAccountForm";
import "./App.css";
import StartingAccountsTable from "./View/StartingAccountsTable";
import ResultsTable from "./View/ResultsTable";
import OptimiserSettingsControls from "./View/OptimiserSettingsControls";
import LineChart from "./View/LineChart";

function App() {
  return (
    <>
    
    <h1 className="App-header">Investment And Loan Optimiser</h1>
    <div className="pure-g">
        <AddAccountForm />
        <OptimiserSettingsControls />
        <StartingAccountsTable />
        <LineChart />
        <ResultsTable />
    </div>
    </>
  );
}

export default App;
