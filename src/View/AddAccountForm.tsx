import currency from "currency.js";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AccountType } from "../Model/AccountType";
import { Investment } from "../Model/Investment";
import { Loan } from "../Model/Loan";
import { FormFieldType } from "./FormFieldType";
import useInput from "./useInput";

import {addStartingAccount, clearStartingAccounts, selectStartingAccounts} from "../Model/StartingAccountsSlice";
import { useSelector } from "react-redux";

const AddAccountForm = () => {
    const accountName = useInput(FormFieldType.AccountName, "DefaultName");
    const minimumAnnualPayment = useInput(FormFieldType.MinimumAnnualPayment, "0");
    const balance = useInput(FormFieldType.Balance, "0");
    const interestRate = useInput(FormFieldType.InterestRate, "0");
    const [accountType, setAccountType] = useState(AccountType.Investment);

    const startingAccounts = useSelector(selectStartingAccounts);
    const dispatch = useDispatch();


    function clearForm() {
        dispatch(clearStartingAccounts());
        // Set default values for inputs. 
        setAccountType(AccountType.Investment);
        accountName.onChange("DefaultName");
        minimumAnnualPayment.onChange("0");
        balance.onChange("0");
        interestRate.onChange("0");
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!(accountName.isValidInput
            && minimumAnnualPayment.isValidInput
            && balance.isValidInput
            && interestRate.isValidInput)) {
            alert("Please enter valid stuff.");
            return;
        }

        if(startingAccounts.accounts.some(obj => obj.getAccountName() == accountName.value)){
            alert("Please enter a unique account name.");
            return;
        }

        if (accountType == AccountType.Loan) {
            dispatch(addStartingAccount(new Loan(accountName.value, 1 + (parseFloat(interestRate.value) / 100), currency(-1 * parseFloat(balance.value)), currency(parseFloat(minimumAnnualPayment.value)))));
        }

        if (accountType == AccountType.Investment) {
            dispatch(addStartingAccount(new Investment(accountName.value, 1 + (parseFloat(interestRate.value) / 100), currency(parseFloat(balance.value)))));
        }
    }

    return (
        <div>
            <h1>Add Account Form</h1>
            <form className = "pure-form pure-form-aligned" onSubmit={(e) => handleSubmit(e)}>
                <fieldset>
                    <div className="pure-control-group">
                        <label>Account Name</label>
                        <input type="text" value={accountName.value} onChange={(e) => accountName.onChange(e.target.value)} />
                        {!accountName.isValidInput &&
                            <span>Invalid account name.</span>
                        }
                    </div>
                    <div className="pure-control-group">
                        <label>Account Type</label>
                        <select
                            value={accountType} onChange={(e) => setAccountType(parseInt(e.target.value))}>
                            <option value={AccountType.Investment}>Investment</option>
                            <option value={AccountType.Loan}>Loan</option>
                        </select>
                    </div>
                    <div className="pure-control-group">
                        <label>Minimum Annual Payment</label>
                        <input type="text" value={minimumAnnualPayment.value} onChange={(e) => minimumAnnualPayment.onChange(e.target.value)} />
                        <input disabled value={minimumAnnualPayment.displayValue}/>
                        
                        {!minimumAnnualPayment.isValidInput &&
                            <span>Invalid minimum annual payment.</span>
                        }
                    </div>
                    <div className="pure-control-group">
                        <label>Balance</label>
                        <input type="text" value={balance.value} onChange={(e) => balance.onChange(e.target.value)} />
                        <input disabled value={balance.displayValue}/>
                        {!balance.isValidInput &&
                            <span>Invalid balance.</span>
                        }
                    </div>
                    <div className="pure-control-group">
                        <label>
                            Interest Rate (%)
                        </label>
                        <input type="text" value={interestRate.value} onChange={(e) => interestRate.onChange(e.target.value)} />
                    <input disabled value={interestRate.displayValue}/>
                        {!interestRate.isValidInput &&
                            <span>Invalid interest rate.</span>
                        }
                    </div>
                    <div className="pure-control-group">
                        <button className="pure-button pure-button-primary">Add Account</button>
                    </div>
                    <div className="pure-control-group">
                        <button className="pure-button pure-button-primary" type="button" onClick={(e) => clearForm()}>Clear</button>
                    </div>
                </fieldset>
            </form>
        </div>
    );
}

export default AddAccountForm;