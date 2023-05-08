import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "./Store"
import currency from "currency.js";

interface OptimiserSettingsState {
    iterations: number;
    availableFunds : currency;
}

const initialState: OptimiserSettingsState = {
    iterations : 1,
    availableFunds : currency(10000)
}

export const optimiserSettingsSlice = createSlice({
    name: "optimiserSettings",
    initialState,
    reducers: {
        setIterations: (state, action: PayloadAction<number>) => {
            state.iterations = action.payload;
        },
        setAvailableFunds: (state, action: PayloadAction<currency>) => {
            state.availableFunds = action.payload;
        }
    }
});

export const {setIterations, setAvailableFunds } = optimiserSettingsSlice.actions;

export const selectOptimiserSettings = (state : RootState) => state.optimiserSettings;

export default optimiserSettingsSlice.reducer;


