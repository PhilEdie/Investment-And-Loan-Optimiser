import currency from "currency.js";
import { Account } from "./Account";

export class Loan extends Account {
    private minimumPayment: currency;
    private paidOff = false;

    constructor(accountName: string, interestRate: number, balance: currency, minimumPayment: currency) {
        super(accountName, interestRate, balance, 1);
        if (balance.value > 0) {
            throw new Error("Error, a balance on a Model.Loan object should be negative.");
        }
        this.minimumPayment = minimumPayment;
    }

    public static clone(toCopy: Loan) {
        const clone = new Loan(toCopy.accountName, toCopy.interestRate, toCopy.balance, toCopy.minimumPayment);
        clone.minimumPayment = toCopy.minimumPayment;
        clone.paidOff = toCopy.paidOff;
        return clone;
    }

    public makePayment(payment: currency): currency {
        if (this.isPaidOff()) {
            throw new Error("Error. We cannot make a payment on an already paid off loan.");
        }

        const originalBalance = this.balance;

        if (this.balance.add(payment).value >= 0) {
            this.paymentForPeriod = this.paymentForPeriod.add(Math.abs(originalBalance.value));
            this.balance = currency(0);
            this.paidOff = true;
            return originalBalance.add(payment);
        } else {
            this.paymentForPeriod = this.paymentForPeriod.add(payment);
            this.balance = this.balance.add(payment);
            return currency(0);
        }
    }

    public set balance(newBalance: currency) {
        if (newBalance.value > 0) {
            throw new Error("Error. The balance on a Loan object should not be positive.");
        }
        this.balance = newBalance;
    }

    public makeMinimumPayment(): currency {
        return this.makePayment(this.minimumPayment);
    }

    public getMinimumPayment(): currency {
        return this.minimumPayment;
    }

    public isPaidOff(): boolean {
        return this.paidOff;
    }

    public toString(): string {
        return `${this.accountName}[interestRate=${this.interestRate}, balance=$${this.balance.format()}, minimumPayment=$${this.minimumPayment.format()}]`;
    }
}
