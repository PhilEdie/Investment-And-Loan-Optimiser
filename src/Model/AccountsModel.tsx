import { Account } from "./Account";
import { Stack } from "../DataStructures/Stack";
import { IStack } from "../DataStructures/IStack";
export class AccountsModel {
    private _startingAccounts: Account[] = [];
    private _history: IStack<Account[]> = new Stack<Account[]>;

    public getStartingAccounts(): Account[] {
        return this._startingAccounts;
    }

    public addStartingAccount(toAdd: Account) {
        this._startingAccounts.push(toAdd);
    }

    public removeStartingAccount(toRemove: Account): void {
        const index = this._startingAccounts.indexOf(toRemove);
        this._startingAccounts.splice(index, 1);
    }

    public getHistory(): IStack<Account[]> {
        return this._history;
    }

    public clearHistory(): void {
        this._history = new Stack<Account[]>;
    }
}