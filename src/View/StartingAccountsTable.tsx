import { type } from "os";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Account } from "../Model/Account";
import { Loan } from "../Model/Loan";
import { selectStartingAccounts } from "../Model/StartingAccountsSlice";

const StartingAccountsTable = () => {
    const startingAccounts = useSelector(selectStartingAccounts);
    const dispatch = useDispatch();
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
                            {account.getInterestRate()}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

    );
};

export default StartingAccountsTable;