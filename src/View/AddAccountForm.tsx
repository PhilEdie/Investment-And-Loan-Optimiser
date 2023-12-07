import currency from "currency.js";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { AccountType } from "../Model/AccountType";
import {addStartingAccount, clearStartingAccounts, selectStartingAccounts} from "../Model/StartingAccountsSlice";
import { useSelector } from "react-redux";
import { runOptimiser } from "../Controller/AccountsController";
import { set } from "../Model/HistorySlice";
import { selectAddAccountForm, setAccountName, setAccountType, setAvailableFunds, setBalance, setInterestRate, setMinimumAnnualPayment, setTotalYears } from "../Model/AddAccountFormSlice";
import { Loan } from "../Model/Loan";
import { Investment } from "../Model/Investment";
import AddAccountFormInput from "./Inputs/AddAccountFormInput";
import { ValidationRules } from "./ValidationRules";
import AddAccountFormNameInput from "./Inputs/AddAccountFormNameInput";

const AddAccountForm = () => {

    const addAccountForm = useSelector(selectAddAccountForm);
    const startingAccounts = useSelector(selectStartingAccounts);
    const dispatch = useDispatch();
    const ref = useRef();

    function clearForm() {
        dispatch(setBalance("0.00"));
        dispatch(setInterestRate("1.000"));
        dispatch(setAccountName(getDefaultAccountName()));
        dispatch(setTotalYears("5"));
        dispatch(setAvailableFunds("5000.00"));
        dispatch(setMinimumAnnualPayment("1000.00"));
    }

    function handleAddAccount() {
        
        if (document.getElementsByClassName("is-invalid").length > 0){
            return;
        }

        var newAccount;

        if(addAccountForm.accountType == AccountType.Loan){
            newAccount = new Loan(addAccountForm.accountName, 1 + (Number(addAccountForm.interestRate) / 100), currency(addAccountForm.balance).multiply(-1), currency(addAccountForm.minimumAnnualPayment));
        } else {
            newAccount = new Investment(addAccountForm.accountName, 1 + (Number(addAccountForm.interestRate) / 100), currency(addAccountForm.balance));
        }
        dispatch(addStartingAccount(newAccount));
        dispatch(setAccountName(getDefaultAccountName()));
    }

    function getDefaultAccountName(){
        const prefix = AccountType[addAccountForm.accountType!];
        let index = 1;

        while(startingAccounts.accounts.filter((account) => account.getAccountName() === (prefix +"-"+ index.toString()))
            .length > 0){
            index++;
        }
        return prefix + "-" + index.toString();
    }

    const run = () => {    
        const history = runOptimiser(startingAccounts.accounts, Number(addAccountForm.totalYears), currency(addAccountForm.availableFunds));
        dispatch(set(history));
    }

    return (
        <div className="container">
                <AddAccountFormNameInput label="Account Name"/>
                <div className="row mb-3">
                    <label className="form-label">Account Type</label>
                    <select className="form-select"
                        value={addAccountForm.accountType} onChange={(e) => dispatch(setAccountType(parseInt(e.target.value)))}>
                        <option value={AccountType.Investment}>Investment</option>
                        <option value={AccountType.Loan}>Loan</option>
                    </select>
                </div>
                <AddAccountFormInput label="Balance" validate={ValidationRules.isValidDollarAmount} onChange={setBalance}/>
                <AddAccountFormInput label="Interest Rate" validate={ValidationRules.isValidInterestRate} onChange={setInterestRate}/>
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
                <AddAccountFormInput label="Total Years" validate={ValidationRules.isValidTotalYears} onChange={setTotalYears}/>
                <AddAccountFormInput label="Available Funds" validate={ValidationRules.isValidDollarAmount} onChange={setAvailableFunds}/>          
                {addAccountForm.accountType == AccountType.Loan &&
                   <AddAccountFormInput label="Minimum Annual Payment" validate={ValidationRules.isValidDollarAmount} onChange={setMinimumAnnualPayment}/>
                }
                <button className="btn btn-primary" type="button" onClick={(e) => run()}>Run</button>
        </div>
    );
}

export default AddAccountForm;
