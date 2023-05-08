import currency from "currency.js";
import { Account } from "../Model/Account";
import { Investment } from "../Model/Investment";
import { Loan } from "../Model/Loan";
import { Utilities } from "../Utilities";
import { IStack } from "../DataStructures/IStack";
import { Stack } from "../DataStructures/Stack";
import { useDispatch } from "react-redux";
import { set } from "../Model/HistorySlice";

export function runOptimiser(
  startingAccounts: Account[],
  totalIterations: number,
  availableFunds: currency
) : IStack<Account[]> {
  const history: IStack<Account[]> = new Stack<Account[]>();

  if (totalIterations <= 0) {
    throw new Error("Error. totalIterations should be greater than 0.");
  }
  if (startingAccounts.length === 0) {
    throw new Error("Error. Starting accounts should not be empty.");
  }

  if (availableFunds.value <= 0) {
    throw new Error("Error. availableFunds should be greater than 0.");
  }

  history.push(startingAccounts);

  for (let i = 0; i < totalIterations; i++) {
    // Stop if all accounts are loans and paid off.
    if (
      Utilities.containsAllLoans(history.peek()) &&
      Utilities.allLoansPaidOff(history.peek())
    ) {
      break;
    }
    runOptimiserOnce(history, availableFunds);
  }
  return history;
}

function runOptimiserOnce(history: IStack<Account[]>, availableFunds: currency) {
  if (availableFunds.value <= 0) {
    throw new Error("Error. availableFunds should be greater than 0.");
  }
  if (history.peek() === undefined) {
    throw new Error("Error. history should not be empty.");
  }

  let remainingIncome = availableFunds;
  let accounts = createCopyOfAccounts(history.peek());

  // Sort accounts so high priority accounts will be paid first.
  accounts = accounts.sort((a, b) => a.compareTo(b));

  // Pay minimums into each loan:
  remainingIncome = payMinimumsOnLoans(accounts, remainingIncome);

  // Pay highest priority accounts first, then distribute remaining funds to
  // following accounts.

  while (remainingIncome.value > 0) {
    for (const account of accounts) {
      if (account instanceof Loan && account.isPaidOff()) {
        continue; // Skip paid off loans.
      }
      remainingIncome = account.makePayment(remainingIncome);
    }
    if (
      Utilities.containsAllLoans(accounts) &&
      Utilities.allLoansPaidOff(accounts)
    ) {
      break;
    }
  }

  // Once done, apply interest.
  applyInterestToAll(accounts);

  history.push(accounts);
}

function payMinimumsOnLoans(
  accounts: Array<Account>,
  availableFunds: currency
) {
  if (availableFunds.value <= 0) {
    throw new Error("Error. Available funds should be greater than 0.");
  }

  let remainingFunds = availableFunds;
  for (const account of accounts) {
    if (account instanceof Loan && !account.isPaidOff()) {
      const change = account.makeMinimumPayment();
      remainingFunds = remainingFunds
        .subtract(account.getMinimumPayment())
        .add(change);
    }
  }

  // There should still be some money left over to invest after all minimum
  // payments.
  if (remainingFunds.value < 0) {
    throw new Error(
      "Error. Remaining funds shouldn't be negative after paying minimums."
    );
  }

  return remainingFunds;
}

function applyInterestToAll(accounts: Array<Account>) {
  for (const account of accounts) {
    account.applyInterest();
  }
}

function createCopyOfAccounts(toCopy: Account[] | undefined): Account[] {
  if (toCopy === undefined) {
    throw new Error("Error. toCopy shouldn't be empty.");
  }

  const copied: Array<Account> = [];

  for (const account of toCopy) {
    let clonedAccount : Account;
    if (account instanceof Loan) {
      clonedAccount = Loan.clone(account);
    } else {
      clonedAccount = Investment.clone(account);
    }
    clonedAccount.setPaymentForPeriod(currency(0));
    clonedAccount.setInterestForPeriod(currency(0));
    copied.push(clonedAccount);
  }

  return copied;
}