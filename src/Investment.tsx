import currency from "currency.js";
import { Account } from "./Account";

class Investment extends Account {

    constructor(accountName: string, interestRate: number, balance: currency) {
        super(accountName, interestRate, balance, 2);
        if (balance.value < 0) {
            throw new Error("Error, a balance on an Investment object should be greater or equal to 0.");
        }
    }

    public static clone(toCopy: Investment) {
        return new Investment(toCopy.accountName, toCopy.interestRate, toCopy.balance);
    }

    public toString(): string {
        return `${this.accountName}[interestRate=${this.interestRate}, balance=${this.balance.format()}]`;
    }

    public setBalance(newBalance: currency) {
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
