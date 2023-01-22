import currency from "currency.js";
import { Account } from "./Account";

export class Investment extends Account {

    constructor(accountName: string, interestRate: number, balance: currency, interestForPeriod?: currency, paymentForPeriod?: currency) {
        super(accountName, interestRate, balance, 2, interestForPeriod, paymentForPeriod);
        if (balance.value < 0) {
            throw new Error("Error, a balance on an Investment object should be greater or equal to 0.");
        }
    }

    public static clone(toCopy: Investment) {
        return new Investment(toCopy.getAccountName(), toCopy.getInterestRate(), toCopy.getBalance());
    }

    public toString(): string {
        return `${this.getAccountName()}[interestRate=${this.getInterestRate()}, balance=${this.getBalance().format()}]`;
    }

    public set balance(newBalance: currency) {
        if (newBalance.value < 0) {
            throw new Error("Error, a balance on an Investment object should be greater or equal to 0.");
        }
        this.balance = newBalance;
    }

    public makePayment(payment: currency): currency {
        super.setPaymentForPeriod(payment);
        super.setBalance(super.getBalance().add(payment));
        return currency(0);
    }
}
