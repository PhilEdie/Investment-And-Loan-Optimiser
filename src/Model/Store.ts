import { configureStore } from "@reduxjs/toolkit";
import startingAccountsReducer from "./StartingAccountsSlice";
import historyReducer from "./HistorySlice";
import optimiserSettingsReducer from "./OptimiserSettingsSlice";

const store = configureStore({
    reducer: {
        startingAccounts: startingAccountsReducer,
        accountHistory: historyReducer,
        optimiserSettings: optimiserSettingsReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;