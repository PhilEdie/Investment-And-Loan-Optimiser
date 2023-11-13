import currency from "currency.js";
import { useState } from "react";


interface CurrencyInputProps {
    onValidInput: (value: currency) => void,
    onInputError: () => void
}

const CurrencyInput: React.FC<CurrencyInputProps> = ({ onValidInput,  onInputError}) => {
    const [value, setValue] = useState("");
    const [error, setError] = useState("");

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
            <input className="form-control" type="text" value={value} onChange={handleChange} />
            {error && <p>{error}</p>}
        </div>
    );
};

export default CurrencyInput;