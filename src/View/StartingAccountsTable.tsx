import { useSelector } from "react-redux";
import { Loan } from "../Model/Loan";
import { selectStartingAccounts } from "../Model/StartingAccountsSlice";

const StartingAccountsTable = () => {
    const startingAccounts = useSelector(selectStartingAccounts);
    return (
        <table>
            <thead>
                <tr>
                    <th>Account Name</th>
                    <th>Account Type</th>
                    <th>Balance</th>
                    <th>Interest Rate</th>
                    <th>Minimum Payment (If Loan)</th>
                </tr>
            </thead>
            <tbody>

                {startingAccounts.accounts.map((account) => (
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
                            {account.getInterestRate()}%
                        </td>
                        <td>

                            {
                            // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
                            account instanceof Loan ? (account as Loan).getMinimumPayment().toString() : "N/A"}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

    );
};

export default StartingAccountsTable;