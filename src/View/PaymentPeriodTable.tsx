import { Account } from "../Model/Account";
import { Loan } from "../Model/Loan";
import { Utilities } from "../Utilities";

export interface ResultsIterationTableProps {
  paymentPeriod: Account[];
}

const PaymentPeriodTable = ({ paymentPeriod }: ResultsIterationTableProps) => {
  return (
    <div className="table-responsive">
    <table
      className="table table-bordered"
      style={{ width: "100%" }}
    >
      <thead>
        <tr>
          <th scope="col">Account Name</th>
          <th scope="col">Account Type</th>
          <th scope="col">Interest Rate</th>
          <th scope="col">Payments Made</th>
          <th scope="col">Balance</th>
          <th scope="col">Interest For Period</th>
        </tr>
      </thead>
      <tbody>
        {paymentPeriod.map((account) => (
          
          <tr key={account.getAccountName()}>
            <td>{account.getAccountName()}</td>
            <td>{account instanceof Loan ? "Loan" : "Investment"}</td>
            <td style={{ textAlign: "right" }}>
              {((account.getInterestRate() - 1) * 100).toFixed(3)}%
            </td>
            <td style={{ textAlign: "right" }}>
              {account.getPaymentForPeriod().format()}
            </td>
            <td style={{ textAlign: "right" }}>
              {account.getBalance().format()}
            </td>
            <td style={{ textAlign: "right" }}>
              {account.getInterestForPeriod().format()}
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <th style={{ textAlign: "right" }}>
            {Utilities.getNetWorth(paymentPeriod).format()}
          </th>
          <th style={{ textAlign: "right" }}>
            {Utilities.getTotalInterest(paymentPeriod).format()}
          </th>
        </tr>
      </tfoot>
    </table>
    </div>
  );
};

export default PaymentPeriodTable;
