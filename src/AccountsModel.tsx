import { Account } from "./Account";

export class AccountsModel {
    private startingAccounts: Account[] = [];
    private history: Account[][] = [];

    public getStartingAccounts(): Account[] {
        return this.startingAccounts;
    }

    public getHistory(): Account[][] {
        return this.history;
    }

    public addStartingAccount(toAdd: Account): void {
        this.startingAccounts.push(toAdd);
    }

    public addToHistory(toAdd: Account[]): void {
        this.history.push(toAdd);
    }

    public clearHistory(): void {
        this.history = [];
    }

    public removeStartingAccount(toRemove: Account): void {
        const index = this.startingAccounts.indexOf(toRemove);
        this.startingAccounts.splice(index, 1);
    }
}