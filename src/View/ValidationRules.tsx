export class ValidationRules {
    
    public static isValidDollarAmount(value : string) : boolean {
        const regex = /^\$?[0-9]+(\.[0-9][0-9])?$/;
        return regex.test(value);
    }
    
    public static isValidAccountName(value : string) : boolean {
        const regex = /^.{1,20}$/;
        return regex.test(value);
    }
    
    public static isValidTotalYears(value : string) : boolean {
        const regex = /^(100|[1-9][0-9]?)$/;
        return regex.test(value);
    }
    
    public static isValidInterestRate(value : string) : boolean {
        const regex = /^(100(\.0{1,3})?|([0-9]{1,2})(\.\d{1,3})?)$/;
        return regex.test(value);
    }
}