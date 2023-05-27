export class DataPoint {
    _year : Date;
    _netWorth: number;

    constructor(year: Date, netWorth: number) {
        this._year = year;
        this._netWorth = netWorth;
    }
}