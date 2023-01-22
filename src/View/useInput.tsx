import { useContext, useState } from "react";
import { GlobalContext } from "../GlobalContextSingleton";
import { FormFieldType } from "./FormFieldType";
import { ValidationRules } from "./ValidationRules";


export function useInput(type: FormFieldType, initialValue: string) {
    const _type = type;
    const [value, setValue] = useState(initialValue);
    const [isValidInput, setIsValidInput] = useState<boolean>(false);

    const handleChange = (value: string) => {
        let isValid = false;
        switch (_type) {
            case FormFieldType.AccountName:
                isValid = ValidationRules.isValidName(value);
                break;
            case (FormFieldType.Balance || FormFieldType.MinimumAnnualPayment):
                isValid = ValidationRules.isValidCurrency(value);
                break;
            case FormFieldType.InterestRate:
                isValid = ValidationRules.isValidInterestRate(value);
                break;
            default:
                setIsValidInput(false);
                throw new Error("Form field type is invalid for useInput hook.");
        }

        setValue(value);
        setIsValidInput(isValid);
    }

    return {
        value,
        isValidInput,
        onChange: handleChange
    };
}

export default useInput;