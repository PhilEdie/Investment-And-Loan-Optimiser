import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "./Store"
import currency from "currency.js";
import { AccountType } from "./AccountType";

interface AddAccountFormState {
    balance: {
        value? : currency,
        isValid: boolean   
    },
    interestRate : {
        value? : number,
        isValid : boolean
    },
    accountName : {
        value? : string,
        isValid : boolean
    },

    accountType : AccountType,

    totalYears : {
        value? : number,
        isValid : boolean
    },
    availableFunds : {
        value? : currency,
        isValid : boolean
    },
    minimumAnnualPayment : {
        value? : currency,
        isValid: boolean
    }
}

const initialState: AddAccountFormState = {
    balance: {
        value : currency(0),
        isValid : true
    },

    interestRate: {
        value : 0,
        isValid : true
    },

    accountName: {
        value : "Investment-1",
        isValid : true
    },

    accountType: AccountType.Investment,

    totalYears: {
        value : 5,
        isValid : true
    },

    availableFunds: {
        value : currency(5000),
        isValid : true
    },

    minimumAnnualPayment: {
        value : currency(0),
        isValid : true
    }
}

export const addAccountFormSlice = createSlice({
    name: "addAccountForm",
    initialState,
    reducers: {
        setBalance: (state, action: PayloadAction<string>) => {
            
            
            state.balance.value = currency(action.payload);
            
            state.balance.value = action.payload;
        },
        setInterestRate: (state, action: PayloadAction<number>) => {
            state.interestRate.value = action.payload;
        },
        setAccountName: (state, action: PayloadAction<string>) => {
            state.accountName.value = action.payload;
        },
        setAccountType: (state, action: PayloadAction<AccountType>) => {
            state.accountType = action.payload;
        },
        setTotalYears: (state, action: PayloadAction<number>) => {
            state.totalYears.value = action.payload;
        },
        setAvailableFunds: (state, action: PayloadAction<currency>) => {
            state.availableFunds.value = action.payload;
        },
        setMinimumAnnualPayment: (state, action: PayloadAction<currency>) => {
            state.minimumAnnualPayment.value = action.payload;
        }
    }
});

function isValidDollarAmount(value : string) : boolean {
    const regex = /^\$?[0-9]+(\.[0-9][0-9])?$/;
    return !regex.test(value);
}

function isValidAccountName(value : string) : boolean {
    const regex = /^.{1,20}$/;
    return regex.test(value);
}

function isValidTotalYears(value : string) : boolean {
    const regex = /^(100|[1-9][0-9]?)$/;
    return regex.test(value);
}

function isValidInterestRate(value : string) : boolean {
    const regex = /^(100(\.0{1,3})?|([0-9]{1,2})(\.\d{1,3})?)$/;
    return regex.test(value);
}



export const {setBalance, setInterestRate, setAccountName, setAccountType, setTotalYears, setAvailableFunds, setMinimumAnnualPayment } = addAccountFormSlice.actions;

export const selectAddAccountForm = (state : RootState) => state.addAccountForm;

export default addAccountFormSlice.reducer;


