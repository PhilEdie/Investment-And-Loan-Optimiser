import currency from "currency.js";
import { useDispatch } from "react-redux";
import { AccountType } from "../Model/AccountType";
import {addStartingAccount, clearStartingAccounts, selectStartingAccounts} from "../Model/StartingAccountsSlice";
import { useSelector } from "react-redux";
import { runOptimiser } from "../Controller/AccountsController";
import { clear, set } from "../Model/HistorySlice";
import { INITIAL_ACCOUNT_FORM_STATE, selectAddAccountForm, setAccountName, setAccountType, setAvailableFunds, setBalance, setInterestRate, setMinimumAnnualPayment, setTotalYears } from "../Model/AddAccountFormSlice";
import { Loan } from "../Model/Loan";
import { Investment } from "../Model/Investment";
import AddAccountFormInput from "./Inputs/AddAccountFormInput";
import { ValidationRules } from "./ValidationRules";
import { Account } from "../Model/Account";
import { Utilities } from "../Utilities";

const AddAccountForm = () => {

    const addAccountForm = useSelector(selectAddAccountForm);
    const startingAccounts = useSelector(selectStartingAccounts);
    const dispatch = useDispatch();

    function clearForm() {
        dispatch(clearStartingAccounts());
        dispatch(clear());
        dispatch(setBalance(INITIAL_ACCOUNT_FORM_STATE.balance));
        dispatch(setInterestRate(INITIAL_ACCOUNT_FORM_STATE.interestRate));
        dispatch(setAccountName(INITIAL_ACCOUNT_FORM_STATE.accountName));
        dispatch(setTotalYears(INITIAL_ACCOUNT_FORM_STATE.totalYears));
        dispatch(setAvailableFunds(INITIAL_ACCOUNT_FORM_STATE.availableFunds));
        dispatch(setMinimumAnnualPayment(INITIAL_ACCOUNT_FORM_STATE.minimumAnnualPayment));
    }

    function handleAddAccount() {
        
        if (document.getElementsByClassName("is-invalid").length > 0){
            alert("Please enter valid information.");
            return;
        }

        if(startingAccounts.accounts.length  >= 10){
            alert("A maximum of 10 Accounts already exist.");
            return;
        }

        if(startingAccounts.accounts.filter((account) => account.getAccountName() === addAccountForm.accountName).length > 0){
            alert("Please enter a unique account name.");
            return;
        }

        var newAccount = createAccount();

        dispatch(addStartingAccount(newAccount));
        dispatch(setAccountType(INITIAL_ACCOUNT_FORM_STATE.accountType));

        var defaultName = getDefaultAccountName(INITIAL_ACCOUNT_FORM_STATE.accountType, newAccount);
        dispatch(setAccountName(defaultName));

        dispatch(setInterestRate(INITIAL_ACCOUNT_FORM_STATE.interestRate));
        dispatch(setBalance(INITIAL_ACCOUNT_FORM_STATE.balance));
    }

    function createAccount() : Account {
        if(addAccountForm.accountType == AccountType.Loan){
            return new Loan(addAccountForm.accountName, 1 + (Number(addAccountForm.interestRate) / 100), currency(addAccountForm.balance).multiply(-1), currency(addAccountForm.minimumAnnualPayment));
        } else {
            return new Investment(addAccountForm.accountName, 1 + (Number(addAccountForm.interestRate) / 100), currency(addAccountForm.balance));
        }
    }

    function onAccountTypeChange(value : string){
        
        var accountType = parseInt(value);
        
        dispatch(setAccountType(accountType));

        var defaultName = getDefaultAccountName(accountType);
        dispatch(setAccountName(defaultName));
    }

    function getDefaultAccountName(accountType : AccountType, createdAccount? : Account) : string {
        const prefix = AccountType[accountType];
        var existingAccounts = startingAccounts.accounts;
        
        if(createdAccount){
            existingAccounts = existingAccounts.concat(createdAccount);
        }       

        let index = 1;

        while(existingAccounts.filter((account) => account.getAccountName() === (prefix +" "+ index.toString()))
            .length > 0){
            index++;
        }
        return prefix + " " + index.toString();
    }

    const run = () => {  
        
        if(startingAccounts.accounts.length === 0) {
            alert("Please add at least one Account.");
            return;
        }

        if(currency(addAccountForm.availableFunds).value < 0) {
            alert("Available funds should be greater or equal to zero.");
            return;
        }

        if(Utilities.getTotalMinimumPayments(startingAccounts.accounts).value > currency(addAccountForm.availableFunds).value){
            alert("Total minimum payments is greater than the available funds.");
            return;
        }

        const history = runOptimiser(startingAccounts.accounts, Number(addAccountForm.totalYears), currency(addAccountForm.availableFunds));
        dispatch(set(history));
    }

    return (
        <div className="container">
            <AddAccountFormInput storeKey="accountName" label="Account Name" validate={ValidationRules.isValidAccountName} onChange={setAccountName}/>
           
            <div className="form-floating mb-3">
                <select className="form-select" id="accountTypeSelect"
                    value={addAccountForm.accountType} onChange={(e) => onAccountTypeChange(e.target.value)}>
                    <option value={AccountType.Investment}>Investment</option>
                    <option value={AccountType.Loan}>Loan</option>
                </select>
                <label>Account Type</label>
            </div>

            <AddAccountFormInput storeKey="balance" label="Balance" validate={ValidationRules.isValidDollarAmount} onChange={setBalance}/>
            <AddAccountFormInput storeKey="interestRate" label="Interest Rate" validate={ValidationRules.isValidInterestRate} onChange={setInterestRate}/>

            {addAccountForm.accountType == AccountType.Loan &&
                <AddAccountFormInput storeKey="minimumAnnualPayment" label="Minimum Annual Payment" validate={ValidationRules.isValidDollarAmount} onChange={setMinimumAnnualPayment}/>
            } 
            <div className="row mb-3">
                <div className="col-mb-3"> 
                    <button className="btn btn-outline-primary" onClick={(e) => handleAddAccount()}>Add Account</button>
                </div>
            </div> 
                         
            <AddAccountFormInput storeKey="totalYears" label="Total Years" validate={ValidationRules.isValidTotalYears} onChange={setTotalYears}/>
            <AddAccountFormInput storeKey="availableFunds" label="Available Funds" validate={ValidationRules.isValidDollarAmount} onChange={setAvailableFunds}/>          
                    
            <div className="d-grid gap-2 d-md-block"> 
                <button className="btn btn-outline-primary" type="button" onClick={(e) => run()}>Run</button>
                <button className="btn btn-outline-danger" type="button" onClick={(e) => clearForm()}>Reset</button>
            </div>
        </div>
    );
}

export default AddAccountForm;
