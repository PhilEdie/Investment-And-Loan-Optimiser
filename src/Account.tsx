import currency from "currency.js";

export abstract class Account {
    private _accountName: string;
    private _balance: currency;
    private _interestRate: number;
    private _interestForPeriod = currency(0);
    private _paymentForPeriod = currency(0);
    private _priority: number;

    constructor(newAccountName: string, newInterestRate: number, newBalance: currency, newPriority: number) {
        if (newAccountName.trim() === "") {
            throw new Error("Error. accountName should not be empty.");
        }

        if (newInterestRate < 1) {
            throw new Error("Error, interestRate should be greater or equal to 1.");
        }

        this._accountName = newAccountName;
        this._interestRate = newInterestRate;
        this._balance = newBalance;
        this._priority = newPriority;
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

    public static compare(account1: Account, account2: Account): number {
        if (account1.getInterestRate() > account2.getInterestRate()) {
            return -1;
        } else if (account1.getInterestRate() < account2.getInterestRate()) {
            return 1;
        } else {
            if (account1.getPriority() < account2.getPriority()) {
                return -1;
            } else if (account1.getPriority() > account2.getPriority()) {
                return 1;
            } else {
                if (account1.getAccountName().localeCompare(account2.getAccountName()) < 0) {
                    return -1;
                } else if (account1.getAccountName().localeCompare(account2.getAccountName()) > 0) {
                    return 1;
                } else {
                    return 0;
                }
            }
        }
    }
}

