import currency from "currency.js";
import { validateHeaderValue } from "http";
import { stringify } from "querystring";
import React, { useState } from "react";
import { AccountType } from "./AccountType";

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
        <form>
            <label>
                Account Name
                <input type="text" value={accountName} onChange={(e) => setAccountName(e.target.value)} />
            </label>
            <label>
                Account Type
                <select value={accountType} onChange={(e) => setAccountType(parseInt(e.target.value))}>
                    <option value={AccountType.Investment}>Investment</option>
                    <option value={AccountType.Loan}>Loan</option>
                </select>
            </label>
            <label>
                Minimum Annual Payment
                <input type="text" value={minimumAnnualPayment.format()} onChange={(e) => currencyInputOnChangeHandler(e.target.value, setMinimumAnnualPayment)} />
            </label>
            <label>
                Balance
                <input type="text" value={balance.format()} onChange={(e) => currencyInputOnChangeHandler(e.target.value, setBalance)} />
            </label>
            <label>
                Interest Rate (%)
                <input type="text" value={interestRateDisplay} onChange={(e) => interestRateOnChangeHandler(e.target.value)} />
            </label>
        </form>
    );
}

export default AddAccountForm;