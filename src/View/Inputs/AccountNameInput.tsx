import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Model/Store";
import { setAccountName } from "../../Model/AddAccountFormSlice";
import { useDispatch } from "react-redux";


interface TextInputProps {
    onValidInput: (value: string) => void;
    onInputError: () => void;
}

const TextInput: React.FC<TextInputProps> = ({ onValidInput, onInputError }) => {
    const value = useSelector((state : RootState) => state.addAccountForm.accountName);
    const [error, setError] = useState("");

    const dispatch = useDispatch();
    

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        
        dispatch(setAccountName(event.target.value));

        const textRegex = /^.{1,20}$/;

        if (!textRegex.test(event.target.value)) {
            setError("Please enter a valid name.");

            return;
        }
        setError("");
    };

    return (
        <div className="row mb-3">
            <input className="form-control" type="text" value={value} onChange={handleChange} />
            {error && <p>{error}</p>}
        </div>
    );
};

export default TextInput;