import { useDispatch, useSelector } from "react-redux";
import { selectOptimiserSettings } from "../Model/OptimiserSettingsSlice";
import useInput from "./useInput";
import { FormFieldType } from "./FormFieldType";
import { selectStartingAccounts } from "../Model/StartingAccountsSlice";
import { runOptimiser } from "../Controller/AccountsController";
import currency from "currency.js";
import { set } from "../Model/HistorySlice";
import { Utilities } from "../Utilities";

const OptimiserSettingsControls = () => {
    const startingAccounts = useSelector(selectStartingAccounts);
    const dispatch = useDispatch();

    const totalIterations = useInput(FormFieldType.TotalIterations, "5");
    const availableFunds = useInput(FormFieldType.Balance, "5000");

    const run = () => {    
        if(!totalIterations.isValidInput || !availableFunds.isValidInput){
            alert("Invalid settings.");
            return;
        }
        if(startingAccounts.accounts.length === 0){
            alert("Please add starting accounts.");
            return;
        }
        if(currency(availableFunds.value).intValue < Utilities.getTotalMinimumPayments(startingAccounts.accounts).intValue){
            alert("Available funds is less than the sum of all minimum payments.");
            return;
        }
        const history = runOptimiser(startingAccounts.accounts, parseInt(totalIterations.value), currency(parseInt(availableFunds.value)));
        dispatch(set(history));
    }
  
    return (
    <form className="pure-form pure-form-aligned" style={{width : "100%"}}>
        <fieldset>
        <legend>Settings</legend>
        <div className="pure-control-group">
                        <label>Total Years</label>
                        <input type="number" value={totalIterations.value} onChange={(e) => totalIterations.onChange(e.target.value)} />
                        {!totalIterations.isValidInput &&
                            <span>Invalid total years.</span>
                        }
                    </div>
  
        <div className="pure-control-group">
                        <label>Available Funds</label>
                        <input type="text" value={availableFunds.value} onChange={(e) => availableFunds.onChange(e.target.value)} />
                        <input readOnly value={availableFunds.displayValue}/>
                        {!availableFunds.isValidInput &&
                            <span>Invalid Available Funds.</span>
                        }
        </div>
        <div className="pure-controls"> 
            <button type="button" className="pure-button pure-button-primary" onClick={(e) => run()}>Run</button>
        </div>
        </fieldset>
    </form>
    );
}


export default OptimiserSettingsControls;