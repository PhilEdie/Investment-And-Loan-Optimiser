export class ValidationRules {
    public static isValidCurrency(input: string): boolean {
        const regex = /^(?!0\.00)\d{1,8}(\.\d{1,2})?$/;
        return regex.test(input);
    }

    public static isValidName(input: string): boolean {
        const regex = /^[a-zA-Z0-9]{1,24}$/;
        return regex.test(input);
    }

    public static isValidInterestRate(input: string): boolean {        
        const regex = /^(100(\.0{1,3})?|\d{1,2}(\.\d{1,3})?|0\.\d{1,3})$/;
        return regex.test(input);
    }
}