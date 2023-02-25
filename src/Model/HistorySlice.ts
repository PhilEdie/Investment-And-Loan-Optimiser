import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IStack } from "../DataStructures/IStack"
import { Stack } from "../DataStructures/Stack"
import { Account } from "./Account"
import type { RootState } from "./Store"

interface HistoryState {
    history : IStack<Account[]>
}

const initialState: HistoryState = {
    history : new Stack<Account[]>
}

export const HistorySlice = createSlice({
    name: "History",
    initialState,
    reducers: {
        push: (state, action: PayloadAction<Account[]>) => {
            state.history.push(action.payload);
        },
        clear: (state) => {
            state.history = new Stack<Account[]>;
        },
        set: (state, action: PayloadAction<IStack<Account[]>>) => {
            state.history = action.payload;
        }
    }
});

export const { push, clear, set } = HistorySlice.actions;

export const selectHistory = (state : RootState) => state.accountHistory;

export default HistorySlice.reducer;


