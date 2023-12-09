import { useSelector } from "react-redux";
import { Loan } from "../Model/Loan";
import { removeStartingAccount, selectStartingAccounts } from "../Model/StartingAccountsSlice";
import { useDispatch } from "react-redux";

const StartingAccountsTable = () => {
    const startingAccounts = useSelector(selectStartingAccounts);
    const dispatch = useDispatch();

    if(startingAccounts.accounts.length == 0)
    {
        return(<></>);
    }

    return (
        <div className="table-responsive">
        <h3 className="text-center">Starting Accounts</h3>
        <table style={{width : "100%"}} className="table table-bordered">
            <thead>
                <tr>
                    <th>Account Name</th>
                    <th>Account Type</th>
                    <th>Balance</th>
                    <th>Interest Rate</th>
                    <th>Minimum Payment (If Loan)</th>
                    <th></th>
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
                        <td style={{textAlign: "right"}}>
                            {account.getBalance().format()}
                        </td>
                        <td style={{textAlign: "right"}}>
                        {((account.getInterestRate() - 1) * 100).toFixed(3)}%
                        </td>
                        <td>

                            {
                            // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
                            account instanceof Loan ? (account as Loan).getMinimumPayment().toString() : "N/A"}
                        </td>
                        <td>
                            <button className="btn btn-outline-danger float-end" type="button" onClick={() => dispatch(removeStartingAccount(account.getAccountName()))}>Remove</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>

    );
};


export default StartingAccountsTable;