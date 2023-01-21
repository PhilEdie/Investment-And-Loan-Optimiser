import currency from "currency.js";
import { Account } from "./Account";

export class Investment extends Account {

    constructor(accountName: string, interestRate: number, balance: currency) {
        if (balance.value < 0) {
            throw new Error("Error, a balance on an Investment object should be greater or equal to 0.");
        }
        super(accountName, interestRate, balance, 2);
    }

    public static clone(toCopy: Investment) {
        return new Investment(toCopy.accountName, toCopy.interestRate, toCopy.balance);
    }

    public toString(): string {
        return `${this.accountName}[interestRate=${this.interestRate}, balance=${this.balance.format()}]`;
    }

    public set balance(newBalance: currency) {
        if (newBalance.value < 0) {
            throw new Error("Error, a balance on an Investment object should be greater or equal to 0.");
        }
        this.balance = newBalance;
    }

    public makePayment(payment: currency): currency {
        this.paymentForPeriod = payment;
        this.balance = this.balance.add(payment);
        return currency(0);
    }
}
