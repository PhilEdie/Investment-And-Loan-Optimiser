import currency from "currency.js";
import { useState } from "react";
import { GlobalContextSingleton } from "../GlobalContextSingleton";
import { AccountType } from "../Model/AccountType";
import { Investment } from "../Model/Investment";
import { FormFieldType } from "./FormFieldType";
import useInput from "./useInput";

const AddAccountForm = () => {
    const accountsController = GlobalContextSingleton.getInstance().getAccountsController();
    const accountName = useInput(FormFieldType.AccountName, "");
    const minimumAnnualPayment = useInput(FormFieldType.MinimumAnnualPayment, "");
    const balance = useInput(FormFieldType.Balance, "");
    const interestRate = useInput(FormFieldType.InterestRate, "0.00");
    const [accountType, setAccountType] = useState(AccountType.Loan);

    function clearForm() {
        setAccountType(AccountType.Loan);
        accountName.onChange("");
        minimumAnnualPayment.onChange(currency(0).format());
        balance.onChange(currency(0).format());
        interestRate.onChange("0.00");
    }

    return (
        <div className="block p-6 rounded-lg shadow-lg bg-white max-w-m">
            <h1 className="font-extrabold">Add Account Form</h1>
            <form>
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
                border border-solid border-gray-300" type="text" value={minimumAnnualPayment.value} onChange={(e) => accountName.onChange(e.target.value)} />
                    {!minimumAnnualPayment.isValidInput &&
                        <p>Invalid minimum annual payment.</p>
                    }
                </div>
                <div className="form-group mb-6">
                    <label className="form-label">Balance</label>
                    <input className="
                form-control
                border border-solid border-gray-300" type="text" value={balance.value} onChange={(e) => balance.onChange(e.target.value)} />
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
                    {!interestRate.isValidInput &&
                        <p>Invalid interest rate.</p>
                    }
                </div>
                <div className="form-control">
                    <button onClick={() => accountsController.getAccountsModel().addStartingAccount(new Investment("1", 1.05, currency(0)))}>Submit</button>
                </div>
            </form >
        </div>
    );
}

export default AddAccountForm;