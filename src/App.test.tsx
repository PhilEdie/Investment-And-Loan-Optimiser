import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { Loan } from "./Loan";
import { Investment } from "./Investment";
import { Account } from "./Account";
import currency from "currency.js";
import Utilities from "./Utilities";
import { AccountsController } from "./AccountsController";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test("payOffLoanWithPayment", () => {
  const loan = new Loan("Loan 1", 1.05, currency(-500), currency(100));
  const leftoverIncome = loan.makePayment(currency(1000));
  expect(leftoverIncome).toBe(currency(500));
  expect(loan.paymentForPeriod).toBe(currency(500));
  expect(loan.isPaidOff()).toBe(true);
});

test("payOffLoanWithMinimumPayment", () => {
  const loan = new Loan("Loan 1", 1.05, currency(-100), currency(200));
  const leftoverIncome = loan.makeMinimumPayment();
  expect(leftoverIncome).toBe(100.0);
  expect(loan.paymentForPeriod).toBe(currency(100));
  expect(loan.isPaidOff()).toBe(true);
});

test("sortingAccounts1", () => {
  const toSort: Account[] = [];
  toSort.push(new Loan("Loan 1", 1.25, -300, 50));
  toSort.push(new Loan("Loan 2", 1.1, -1500, 100));
  toSort.push(new Investment("Investment 1", 1.08, 5000));
  toSort.push(new Investment("Investment 2", 1.04, 20000));

  const expected = new ArrayList<>(toSort);
  Collections.sort(toSort);
  expect(toSort).toEqual(expected);
});

test("sortingAccounts2", () => {
  const toSort: Account[] = [];
  toSort.push(new Loan("Loan 1", 1.25, -300, 50));
  toSort.push(new Investment("Investment 1", 1.25, 5000));

  const expected = new ArrayList<>(toSort);
  Collections.sort(toSort);
  expect(toSort).toEqual(expected);
});

test("sortingAccounts3", () => {
  const toSort: Account[] = [];
  toSort.push(new Loan("Loan 1", 1.26, -300, 50));
  toSort.push(new Loan("Loan 2", 1.25, -300, 50));
  toSort.push(new Investment("Investment 1", 1.25, 5000));

  const expected = new ArrayList<>(toSort);
  Collections.sort(toSort);
  expect(toSort).toEqual(expected);
});

test("sortingEqualInterestRateAccounts", () => {
  const toSort: Account[] = [];
  toSort.push(new Loan("Loan 1", 1.1, -10000, 100));
  toSort.push(new Investment("Investment 1", 1.1, 5000));
  toSort.push(new Loan("Loan 2", 1.08, -10000, 100));
  toSort.push(new Investment("Investment 2", 1.08, 5000));

  const expected = JSON.parse(JSON.stringify(toSort)) as typeof toSort;
  Collections.sort(toSort);
  expect(toSort.toString()).toEqual(expected.toString());
});

test("sortingAccounts2", () => {
  const toSort: Account[] = [];
  toSort.push(new Loan("Loan 1", 1.25, -300, 50));
  toSort.push(new Investment("Investment 1", 1.25, 5000));

  const expected = JSON.parse(JSON.stringify(toSort)) as typeof toSort;

  Collections.sort(toSort);
  expect(toSort).toEqual(expected);
});

test("sortingAccounts3", () => {
  const toSort: Account[] = [];
  toSort.push(new Loan("Loan 1", 1.26, currency(-300), currency(50)));
  toSort.push(new Loan("Loan 2", 1.25, currency(-300), currency(50)));
  toSort.push(new Investment("Investment 1", 1.25, currency(5000)));

  const expected = JSON.parse(JSON.stringify(toSort)) as typeof toSort;
  Collections.sort(toSort);
  expect(toSort).toEqual(expected);
});

test("sortingEqualInterestRateAccounts", () => {
  const toSort: Account[] = [];
  toSort.push(new Loan("Loan 1", 1.1, -10000, 100));
  toSort.push(new Investment("Investment 1", 1.1, 5000));
  toSort.push(new Loan("Loan 2", 1.08, -10000, 100));
  toSort.push(new Investment("Investment 2", 1.08, 5000));

  const expected = JSON.parse(JSON.stringify(toSort)) as typeof toSort;
  Collections.sort(toSort);
  expect(toSort.toString()).toEqual(expected.toString());
});

