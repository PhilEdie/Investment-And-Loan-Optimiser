import currency from "currency.js";
import { Account } from "./Account";
import { AccountsModel } from "./AccountsModel";
import { AccountType } from "./AccountType";
import { Investment } from "./Investment";
import { Loan } from "./Loan";
import Utilities from "./Utilities";

export class AccountsController {
    private _accountsModel = new AccountsModel();

    public run(totalIterations: number, availableFunds: currency) {
        if (totalIterations <= 0) {
            throw new Error("Error. totalIterations should be greater than 0.");
        }
        if (this._accountsModel.getStartingAccounts().length === 0) {
            throw new Error("Error. Starting accounts should not be empty.");
        }

        if (availableFunds.value <= 0) {
            throw new Error("Error. availableFunds should be greater than 0.");
        }

        this._accountsModel.clearHistory();
        this._accountsModel.addToHistory(this._accountsModel.getStartingAccounts());

        const history = this._accountsModel.getHistory();
        for (let i = 0; i < totalIterations; i++) {
            // Stop if all accounts are loans and paid off.
            if (Utilities.containsAllLoans(history[history.length - 1])
                && Utilities.allLoansPaidOff(history[history.length - 1])) {
                break;
            }
            this.runOnce(this._accountsModel.getHistory(), availableFunds);
        }
    }

    public runOnce(history: Array<Array<Account>>, availableFunds: currency) {
        if (availableFunds.value <= 0) {
            throw new Error("Error. availableFunds should be greater than 0.");
        }
        if (history[history.length - 1].length === 0) {
            throw new Error("Error. history should not be empty.");
        }

        let remainingIncome = availableFunds;
        const accounts = this.createCopyOfAccounts(history[history.length - 1]);

        // Sort accounts so high priority accounts will be paid first.
        accounts.sort((a, b) => a.priority - b.priority);

        // Pay minimums into each loan:
        remainingIncome = this.payMinimumsOnLoans(accounts, remainingIncome);

        // Pay highest priority accounts first, then distribute remaining funds to
        // following accounts.

        while (remainingIncome.value > 0) {
            for (const account of accounts) {
                if (account instanceof Loan && account.isPaidOff()) {
                    continue; // Skip paid off loans.
                }
                remainingIncome = account.makePayment(remainingIncome);
            }
            if (Utilities.containsAllLoans(accounts) && Utilities.allLoansPaidOff(accounts)) {
                break;
            }
        }

        // Once done, apply interest.
        this.applyInterestToAll(accounts);

        history.push(accounts);
    }

    public payMinimumsOnLoans(accounts: Array<Account>, availableFunds: currency) {
        if (availableFunds.value <= 0) {
            throw new Error("Error. Available funds should be greater than 0.");
        }

        let remainingFunds = availableFunds;
        for (const account of accounts) {
            if (account instanceof Loan && !account.isPaidOff()) {
                const change = account.makeMinimumPayment();
                remainingFunds = remainingFunds.subtract(account.getMinimumPayment()).add(change);
            }
        }

        // There should still be some money left over to invest after all minimum
        // payments.
        if (remainingFunds.value < 0) {
            throw new Error("Error. Remaining funds shouldn't be negative after paying minimums.");
        }

        return remainingFunds;
    }

    public applyInterestToAll(accounts: Array<Account>) {
        for (const account of accounts) {
            account.applyInterest();
        }
    }

    public createCopyOfAccounts(toCopy: Array<Account>): Array<Account> {
        if (toCopy.length === 0) {
            throw new Error("Error. toCopy shouldn't be empty.");
        }

        const copied: Array<Account> = [];

        for (const account of toCopy) {
            if (account instanceof Loan) {
                copied.push(Loan.clone(account));
            } else if (account instanceof Investment) {
                copied.push(Investment.clone(account));
            }
        }

        return copied;
    }

    public getTotalMinimumPayments(): currency {
        if (this._accountsModel.getStartingAccounts().length === 0) {
            throw new Error("Error. accountsModel should have at least one account.");
        }

        const sum = currency(0);
        for (const account of this._accountsModel.getStartingAccounts()) {
            if (account instanceof Loan) {
                sum.add(account.getMinimumPayment());
            }
        }
        return sum;
    }

    public removeAccount(accountName: string) {
        for (const account of this._accountsModel.getStartingAccounts()) {
            if (account.accountName === accountName) {
                this._accountsModel.removeStartingAccount(account);
                return;
            }
        }
    }

    public containsAccountWithName(accountName: string): boolean {
        for (const account of this._accountsModel.getStartingAccounts()) {
            if (account.accountName === accountName) {
                return true;
            }
        }
        return false;
    }

    public getDefaultAccountName(type: AccountType): string {
        const name = Object.keys({ type })[0];
        let suffix = 1;

        while (this.containsAccountWithName(name + suffix.toString())) {
            suffix++;
        }
        return (name + suffix.toString());
    }

    public getAccountsModel(): AccountsModel {
        return this._accountsModel;
    }




}

