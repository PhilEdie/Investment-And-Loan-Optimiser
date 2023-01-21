import currency from "currency.js";

export abstract class Account {
    private _accountName: string;
    private _balance: currency;
    private _interestRate: number;
    private _interestForPeriod = currency(0);
    private _paymentForPeriod = currency(0);
    private _priority: number;

    constructor(accountName: string, interestRate: number, balance: currency, priority: number) {
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
    }

    public get accountName(): string {
        return this._accountName;
    }

    public get interestRate(): number {
        return this._interestRate;
    }

    public get balance(): currency {
        return this._balance;
    }

    public set balance(newBalance: currency) {
        this._balance = newBalance;
    }

    public get interestForPeriod(): currency {
        return this._interestForPeriod;
    }

    public get paymentForPeriod(): currency {
        return this._paymentForPeriod;
    }

    public set paymentForPeriod(newPaymentForPeriod: currency) {
        if (newPaymentForPeriod.value < 0) {
            throw new Error("Error. paymentForPeriod should not be less than 0.");
        }
        this._paymentForPeriod = newPaymentForPeriod;
    }

    public get priority(): number {
        return this._priority;
    }

    public abstract makePayment(payment: currency): currency;

    public applyInterest() {
        const beforeBalance = this.balance;
        this.balance = this.balance.multiply(this.interestRate);
        this._interestForPeriod = this.balance.subtract(beforeBalance);
    }

    public compareTo(other: Account): number {
        if (this.interestRate > other.interestRate) {
            return -1;
        } else if (this.interestRate < other.interestRate) {
            return 1;
        } else {
            if (this.priority < other.priority) {
                return -1;
            } else if (this.priority > other.priority) {
                return 1;
            } else {
                if (this.accountName.localeCompare(other.accountName) < 0) {
                    return -1;
                } else if (this.accountName.localeCompare(other.accountName) > 0) {
                    return 1;
                } else {
                    return 0;
                }
            }
        }
    }
}
