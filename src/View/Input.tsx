import useInput, { IInput } from "./useInput";


const Input = (useInput: IInput, fieldName : string) => {
    return(
        <div className="row mb-3">
            <div className="col-md-6">
                <label className="form-label">{fieldName}</label>
                <input className="form-control" type="number" value={useInput.value} onChange={(e) => useInput.onChange(e.target.value)} />
                {!useInput.isValidInput &&
                <span>{"Invalid " + fieldName + "."}</span>
                }
            </div>
        </div>
    );
}

export default Input;