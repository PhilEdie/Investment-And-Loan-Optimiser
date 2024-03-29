import currency from "currency.js";
import { Account } from "./Model/Account";
import { Loan } from "./Model/Loan";


export class Utilities {
    public static isDefaultName(name: string): boolean {
        const regex = new RegExp(/(Loan|Investment)(\d)+/);
        return regex.test(name);
    }

    public static getNetWorth(accounts: Account[]): currency {
        let netWorth = currency(0);
        for (const account of accounts) {
            netWorth = netWorth.add(account.getBalance());
        }
        return netWorth;
    }

    public static getTotalInterest(accounts: Account[]): currency {
        let totalInterest = currency(0);
        for (const account of accounts) {
            totalInterest = totalInterest.add(account.getInterestForPeriod());
        }
        return totalInterest;
    }

    public static getPaidOffLoans(accounts: Account[]): Account[] {
        return accounts.filter(account => account instanceof Loan && account.isPaidOff());
    }

    public static getPaidOffLoansAsString(accounts: Account[]): string {
        const paidOffLoans : Account[] = this.getPaidOffLoans(accounts);
        if(paidOffLoans.length == 0){
            return "N/A";
        }
        const paidOffLoansStringArray : string[] = paidOffLoans.map((account) => account.getAccountName());
        return paidOffLoansStringArray.join(", ");
    }

    public static getTotalMinimumPayments(accounts: Account[]): currency {
        // eslint-disable-next-line prefer-const
        let sumOfMinimumPayments = currency(0);
        for(const account of accounts){
            if(account instanceof Loan){
                sumOfMinimumPayments = sumOfMinimumPayments.add(account.getMinimumPayment());
            }
        }
        return sumOfMinimumPayments;
    }
}