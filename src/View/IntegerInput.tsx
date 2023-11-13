import { useState } from "react";


interface IntegerInputProps {
    onValidInput: (value: number) => void;
    onInputError: () => void;
}

const IntegerInput: React.FC<IntegerInputProps> = ({ onValidInput, onInputError }) => {
    const [value, setValue] = useState("");
    const [error, setError] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        const regex = /^(100|[1-9][0-9]?)$/;
        if (!regex.test(event.target.value)) {
            setError("Please enter a number beteen 1 and 100.");
            onInputError();
            return;
        }
        setError("");
        onValidInput(parseInt(event.target.value));
        
    };

    return (
        <div className="row mb-3">
            <input className="form-control" type="text" value={value} onChange={handleChange} />
            {error && <p>{error}</p>}
        </div>
    );
};

export default IntegerInput;