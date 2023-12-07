import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "./Store"
import { AccountType } from "./AccountType";

interface AddAccountFormState {
    balance: string,
    interestRate : string,
    accountName : string,
    accountType : AccountType,
    totalYears : string,
    availableFunds : string,
    minimumAnnualPayment : string
}

const initialState: AddAccountFormState = {
    balance: "0.00",
    interestRate : "0.000",
    accountName : "Investment Account",
    accountType : AccountType.Investment,
    totalYears : "5",
    availableFunds  : "0.00",
    minimumAnnualPayment : "0.00"
}

export const addAccountFormSlice = createSlice({
    name: "addAccountForm",
    initialState,
    reducers: {
        setBalance: (state, action: PayloadAction<string>) => {
            state.balance = action.payload;
        },
        setInterestRate: (state, action: PayloadAction<string>) => {
            state.interestRate = action.payload;
        },
        setAccountName: (state, action: PayloadAction<string>) => {
            state.accountName = action.payload;
        },
        setAccountType: (state, action: PayloadAction<AccountType>) => {
            state.accountType = action.payload;
        },
        setTotalYears: (state, action: PayloadAction<string>) => {
            state.totalYears = action.payload;
        },
        setAvailableFunds: (state, action: PayloadAction<string>) => {
            state.availableFunds = action.payload;
        },
        setMinimumAnnualPayment: (state, action: PayloadAction<string>) => {
            state.minimumAnnualPayment = action.payload;
        }
    }
});

export const {setBalance, setInterestRate, setAccountName, setAccountType, setTotalYears, setAvailableFunds, setMinimumAnnualPayment } = addAccountFormSlice.actions;

export const selectAddAccountForm = (state : RootState) => state.addAccountForm;

export default addAccountFormSlice.reducer;


