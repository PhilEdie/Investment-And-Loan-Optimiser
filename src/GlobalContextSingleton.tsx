import React from "react";
import { AccountsController } from "./Controller/AccountsController";
import { GlobalContext } from "./GlobalContext";

export class GlobalContextSingleton {
    private static instance: GlobalContext;

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private constructor() { }

    public static getInstance(): GlobalContext {
        if (GlobalContextSingleton.instance === undefined) {
            GlobalContextSingleton.instance = new GlobalContext();
        }
        return GlobalContextSingleton.instance;
    }
}
export { GlobalContext };

