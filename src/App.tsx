import AddAccountForm from "./View/AddAccountForm";
import "./App.css";
import StartingAccountsTable from "./View/StartingAccountsTable";
import ResultsTable from "./View/ResultsTable";
import OptimiserSettingsControls from "./View/OptimiserSettingsControls";
import LineChart from "./View/LineChart";

function App() {
  return (
    <div className="container">
    
      <h1 className="container mt-3">Investment And Loan Optimiser</h1>
        <AddAccountForm />
        <OptimiserSettingsControls />
        <StartingAccountsTable />
        <LineChart />
        <ResultsTable />
    </div>
  );
}

export default App;
