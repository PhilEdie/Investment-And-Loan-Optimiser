import { useDispatch, useSelector } from "react-redux";
import { AccountType } from "../../Model/AccountType";
import { selectAddAccountForm, setAccountName } from "../../Model/AddAccountFormSlice";
import { selectStartingAccounts } from "../../Model/StartingAccountsSlice";
import { ValidationRules } from "../ValidationRules";

interface AddAccountFormNameInputProps {
    label : string
}

const AddAccountFormNameInput: React.FC<AddAccountFormNameInputProps> = ({ label }) => {

    const addAccountForm = useSelector(selectAddAccountForm);
    const startingAccounts = useSelector(selectStartingAccounts);
    
    const dispatch = useDispatch();

    function isValidAccountName(accountName : string) : boolean {
        return ValidationRules.isValidAccountName(accountName) 
        && !(startingAccounts.accounts.length > 0 && startingAccounts.accounts.filter(x => x.getAccountName() === addAccountForm.accountName));
    }

    function handleOnChange(input : string) {
        
        dispatch(setAccountName(input));
        
        if(isValidAccountName(input))
        {
            document.getElementById(label + "-form-floating")?.classList.remove("is-invalid");
            document.getElementById(label + "-form-control")?.classList.remove("is-invalid");
            document.getElementById(label + "-form-label")?.classList.remove("is-invalid");
            document.getElementById(label + "-form-feedback")?.classList.add("hidden");
        } else {
            document.getElementById(label + "-form-floating")?.classList.add("is-invalid");
            document.getElementById(label + "-form-control")?.classList.add("is-invalid");
            document.getElementById(label + "-form-label")?.classList.add("is-invalid");
            document.getElementById(label + "-form-feedback")?.classList.remove("hidden");
        }
    }
    
    return(
        <div className="input-group has-validation">
            <div className="form-floating" id={label + "-form-floating"}>
                <input className ="form-control" id={label + "-form-control"} type="text" onChange={(e) => handleOnChange(e.target.value)}/>
                <label className="form-label" id={label + "-form-label"}>{label}</label>
            </div>
            <div id={label + "-form-feedback"} className="invalid-feedback">
                Please choose valid {label}.
            </div>
        </div>
    );
};

export default AddAccountFormNameInput;