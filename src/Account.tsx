import currency from "currency.js";

export abstract class Account {

    private _name: string;
    private _balance: currency;
    private _interestRate: number;

    constructor(theName: string, theInterestRate: number, balance: currency) {
        if (theName.length === 0) {
            throw new Error("Error. name should not be empty.");
        }

        if (theInterestRate < 1) {
            throw new Error("Error, interestRate should be greater or equal to 1.");
        }

        this._name = theName;
        this._interestRate = theInterestRate;
        this._balance = balance;
    }

    public get name() {
        return this._name;
    }

    public get interestRate() {
        return this._interestRate;
    }

    public get balance() {
        return this._balance;
    }
}