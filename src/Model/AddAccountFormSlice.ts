import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "./Store"
import currency from "currency.js";
import { AccountType } from "./AccountType";

interface AddAccountFormState {
    balance?: currency,
    interestRate?: number,
    accountName?: string,
    accountType: AccountType,
    totalYears?: number,
    availableFunds? : currency,
    minimumAnnualPayment? : currency
}

const initialState: AddAccountFormState = {
    balance: currency(0),
    interestRate: 0,
    accountName: "Investment-1",
    accountType: AccountType.Investment,
    totalYears: 5,
    availableFunds: currency(5000),
    minimumAnnualPayment: currency(0)
}

export const addAccountFormSlice = createSlice({
    name: "addAccountForm",
    initialState,
    reducers: {
        setBalance: (state, action: PayloadAction<currency|undefined>) => {
            state.balance = action.payload;
        },
        setInterestRate: (state, action: PayloadAction<number|undefined>) => {
            state.interestRate = action.payload;
        },
        setAccountName: (state, action: PayloadAction<string|undefined>) => {
            state.accountName = action.payload;
        },
        setAccountType: (state, action: PayloadAction<AccountType>) => {
            state.accountType = action.payload;
        },
        setTotalYears: (state, action: PayloadAction<number|undefined>) => {
            state.totalYears = action.payload;
        },
        setAvailableFunds: (state, action: PayloadAction<currency|undefined>) => {
            state.availableFunds = action.payload;
        },
        setMinimumAnnualPayment: (state, action: PayloadAction<currency|undefined>) => {
            state.minimumAnnualPayment = action.payload;
        }
    }
});

export const {setBalance, setInterestRate, setAccountName, setAccountType, setTotalYears, setAvailableFunds, setMinimumAnnualPayment } = addAccountFormSlice.actions;

export const selectAddAccountForm = (state : RootState) => state.addAccountForm;

export default addAccountFormSlice.reducer;


