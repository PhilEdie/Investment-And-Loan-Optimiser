import currency from "currency.js";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { AccountType } from "../Model/AccountType";

import {addStartingAccount, clearStartingAccounts, selectStartingAccounts} from "../Model/StartingAccountsSlice";
import { useSelector } from "react-redux";
import TextInput from "./TextInput";
import DollarInput from "./CurrencyInput";
import PercentageInput from "./PercentageInput";
import IntegerInput from "./IntegerInput";
import { runOptimiser } from "../Controller/AccountsController";
import { set } from "../Model/HistorySlice";
import { selectAddAccountForm, setAccountName, setAccountType, setAvailableFunds, setBalance, setInterestRate, setMinimumAnnualPayment, setTotalYears } from "../Model/AddAccountFormSlice";
import { Account } from "../Model/Account";
import { Loan } from "../Model/Loan";
import { Investment } from "../Model/Investment";

const AddAccountForm = () => {

    const addAccountForm = useSelector(selectAddAccountForm);
    const startingAccounts = useSelector(selectStartingAccounts);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearStartingAccounts());
    }, []);


    function clearForm() {
        dispatch(setBalance(currency(0)));
        dispatch(setInterestRate(0));
        dispatch(setAccountName(getDefaultAccountName()));
        dispatch(setTotalYears(0));
        dispatch(setAvailableFunds(currency(0)));
        dispatch(setMinimumAnnualPayment(currency(0)));
    }

    function handleAddAccount() {
        var newAccount;
        if(addAccountForm.accountType == AccountType.Loan){
            newAccount = new Loan(addAccountForm.accountName!, 1 + (addAccountForm.interestRate! / 100), addAccountForm.balance!.multiply(-1), addAccountForm.minimumAnnualPayment!);
        } else {
        newAccount = new Investment(addAccountForm.accountName!, 1 + (addAccountForm.interestRate! / 100), addAccountForm.balance!);
        }
        dispatch(addStartingAccount(newAccount));
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

    const history = runOptimiser(startingAccounts.accounts, addAccountForm.totalYears!, addAccountForm.availableFunds!);
        dispatch(set(history));
    }
  
    return (
        <div className="container">
                <label>Account Name</label>
                <TextInput onValidInput={(e) => dispatch(setAccountName(e))} onInputError={() => dispatch(setAccountName(undefined))}/>
                <div className="row mb-3">
                    <label className="form-label">Account Type</label>
                    <select className="form-select"
                        value={addAccountForm.accountType} onChange={(e) => dispatch(setAccountType(parseInt(e.target.value)))}>
                        <option value={AccountType.Investment}>Investment</option>
                        <option value={AccountType.Loan}>Loan</option>
                    </select>
                </div>
                <label>Balance</label>
                <DollarInput onValidInput={(e) => dispatch(setBalance(e))} onInputError={() => dispatch(setBalance(undefined))}/>
                
                <label>Interest Rate</label>
                <PercentageInput onValidInput={(e) => dispatch(setInterestRate(e))} onInputError={() => dispatch(setInterestRate(undefined))}/>
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
                <IntegerInput onValidInput={(e) => dispatch(setTotalYears(e))} onInputError={() => dispatch(setTotalYears(undefined))}/>

                <label>Available Funds</label>
                <DollarInput onValidInput={(e) => dispatch(setAvailableFunds(e))} onInputError={() => dispatch(setAvailableFunds(undefined))}/>
                
                {addAccountForm.accountType == AccountType.Loan &&
                    <>
                        <label>Minimum Payment</label>
                        <DollarInput onValidInput={(e) => dispatch(setMinimumAnnualPayment(e))} onInputError={() => dispatch(setMinimumAnnualPayment(undefined))}/>
                
                    </>
                }

                <button className="btn btn-primary" type="button" onClick={(e) => run()}>Run</button>
        </div>
    );
}

export default AddAccountForm;
