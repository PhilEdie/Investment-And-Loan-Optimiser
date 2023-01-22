import { AccountsController } from "./Controller/AccountsController";

export class GlobalContext {
    private _accountsController: AccountsController = new AccountsController();

    public getAccountsController() {
        return this._accountsController;
    }
}