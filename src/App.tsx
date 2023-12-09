import AddAccountForm from "./View/AddAccountForm";
import "./App.css";
import StartingAccountsTable from "./View/StartingAccountsTable";
import ResultsTable from "./View/ResultsTable";
import LineChart from "./View/LineChart";

function App() {
  return (
    <div className="container">
      <h1 className="mt-3 mb-3 text-center">Investment & Loan Optimiser</h1>
        <AddAccountForm />
        <StartingAccountsTable />
        <LineChart />
        <ResultsTable />
    </div>
  );
}

export default App;
