import currency from "currency.js";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AccountType } from "../Model/AccountType";
import { Investment } from "../Model/Investment";
import { Loan } from "../Model/Loan";
import { FormFieldType } from "./FormFieldType";
import useInput from "./useInput";

import {addAccount} from "../Model/StartingAccountsSlice";

const AddAccountForm = () => {
    const accountName = useInput(FormFieldType.AccountName, "");
    const minimumAnnualPayment = useInput(FormFieldType.MinimumAnnualPayment, "");
    const balance = useInput(FormFieldType.Balance, "");
    const interestRate = useInput(FormFieldType.InterestRate, "0.00");
    const [accountType, setAccountType] = useState(AccountType.Loan);
    
    const dispatch = useDispatch();


    function clearForm() {
        setAccountType(AccountType.Loan);
        accountName.onChange("");
        minimumAnnualPayment.onChange("0.00");
        balance.onChange("0.00");
        interestRate.onChange("0.00");
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

        if (accountType == AccountType.Loan) {
            dispatch(addAccount(new Loan(accountName.value, 1 + parseFloat(interestRate.value), currency(-1 * parseFloat(balance.value)), currency(parseFloat(minimumAnnualPayment.value)))));
        }

        if (accountType == AccountType.Investment) {
            addAccount(new Investment(accountName.value, 1 + parseFloat(interestRate.value), currency(parseFloat(balance.value))));
        }
    }

    return (
        <div className="block p-6 rounded-lg shadow-lg bg-white max-w-m">
            <h1 className="font-extrabold">Add Account Form</h1>
            <div className="form-control">
                <button onClick={(e) => clearForm()}>Clear</button>
            </div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="form-group mb-6">
                    <label className="form-label">Account Name</label>
                    <input className="
                form-control
                border border-solid border-gray-300" type="text" value={accountName.value} onChange={(e) => accountName.onChange(e.target.value)} />
                    {!accountName.isValidInput &&
                        <p>Invalid account name.</p>
                    }
                </div>
                <div className="form-group mb-6">
                    <label className="form-label">Account Type</label>
                    <select
                        className="
                form-control
                border border-solid border-gray-300"
                        value={accountType} onChange={(e) => setAccountType(parseInt(e.target.value))}>
                        <option value={AccountType.Investment}>Investment</option>
                        <option value={AccountType.Loan}>Loan</option>
                    </select>
                </div>
                <div className="form-group mb-6">
                    <label className="form-label">Minimum Annual Payment</label>
                    <input className="
                form-control
                border border-solid border-gray-300" type="text" value={minimumAnnualPayment.value} onChange={(e) => minimumAnnualPayment.onChange(e.target.value)} />
                    <input className="
                form-control
                border border-solid border-gray-300" disabled value={minimumAnnualPayment.displayValue}/>
                    
                    {!minimumAnnualPayment.isValidInput &&
                        <p>Invalid minimum annual payment.</p>
                    }
                </div>
                <div className="form-group mb-6">
                    <label className="form-label">Balance</label>
                    <input className="
                form-control
                border border-solid border-gray-300" type="text" value={balance.value} onChange={(e) => balance.onChange(e.target.value)} />
                    <input className="
                form-control
                border border-solid border-gray-300" disabled value={balance.displayValue}/>
                    {!balance.isValidInput &&
                        <p>Invalid balance.</p>
                    }
                </div>
                <div className="form-group mb-6">
                    <label className="form-label">
                        Interest Rate (%)
                    </label>
                    <input className="
                form-control
                border border-solid border-gray-300" type="text" value={interestRate.value} onChange={(e) => interestRate.onChange(e.target.value)} />
                <input className="
                form-control
                border border-solid border-gray-300" disabled value={interestRate.displayValue}/>
                    {!interestRate.isValidInput &&
                        <p>Invalid interest rate.</p>
                    }
                </div>
                <div className="form-control">
                    <input type="submit" />
                </div>
            </form >
        </div>
    );
}

export default AddAccountForm;