test("accumulatingInterest", () => {
  const p = new AccountController();
  const m = p.getAccountsModel();
  p.getAccountsModel().addStartingAccount(new Loan("Loan 1", 1.05, -1000, 100));
  p.run(1, 100);
  expect(m.getHistory().peek().get(0).getBalance()).toBe(-945);
  expect(m.getHistory().peek().get(0).getInterestForPeriod()).toBe(-45);
});

test("distributeAcrossLoans1", () => {
  const p = new AccountsController();
  const m = p.getAccountsModel();
  m.addStartingAccount(new Loan("Loan 1", 1.05, currency(-200), currency(100)));
  m.addStartingAccount(new Loan("Loan 2", 1.05, currency(-200), currency(100)));
  m.addStartingAccount(new Investment("Investment 1", 1.05, currency(0)));
  p.run(1, currency(500));

  const topOfStack = m.getHistory().peek();

  expect(topOfStack.toString()).toEqual(
    "[Loan 1[interestRate=1.05, balance=$0.00, minimumPayment=$100.00], "
    + "Loan 2[interestRate=1.05, balance=$0.00, minimumPayment=$100.00], "
    + "Investment 1[interestRate=1.05, balance=$105.00]]"
  );
  expect(Utilities.getPaidOffLoanNames(topOfStack)).toEqual("Loan 1, Loan 2");
});

test("defaultNameRegex", () => {
  expect(Utilities.isDefaultName("Loan1")).toBe(true);
  expect(Utilities.isDefaultName("Investment1")).toBe(true);
  expect(Utilities.isDefaultName("Loan10")).toBe(true);
  expect(Utilities.isDefaultName("Investment10")).toBe(true);
  expect(Utilities.isDefaultName("Loan")).toBe(false);
  expect(Utilities.isDefaultName("Investment")).toBe(false);
  expect(Utilities.isDefaultName("loan1")).toBe(false);
  expect(Utilities.isDefaultName("investment1")).toBe(false);
  expect(Utilities.isDefaultName("loan10")).toBe(false);
  expect(Utilities.isDefaultName("investment10")).toBe(false);
});

test("testInvalidInputs1", () => {
  const f = new AccountForm();
  f.setBalance("1000000000000");
  f.setMinimumPayment("1000000000000");
  f.setInterestRate("1000");
  f.setIncome("1000000000000");
  f.setTotalPeriods("2000");
  expect(f.getBalanceValue()).toBe(0.0);
  expect(f.getMinimumPaymentValue()).toBe(0.0);
  expect(f.getInterestRateValue()).toBe(1.0);
  expect(f.getIncomeValue()).toBe(0.0);
  expect(f.getTotalPeriods()).toBe(1);
});

test("testInvalidInputs2Investment", () => {
  const f = new AccountForm();
  f.setBalance("-1");
  f.setMinimumPayment("-1");
  f.setInterestRate("-1");
  f.setIncome("-1");
  f.setTotalPeriods("-1");
  expect(f.getBalanceValue()).toBe(0.0);
  expect(f.getMinimumPaymentValue()).toBe(0.0);
  expect(f.getInterestRateValue()).toBe(1.0);
  expect(f.getIncomeValue()).toBe(0.0);
  expect(f.getTotalPeriods()).toBe(1);
});

test("testInvalidInputs2Loan", () => {
  const f = new AccountForm();
  f.setType(Loan.class);
  f.setBalance("-1");
  f.setMinimumPayment("-1");
  f.setInterestRate("-1");
  f.setIncome("-1");
  f.setTotalPeriods("-1");
  expect(f.getBalanceValue()).toBe(-1.0);
  expect(f.getMinimumPaymentValue()).toBe(0.0);
  expect(f.getInterestRateValue()).toBe(1.0);
  expect(f.getIncomeValue()).toBe(0.0);
  expect(f.getTotalPeriods()).toBe(1);
});

