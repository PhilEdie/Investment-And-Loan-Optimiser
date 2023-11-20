import currency from "currency.js";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAddAccountForm } from "../Model/AddAccountFormSlice";
import { connect } from "react-redux";
import AddAccountForm from "./AddAccountForm";
import { RootState } from "../Model/Store";

interface CurrencyInputProps {
    onValidInput: (value: currency) => void,
    onInputError: () => void,
    formFieldName: string;
}

const CurrencyInput: React.FC<CurrencyInputProps> = ({ onValidInput,  onInputError, formFieldName}) => {
    
    var fieldName : keyof AddAccountFormState = formFieldName;
    
    const addAccountForm = useSelector((state : RootState) => state.addAccountForm[fieldName]);
    
    const [value, setValue] = useState("");
    const [error, setError] = useState("");

    useEffect 

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        const dollarRegex = /^\$?[0-9]+(\.[0-9][0-9])?$/;
        if (!dollarRegex.test(event.target.value)) {

            setError("Please enter a valid dollar amount.");
            onInputError();
            return;
        }
        
        setError("");
        onValidInput(currency(event.target.value));
    };

    return (
        <div className="row mb-3">
            <input className="form-control" type="text" onChange={handleChange} />
            {error && <p>{error}</p>}
        </div>
    );
};

const mapStateToProps = (state: any) => { // replace 'any' with the type of your Redux state
    return {
      position: state.position
    };
  };

export default CurrencyInput;