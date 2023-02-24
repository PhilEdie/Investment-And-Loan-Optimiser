import { type } from "os";
import { Account } from "../Model/Account";
import { Loan } from "../Model/Loan";

export interface StartingAccountsTableProps {
    startingAccounts: Account[];
}

const StartingAccountsTable = ({ startingAccounts }: StartingAccountsTableProps) => {

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

                {startingAccounts.map((account) => (
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