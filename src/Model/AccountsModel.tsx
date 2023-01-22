import { Account } from "./Account";
import { Stack } from "../DataStructures/Stack";
export class AccountsModel {
    private startingAccounts: Account[] = [];
    private history: Stack<Account[]> = new Stack<Account[]>;

    public getStartingAccounts(): Account[] {
        return this.startingAccounts;
    }

    public addStartingAccount(toAdd: Account) {
        this.startingAccounts.push(toAdd);
    }

    public getHistory(): Stack<Account[]> {
        return this.history;
    }

    public clearHistory(): void {
        this.history = new Stack<Account[]>;
    }

    public removeStartingAccount(toRemove: Account): void {
        const index = this.startingAccounts.indexOf(toRemove);
        this.startingAccounts.splice(index, 1);
    }
}