import currency from "currency.js";
import { Account } from "./Account";

export class Loan extends Account {
    private _minimumPayment: currency;
    private _paidOff = false;

    constructor(accountName: string, interestRate: number, balance: currency, minimumPayment: currency) {
        super(accountName, interestRate, balance, 1);
        if (balance.value > 0) {
            throw new Error("Error, a balance on a Model.Loan object should be negative.");
        }
        this._minimumPayment = minimumPayment;
    }

    public static clone(toCopy: Loan) {
        const clone = new Loan(toCopy.getAccountName(), toCopy.getInterestRate(), toCopy.getBalance(), toCopy.getMinimumPayment());
        clone.setIsPaidOff(toCopy.isPaidOff());
        return clone;
    }

    public makePayment(payment: currency): currency {
        if (this.isPaidOff()) {
            throw new Error("Error. We cannot make a payment on an already paid off loan.");
        }

        const originalBalance = this.getBalance();

        if (this.getBalance().add(payment).value >= 0) {
            this.setPaymentForPeriod(this.getPaymentForPeriod().add(Math.abs(originalBalance.value)));
            this.setBalance(currency(0));
            this.setIsPaidOff(true);
            return originalBalance.add(payment);
        } else {
            this.setPaymentForPeriod(this.getPaymentForPeriod().add(payment));
            this.setBalance(this.getBalance().add(payment));
            return currency(0);
        }
    }

    public getBalance(): currency {
        return super.getBalance();
    }

    public setBalance(newBalance: currency) {
        if (newBalance.value > 0) {
            throw new Error("Error. The balance on a Loan object should not be positive.");
        }
        super.setBalance(newBalance);
    }

    public makeMinimumPayment(): currency {
        return this.makePayment(this._minimumPayment);
    }

    public getMinimumPayment(): currency {
        return this._minimumPayment;
    }

    public isPaidOff(): boolean {
        return this._paidOff;
    }

    public setIsPaidOff(isPaid: boolean) {
        this._paidOff = isPaid;
    }

    public toString(): string {
        return `${this.getAccountName()}[interestRate=${this.getInterestRate()}, balance=$${this.getBalance().format()}, minimumPayment=$${this.getMinimumPayment().format()}]`;
    }
}
