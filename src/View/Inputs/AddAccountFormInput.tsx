import { useDispatch } from "react-redux";
import { AddAccountFormState, selectAddAccountForm } from "../../Model/AddAccountFormSlice";
import { useSelector } from "react-redux";
import { useEffect } from "react";

interface AddAccountFormInputProps {
    storeKey : string
    label : string
    onChange: Function
    validate : (string : string) => boolean;
}

const AddAccountFormInput: React.FC<AddAccountFormInputProps> = ({ storeKey, label, onChange, validate }) => {

    const dispatch = useDispatch();
    const value = useSelector(selectAddAccountForm)[storeKey as keyof AddAccountFormState];

    useEffect(() => {
        if(typeof(value) === "string" && validate(value)){
            document.getElementById(storeKey + "-form-floating")?.classList.remove("is-invalid");
            document.getElementById(storeKey + "-form-control")?.classList.remove("is-invalid");
            document.getElementById(storeKey + "-form-label")?.classList.remove("is-invalid");
            document.getElementById(storeKey + "-form-feedback")?.classList.add("hidden");
        } else  {
            document.getElementById(storeKey + "-form-floating")?.classList.add("is-invalid");
            document.getElementById(storeKey + "-form-control")?.classList.add("is-invalid");
            document.getElementById(storeKey + "-form-label")?.classList.add("is-invalid");
            document.getElementById(storeKey + "-form-feedback")?.classList.remove("hidden");
        }
    }, [value]);

    function handleOnChange(input : string) {
        dispatch(onChange(input));
    }

    return(
        <div className="row mb-3">
            <div className="input-group has-validation">
                <div id={storeKey + "-form-floating"} className="form-floating" >
                    <input id={storeKey + "-form-control"} type="text" className ="form-control" onChange={(e) => handleOnChange(e.target.value)} value={value}/>
                    <label id={storeKey + "-form-label"} className="form-label">{label}</label>
                </div>
                <div id={storeKey + "-form-feedback"} className="invalid-feedback">
                    Please choose valid {label}.
                </div>
            </div>
        </div>
    );
};

export default AddAccountFormInput;