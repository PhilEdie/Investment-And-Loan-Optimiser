import { useState } from "react";


interface PercentageInputProps {
    onValidInput : (value: number) => void;
    onInputError : () => void;
}

const PercentageInput: React.FC<PercentageInputProps> = ({ onValidInput, onInputError }) => {
    const [value, setValue] = useState("");
    const [error, setError] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        const regex = /^(100(\.0{1,3})?|([0-9]{1,2})(\.\d{1,3})?)$/;
        if (!regex.test(event.target.value)) {
            setError("Please enter a valid percentage.");
            onInputError();
            return;
        }

        setError("");
        onValidInput(parseFloat(event.target.value));
    };

    return (
        <div className="row mb-3">
            <input className="form-control" type="text" value={value} onChange={handleChange} />
            {error && <p>{error}</p>}
        </div>
    );
};

export default PercentageInput;