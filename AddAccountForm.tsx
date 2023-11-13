import currency from "currency.js";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { AccountType } from "../Model/AccountType";
import { Investment } from "../Model/Investment";
import { Loan } from "../Model/Loan";
import { FormFieldType } from "./FormFieldType";
import useInput from "./useInput";

import {addStartingAccount, clearStartingAccounts, selectStartingAccounts} from "../Model/StartingAccountsSlice";
import { useSelector } from "react-redux";
import { selectOptimiserSettings, setAvailableFunds, setTotalYears } from "../Model/OptimiserSettingsSlice";
import CurrencyInput from "./CurrencyInput";
import TextInput from "./TextInput";
import DollarInput from "./CurrencyInput";
import PercentageInput from "./PercentageInput";
import IntegerInput from "./IntegerInput";
import { runOptimiser } from "../Controller/AccountsController";
import { set } from "../Model/HistorySlice";

const AddAccountForm = () => {

    const [balance, setBalance] = useState<currency>(currency(0));
    const [interestRate, setInterestRate] = useState<number>(0.00);
    const [accountName, setAccountName] = useState("Investment-1");
    const [accountType, setAccountType] = useState(AccountType.Investment);
    const [totalYears, setTotalYears] = useState<number>(5);
    const [availableFunds, setAvailableFunds] = useState<currency>(currency(5000));
    const [minimumAnnualPayment, setMinimumAnnualPayment] = useState<currency>(currency(5000));

    const startingAccounts = useSelector(selectStartingAccounts);
    const dispatch = useDispatch();

    useEffect(() => {
        setAccountType(AccountType.Investment);
        clearForm();
    }, []);

    function handleValidBalance(value : string) {
        setBalance(currency(value));
    }

    function handleValidInterestRate(value : string) {
        setInterestRate(parseFloat(value));
    }

    function handleValidAccountName(value : string) {
        setAccountName((value));
    }

    function handleValidTotalYears(value : string) {
        setTotalYears(parseInt(value));
    }

    function handleValidAvailableFunds(value : string) {
        setAvailableFunds(currency(value));
    }

    function handleValidMinimumPayment(value : string) {
        setMinimumAnnualPayment(currency(value));
    }

    function clearForm() {
        setBalance((currency(0)));
        setInterestRate(0);
        setAccountName(getDefaultAccountName());
        setTotalYears(0);
        setAvailableFunds(currency(0));
        setMinimumAnnualPayment(currency(0));
    }

    function handleAddAccount() {
        return;
    }

    function getDefaultAccountName(){
        const prefix = AccountType[accountType];
        let index = 1;

        while(startingAccounts.accounts.filter((account) => account.getAccountName() === (prefix +"-"+ index.toString()))
            .length > 0){
            index++;
        }
        return prefix + "-" + index.toString();
    }

    const run = () => {    
        const history = runOptimiser(startingAccounts.accounts, totalYears, availableFunds);
        dispatch(set(history));
    }
  

    return (
        <div className="container">
                <label>Account Name</label>
                <TextInput onValidInput={(e) => handleValidAccountName(e)}/>
                <div className="row mb-3">
                    <label className="form-label">Account Type</label>
                    <select className="form-select"
                        value={accountType} onChange={(e) => setAccountType(parseInt(e.target.value))}>
                        <option value={AccountType.Investment}>Investment</option>
                        <option value={AccountType.Loan}>Loan</option>
                    </select>
                </div>
                <label>Balance</label>
                <DollarInput onValidInput={(e) => handleValidBalance(e)}/>
                
                <label>Interest Rate</label>
                <PercentageInput onValidInput={(e) => handleValidInterestRate(e)}/>
                <div className="row mb-3">
                    <div className="col-mb-6"> 
                        <button className="btn btn-primary" onClick={(e) => handleAddAccount()}>Add Account</button>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-mb-6"> 
                        <button className="btn btn-primary" type="button" onClick={(e) => clearForm()}>Clear</button>
                    </div>
                </div>
                
                
                <label>Total Years</label>
                <IntegerInput onValidInput={(e) => handleValidTotalYears(e)}/>

                <label>Available Funds</label>
                <DollarInput onValidInput={(e) => handleValidAvailableFunds(e)}/>
                
                {accountType == AccountType.Loan &&
                    <>
                        <label>Minimum Payment</label>
                        <DollarInput onValidInput={(e) => handleValidMinimumPayment(e)}/>
                    </>
                }

                <button className="btn btn-primary" type="button" onClick={(e) => run()}>Run</button>
        </div>
    );
}

export default AddAccountForm;