test("testInvalidInputs3", () => {
  const f = new AccountForm();
  f.setBalance("0");
  f.setMinimumPayment("0");
  f.setInterestRate("0");
  f.setIncome("0");
  f.setTotalPeriods("0");
  expect(f.getBalanceValue()).toBe(0.0);
  expect(f.getMinimumPaymentValue()).toBe(0.0);
  expect(f.getInterestRateValue()).toBe(1.0);
  expect(f.getIncomeValue()).toBe(0.0);
  expect(f.getTotalPeriods()).toBe(1);
});

test("testInvalidInputs4", () => {
  const f = new AccountForm();
  f.setBalance("number");
  f.setMinimumPayment("number");
  f.setInterestRate("number");
  f.setIncome("number");
  f.setTotalPeriods("number");
  expect(f.getBalanceValue()).toBe(0.0);
  expect(f.getMinimumPaymentValue()).toBe(0.0);
  expect(f.getInterestRateValue()).toBe(1.0);
  expect(f.getIncomeValue()).toBe(0.0);
  expect(f.getTotalPeriods()).toBe(1);
});

test("testInvalidInputs5", () => {
  const f = new AccountForm();
  f.setBalance("1.5");
  f.setMinimumPayment("1.5");
  f.setInterestRate("1.5");
  f.setIncome("1.5");
  f.setTotalPeriods("1.5");
  expect(f.getBalanceValue()).toBe(1.5);
  expect(f.getMinimumPaymentValue()).toBe(1.5);
  expect(f.getInterestRateValue()).toBe(1.015);
  expect(f.getIncomeValue()).toBe(1.5);
  expect(f.getTotalPeriods()).toBe(1);
});

test("testInvalidInputs6", () => {
  const f = new AccountForm();
  f.setType(Loan.class);
  f.setBalance("1.5");
  f.setMinimumPayment("1.5");
  f.setInterestRate("1.5");
  f.setIncome("1.5");
  f.setTotalPeriods("1.5");
  expect(f.getBalanceValue()).toBe(-1.5);
  expect(f.getMinimumPaymentValue()).toBe(1.5);
  expect(f.getInterestRateValue()).toBe(1.015);
  expect(f.getIncomeValue()).toBe(1.5);
  expect(f.getTotalPeriods()).toBe(1);
});


test("allLoansPaidOffEarly", () => {
  const p = new AccountsController();
  const m = p.getAccountsModel();
  m.addStartingAccount(new Loan("Loan 1", 1.05, currency(-500), currency(100)));
  m.addStartingAccount(new Loan("Loan 2", 1.05, currency(-500), currency(100)));
  p.run(10, currency(500));
  expect(m.getHistory().length).toBe(4);
});

test("validatingNumbers", () => {
  expect(Utilities.validateNumber("0", 1)).toBe(true);
  expect(Utilities.validateNumber("-100", 10)).toBe(false);
  expect(Utilities.validateNumber("100000000000000000000", 10)).toBe(false);
  expect(Utilities.validateNumber("ten", 10)).toBe(false);
});

test("stringFormatting", () => {
  expect(Utilities.convertToDollarFormat(1234.5678)).toBe("$1,234.57");
  expect(Utilities.convertToPercentageFormat(12.345678)).toBe("12.35%");
});

test("ensureAccountBalanceInterestRateAlwaysPositive", () => {
  expect(() => {
    new Investment("i", -1, currency(1));
  }).toThrowError();
});

test("ensureInvestmentBalanceAlwaysPositive1", () => {
  expect(() => {
    new Investment("i", 1, currency(-1));
  }).toThrowError();
});

test("ensureInvestmentBalanceAlwaysPositive2", () => {
  const inv = new Investment("i", 1, currency(1));
  expect(() => {
    inv.balance = currency(-100);
  }).toThrowError();
});

test("ensureLoanBalanceAlwaysNegative1", () => {
  expect(() => {
    new Loan("i", 1, currency(1), currency(1));
  }).toThrowError();
});

test("ensureLoanBalanceAlwaysNegative2", () => {
  const loan = new Loan("i", 1, currency(-1), currency(1));
  expect(() => {
    loan.balance = (currency(100));
  }).toThrowError();
});





