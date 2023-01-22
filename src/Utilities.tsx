import currency from "currency.js";
import { Account } from "./Model/Account";
import { Loan } from "./Model/Loan";


export class Utilities {
    public static isDefaultName(name: string): boolean {
        const regex = new RegExp(/(Loan|Investment)(\d)+/);
        return regex.test(name);
    }

    public static containsAllLoans(accounts: Account[] | undefined): boolean {
        if (accounts === undefined) {
            throw new Error("accounts is undefined.");
        }
        for (const account of accounts) {
            if (!(account instanceof Loan)) {
                return false;
            }
        }
        return true;
    }

    public static allLoansPaidOff(accounts: Account[] | undefined): boolean {
        if (accounts === undefined) {
            throw new Error("accounts is undefined.");
        }
        for (const account of accounts) {
            if (account instanceof Loan && !account.isPaidOff()) {
                return false;
            }
        }
        return true;
    }

    public static getNetWorth(accounts: Account[]): currency {
        const networth = currency(0);
        for (const account of accounts) {
            networth.add(account.getBalance());
        }
        return networth;
    }

    public static getTotalInterest(accounts: Account[]): currency {
        const totalInterest = currency(0);
        for (const account of accounts) {
            totalInterest.add(account.getInterestForPeriod());
        }
        return totalInterest
    }

    public static getPaidOffLoans(accounts: Account[]): Account[] {
        return accounts.filter(account => account instanceof Loan && account.isPaidOff());
    }
}