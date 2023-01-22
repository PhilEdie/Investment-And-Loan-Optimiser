import currency from "currency.js";
import React, { useState } from "react";
import { AccountType } from "../Model/AccountType";

const AddAccountForm = () => {

    const [accountName, setAccountName] = useState("");
    const [accountType, setAccountType] = useState<AccountType>(AccountType.Loan);
    const [minimumAnnualPayment, setMinimumAnnualPayment] = useState<currency>(currency(0));
    const [balance, setBalance] = useState<currency>(currency(0));

    const [interestRate, setInterestRate] = useState<number>(0);
    const [interestRateDisplay, setInterestRateDisplay] = useState<string>("0.000");

    function currencyInputOnChangeHandler(value: string, setter: React.Dispatch<React.SetStateAction<currency>>) {
        value = currency(value).format();
        setter(currency(value));
    }

    function interestRateOnChangeHandler(input: string) {

        // Allow the user to clear the text field. 
        if (input.length === 0) {
            setInterestRate(0);
            setInterestRateDisplay("");
            return;
        }

        // Check if the string is a number greater or equal to 0, with a maximum of three decimal places. 
        const regex = new RegExp(/^\d+(\.\d{0,3})?$/);
        if (!regex.test(input)) {
            return;
        }

        // Ensure that the user cannot enter a number greater than 100. 
        if (Number(input) > 100) {
            return;
        }

        setInterestRate(Number(input));
        setInterestRateDisplay(input);
    }

    function clear() {
        setAccountName("");
        setAccountType(AccountType.Loan);
        setMinimumAnnualPayment(currency(0));
        setBalance(currency(0));
        setInterestRate(0);
        setInterestRateDisplay("0.000");
    }

    return (
        <div className="block p-6 rounded-lg shadow-lg bg-white max-w-m">
            <h1 className="font-extrabold">Add Account Form</h1>
            <form>
                <div className="form-group mb-6">
                    <label className="form-label">Account Name</label>
                    <input className="
                form-control
                border border-solid border-gray-300" type="text" value={accountName} onChange={(e) => setAccountName(e.target.value)} />
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
                border border-solid border-gray-300" type="text" value={minimumAnnualPayment.format()} onChange={(e) => currencyInputOnChangeHandler(e.target.value, setMinimumAnnualPayment)} />
                </div>
                <div className="form-group mb-6">
                    <label className="form-label">Balance</label>
                    <input className="
                form-control
                border border-solid border-gray-300" type="text" value={balance.format()} onChange={(e) => currencyInputOnChangeHandler(e.target.value, setBalance)} />
                </div>
                <div className="form-group mb-6">
                    <label className="form-label">
                        Interest Rate (%)
                    </label>
                    <input className="
                form-control
                border border-solid border-gray-300" type="text" value={interestRateDisplay} onChange={(e) => interestRateOnChangeHandler(e.target.value)} />
                </div>
            </form >
        </div>
    );
}

export default AddAccountForm;