import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Account } from "./Account"
import type { RootState } from "./Store"

interface StartingAccountsState {
    accounts : Account[]
}

const initialState: StartingAccountsState = {
    accounts : []
}

export const startingAccountsSlice = createSlice({
    name: "startingAccounts",
    initialState,
    reducers: {
        addAccount: (state, action: PayloadAction<Account>) => {
            state.accounts.push(action.payload);
        },
        removeAccount: (state, action: PayloadAction<string>) => {
            state.accounts = state.accounts.filter(account => account.getAccountName() !== action.payload);
        }
    }
});

export const {addAccount, removeAccount } = startingAccountsSlice.actions;

export const selectStartingAccounts = (state : RootState) => state.startingAccounts;

export default startingAccountsSlice.reducer;


