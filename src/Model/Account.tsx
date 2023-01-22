import currency from "currency.js";

export abstract class Account {
    private _accountName: string;
    private _balance: currency;
    private _interestRate: number;
    private _interestForPeriod = currency(0);
    private _paymentForPeriod = currency(0);
    private _priority: number;

    constructor(accountName: string, interestRate: number, balance: currency, priority: number, interestForPeriod?: currency, paymentForPeriod?: currency) {
        if (accountName.trim() === "") {
            throw new Error("Error. accountName should not be empty.");
        }

        if (interestRate < 1) {
            throw new Error("Error, interestRate should be greater or equal to 1.");
        }

        this._accountName = accountName;
        this._interestRate = interestRate;
        this._balance = balance;
        this._priority = priority;

        if (interestForPeriod !== undefined) {
            this._interestForPeriod = interestForPeriod;
        }

        if (paymentForPeriod !== undefined) {
            this._paymentForPeriod = paymentForPeriod;
        }
    }

    public getAccountName(): string {
        return this._accountName;
    }

    public getInterestRate(): number {
        return this._interestRate;
    }

    public getBalance(): currency {
        return this._balance;
    }

    public setBalance(newBalance: currency) {
        this._balance = newBalance;
    }

    public getInterestForPeriod(): currency {
        return this._interestForPeriod;
    }

    public setInterestForPeriod(interest: currency) {
        this._interestForPeriod = interest;
    }

    public getPaymentForPeriod(): currency {
        return this._paymentForPeriod;
    }

    public setPaymentForPeriod(newPaymentForPeriod: currency) {
        if (newPaymentForPeriod.value < 0) {
            throw new Error("Error. paymentForPeriod should not be less than 0.");
        }
        this._paymentForPeriod = newPaymentForPeriod;
    }

    public getPriority(): number {
        return this._priority;
    }

    public abstract makePayment(payment: currency): currency;

    public applyInterest() {
        const beforeBalance = this.getBalance();
        this.setBalance(this.getBalance().multiply(this.getInterestRate()));
        this.setInterestForPeriod(this.getBalance().subtract(beforeBalance));
    }

    public compareTo(other: Account): number {
        if (this.getInterestRate() > other.getInterestRate()) {
            return -1;
        } else if (this.getInterestRate() < other.getInterestRate()) {
            return 1;
        } else {
            if (this.getPriority() < other.getPriority()) {
                return -1;
            } else if (this.getPriority() > other.getPriority()) {
                return 1;
            } else {
                if (this.getAccountName().localeCompare(other.getAccountName()) < 0) {
                    return -1;
                } else if (this.getAccountName().localeCompare(other.getAccountName()) > 0) {
                    return 1;
                } else {
                    return 0;
                }
            }
        }
    }
}

