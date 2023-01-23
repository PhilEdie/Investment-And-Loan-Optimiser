import { GlobalContextSingleton } from "../GlobalContextSingleton";

const StartingAccountsTable = () => {
    const startingAccounts = GlobalContextSingleton
        .getInstance()
        .getAccountsController()
        .getAccountsModel()
        .getStartingAccounts();

    return (
        <table>
            <tr>
                <th>Account Name</th>
                <th>Account Type</th>
                <th>Balance</th>
                <th>Interest Rate</th>
                <th>Minimum Payment (If Loan)</th>
            </tr>
            {startingAccounts.map((account) => (
                <tr>
                    <td>
                        {account.getAccountName()}
                    </td>
                    <td>

                    </td>
                    <td>
                        {account.getBalance().format()}
                    </td>
                    <td>
                        {account.getInterestRate()}
                    </td>
                    <td>

                    </td>
                </tr>
            ))}
        </table>

    );
};

export default StartingAccountsTable;