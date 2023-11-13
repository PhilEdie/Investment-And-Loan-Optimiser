import { configureStore } from "@reduxjs/toolkit";
import startingAccountsReducer from "./StartingAccountsSlice";
import historyReducer from "./HistorySlice";
import optimiserSettingsReducer from "./AddAccountFormSlice";

const store = configureStore({
    reducer: {
        startingAccounts: startingAccountsReducer,
        accountHistory: historyReducer,
        addAccountForm: optimiserSettingsReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;