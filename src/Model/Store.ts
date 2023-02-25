import { configureStore } from "@reduxjs/toolkit";
import startingAccountsReducer from "./StartingAccountsSlice";

const store = configureStore({
    reducer: {
        startingAccounts: startingAccountsReducer
        // history: historyReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;