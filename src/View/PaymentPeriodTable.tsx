import { IStack } from "../DataStructures/IStack";
import { Account } from "../Model/Account";
import { Loan } from "../Model/Loan";
import { Utilities } from "../Utilities";

export interface ResultsIterationTableProps {
    paymentPeriod: Account[];
}

const PaymentPeriodTable = ({ paymentPeriod }: ResultsIterationTableProps) => {

    return (
        <>
        <table>
            <thead>
                <tr>
                    <th>Account Name</th>
                    <th>Account Type</th>
                    <th>Balance</th>
                    <th>Interest Rate</th>
                    <th>Payments Made</th>
                    <th>Interest For Period</th>
                </tr>
            </thead>
            <tbody>
                {paymentPeriod.map((account) => (
                    <tr key={account.getAccountName()}>
                        <td>
                            {account.getAccountName()}
                        </td>
                        <td>
                            {account instanceof Loan ? "Loan" : "Investment" }
                        </td>
                        <td>
                            {account.getBalance().format()}
                        </td>
                        <td>
                            {((account.getInterestRate() - 1) * 100).toFixed(3)}%
                        </td>
                        <td>
                            {account.getPaymentForPeriod().format()}
                        </td>
                        <td>
                            {account.getInterestForPeriod().format()}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        <table>
        <thead>
            <tr>
                <th>Loans Paid Off</th>
                <th>Net Worth</th>
                <th>Total Interest For Period</th>
            </tr>
        </thead>
        <tbody>
            <td>
                {Utilities.getPaidOffLoansAsString(paymentPeriod)}
            </td>
            <td>
                {Utilities.getNetWorth(paymentPeriod).format()}
            </td>
            <td>
                {Utilities.getTotalInterest(paymentPeriod).format()}
            </td>
        </tbody>
    </table>
    </>
    );
}

export default PaymentPeriodTable;