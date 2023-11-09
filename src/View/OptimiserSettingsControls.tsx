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
    <form>

        <div className="row mb-3">
            <div className="col-md-6">
                <label className="form-label">Total Years</label>
                <input className="form-control" type="number" value={totalIterations.value} onChange={(e) => totalIterations.onChange(e.target.value)} />
                {!totalIterations.isValidInput &&
                <span>Invalid total years.</span>
                }
            </div>
        </div>
        <div className="row mb-3">
        <label className="form-label">Available Funds</label>
            <div className="col-md-6">
                
                <input className="form-control" type="text" value={availableFunds.value} onChange={(e) => availableFunds.onChange(e.target.value)} />
            </div>
            <div className="col-md-6">
                <input className="form-control" disabled value={availableFunds.displayValue}/>
                {!availableFunds.isValidInput &&
                <span>Invalid Available Funds.</span>
                }
            </div>
        </div>
        <div className="mb-3"> 
            <button className="btn btn-primary" type="button" onClick={(e) => run()}>Run</button>
        </div>
    </form>
    );
}


export default OptimiserSettingsControls;