import { useState } from "react";


interface TextInputProps {
    onValidInput: (value: string) => void;
    onInputError: () => void;
}

const TextInput: React.FC<TextInputProps> = ({ onValidInput, onInputError }) => {
    const [value, setValue] = useState("");
    const [error, setError] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        const textRegex = /^.{1,20}$/;
        if (!textRegex.test(event.target.value)) {
            setError("Please enter a valid name.");
            onInputError();
            return;
        }
        setError("");
        onValidInput(event.target.value);
    };

    return (
        <div className="row mb-3">
            <input className="form-control" type="text" value={value} onChange={handleChange} />
            {error && <p>{error}</p>}
        </div>
    );
};

export default TextInput;