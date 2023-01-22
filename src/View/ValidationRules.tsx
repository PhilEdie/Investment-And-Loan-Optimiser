import { GlobalContextSingleton } from "../GlobalContextSingleton";

export class ValidationRules {
    public static isValidCurrency(input: string): boolean {
        const regex = /^(\$)?(([1-9]\d{0,2}(,\d{3})*)|([1-9]\d*)|(0))(\.\d{2})?$/
        return regex.test(input);
    }

    public static isValidName(input: string): boolean {
        const accounts = GlobalContextSingleton
            .getInstance()
            .getAccountsController()
            .getAccountsModel()
            .getStartingAccounts();

        if (input.length == 0
            || input.length >= 24
            || accounts.some(account => account.getAccountName() == input)) {
            return false;
        }
        return true;
    }

    public static isValidInterestRate(input: string): boolean {
        // Check if the string is a number greater or equal to 0, with a maximum of three decimal places. 
        const regex = new RegExp(/^\d+(\.\d{0,3})?$/);
        if (!regex.test(input)) {
            return false;
        }

        // Ensure that the user cannot enter a number greater than 100. 
        if (Number(input) > 100) {
            return false;
        }

        return true;
    }
}