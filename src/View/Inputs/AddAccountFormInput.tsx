import { useDispatch } from "react-redux";

interface AddAccountFormInputProps {
    label : string
    onChange: Function
    validate : (string : string) => boolean;
}

const AddAccountFormInput: React.FC<AddAccountFormInputProps> = ({ label, onChange, validate }) => {

    const dispatch = useDispatch();
    
    function handleOnChange(input : string) {
        dispatch(onChange(input));

        if(validate(input))
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

    function setToDefault()
    {

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

export default AddAccountFormInput;