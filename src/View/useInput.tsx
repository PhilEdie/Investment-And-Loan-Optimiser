import currency from "currency.js";
import { useState } from "react";
import { FormFieldType } from "./FormFieldType";
import { ValidationRules } from "./ValidationRules";


export interface IInput {
    value : string,
    displayValue : string,
    isValidInput : boolean,
    onChange: (value: string) => void
}

export function useInput(type: FormFieldType, initialValue: string) : IInput {
    const _type = type;
    const [value, setValue] = useState<string>(initialValue);
    const [isValidInput, setIsValidInput] = useState<boolean>(true);
    const [displayValue, setDisplayValue] = useState<string>();

    const handleChange = (value: string) => {
        let isValid = false;
        switch (_type) {
            case FormFieldType.AccountName:
                isValid = ValidationRules.isValidName(value);
                break;
            case FormFieldType.Balance:
                isValid = ValidationRules.isValidCurrency(value) && parseFloat(value) > 0;
                break;
            case FormFieldType.MinimumAnnualPayment:
                isValid = ValidationRules.isValidCurrency(value);
                break;
            case FormFieldType.InterestRate:
                isValid = ValidationRules.isValidInterestRate(value) && parseFloat(value) > 0;
                break;
            case FormFieldType.TotalIterations:
                isValid = ValidationRules.isValidTotalIterations(value);
                break;
            default:
                setIsValidInput(false);
                throw new Error("Form field type is invalid for useInput hook.");
        }

        setValue(value);
        setIsValidInput(isValid);
        if(isValid){
            handleDisplayValueChange(value);
        } else {
            handleDisplayValueChange("");
        }
    }

    const onFocus = () => {
        
    }

    const onBlur = () => {

    }

    const handleDisplayValueChange = (value : string) => {
        if(value.length === 0){
            setDisplayValue("");
            return;
        }
        switch(_type){
            case FormFieldType.Balance:
                setDisplayValue(currency(parseFloat(value)).format());
                break;
            case FormFieldType.MinimumAnnualPayment:
                setDisplayValue(currency(parseFloat(value)).format());
                break;
            case FormFieldType.InterestRate:
                setDisplayValue(value + "%");
            break;
            default:
                setDisplayValue(value);
        }
    }

    return  {
        value : value,
        displayValue : displayValue,
        isValidInput : isValidInput,
        onChange : handleChange
    } as IInput;
}

export default useInput;