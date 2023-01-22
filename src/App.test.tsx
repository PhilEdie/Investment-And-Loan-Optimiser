import currency from "currency.js";
import { Utilities } from "./Utilities";
import { Loan } from "./Model/Loan";
import { Investment } from "./Model/Investment";
import { Account } from "./Model/Account";
import { AccountsController } from "./Controller/AccountsController";
import { AccountsModel } from "./Model/AccountsModel";

test("payOffLoanWithPayment", () => {
  const loan = new Loan("Loan 1", 1.05, currency(-500), currency(100));
  const leftoverIncome = loan.makePayment(currency(1000));
  expect(leftoverIncome).toStrictEqual(currency(500));
  expect(loan.getPaymentForPeriod()).toStrictEqual(currency(500));
  expect(loan.isPaidOff()).toBe(true);
});

test("payOffLoanWithMinimumPayment", () => {
  const loan = new Loan("Loan 1", 1.05, currency(-100), currency(200));
  const leftoverIncome = loan.makeMinimumPayment();
  expect(leftoverIncome).toStrictEqual(currency(100));
  expect(loan.getPaymentForPeriod()).toStrictEqual(currency(100));
  expect(loan.isPaidOff()).toBe(true);
});

test("sortingAccounts1", () => {
  let toSort: Account[] = [];
  toSort.push(new Loan("Loan 1", 1.25, currency(-300), currency(50)));
  toSort.push(new Loan("Loan 2", 1.1, currency(-1500), currency(100)));
  toSort.push(new Investment("Investment 1", 1.08, currency(5000)));
  toSort.push(new Investment("Investment 2", 1.04, currency(20000)));

  // Clone an array.
  const expected = toSort.map(obj => ({ ...obj }));

  toSort = toSort.sort((a, b) => a.compareTo(b));
  expect(toSort).toEqual(expected);
});

test("sortingAccounts2", () => {
  let toSort: Account[] = [];
  toSort.push(new Loan("Loan 1", 1.25, currency(-300), currency(50)));
  toSort.push(new Investment("Investment 1", 1.25, currency(5000)));

  // Clone an array.
  const expected = toSort.map(obj => ({ ...obj }));

  toSort = toSort.sort((a, b) => a.compareTo(b));
  expect(toSort).toEqual(expected);
});

test("sortingAccounts3", () => {
  let toSort: Account[] = [];
  toSort.push(new Loan("Loan 1", 1.26, currency(-300), currency(50)));
  toSort.push(new Loan("Loan 2", 1.25, currency(-300), currency(50)));
  toSort.push(new Investment("Investment 1", 1.25, currency(5000)));

  // Clone an array.
  const expected = toSort.map(obj => ({ ...obj }));

  toSort = toSort.sort((a, b) => a.compareTo(b));
  expect(toSort).toEqual(expected);
});

test("sortingEqualInterestRateAccounts", () => {
  let toSort: Account[] = [];
  toSort.push(new Loan("Loan 1", 1.1, currency(-10000), currency(100)));
  toSort.push(new Investment("Investment 1", 1.1, currency(5000)));
  toSort.push(new Loan("Loan 2", 1.08, currency(-10000), currency(100)));
  toSort.push(new Investment("Investment 2", 1.08, currency(5000)));

  // Clone an array.
  const expected = toSort.map(obj => ({ ...obj }));

  toSort = toSort.sort((a, b) => a.compareTo(b));
  expect(toSort).toEqual(expected);
});

test("sortingAccounts2", () => {
  let toSort: Account[] = [];
  toSort.push(new Loan("Loan 1", 1.25, currency(-300), currency(50)));
  toSort.push(new Investment("Investment 1", 1.25, currency(5000)));

  // Clone an array.
  const expected = toSort.map(obj => ({ ...obj }));

  toSort = toSort.sort((a, b) => a.compareTo(b));
  expect(toSort).toEqual(expected);
});

test("sortingAccounts3", () => {
  let toSort: Account[] = [];
  toSort.push(new Loan("Loan 1", 1.26, currency(-300), currency(50)));
  toSort.push(new Loan("Loan 2", 1.25, currency(-300), currency(50)));
  toSort.push(new Investment("Investment 1", 1.25, currency(5000)));

  // Clone an array.
  const expected = toSort.map(obj => ({ ...obj }));

  toSort = toSort.sort((a, b) => a.compareTo(b));
  expect(toSort).toEqual(expected);
});

test("sortingEqualInterestRateAccounts", () => {
  let toSort: Account[] = [];
  toSort.push(new Loan("Loan 1", 1.1, currency(-10000), currency(100)));
  toSort.push(new Investment("Investment 1", 1.1, currency(5000)));
  toSort.push(new Loan("Loan 2", 1.08, currency(-10000), currency(100)));
  toSort.push(new Investment("Investment 2", 1.08, currency(5000)));

  // Clone an array.
  const expected = toSort.map(obj => ({ ...obj }));

  toSort = toSort.sort((a, b) => a.compareTo(b));
  expect(toSort).toEqual(expected);
});


test("accumulatingInterest", () => {
  const p = new AccountsController();
  const m = p.getAccountsModel();
  m.addStartingAccount(new Loan("Loan 1", 1.05, currency(-1000), currency(100)));
  p.run(1, currency(100));
  const history = m.getHistory();
  expect(history.peek()![0].getBalance()).toEqual(currency(-945));
  expect(history.peek()![0].getInterestForPeriod()).toEqual(currency(-45));
});

test("distributeAcrossLoans1", () => {
  const p = new AccountsController();
  const m: AccountsModel = p.getAccountsModel();
  m.addStartingAccount(new Loan("Loan 1", 1.05, currency(-200), currency(100)));
  m.addStartingAccount(new Loan("Loan 2", 1.05, currency(-200), currency(100)));
  m.addStartingAccount(new Investment("Investment 1", 1.05, currency(0)));
  p.run(1, currency(500));

  const topOfStack = m.getHistory().peek();

  expect(topOfStack).toEqual([
    new Loan("Loan 1", 1.05, currency(0), currency(100), currency(0), currency(200), true),
    new Loan("Loan 2", 1.05, currency(0), currency(100), currency(0), currency(200), true),
    new Investment("Investment 1", 1.05, currency(105), currency(5), currency(100))
  ]);
  expect(Utilities.allLoansPaidOff(topOfStack)).toBe(true);
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

// test("testInvalidInputs1", () => {
//   const f = new AccountsForm();
//   f.setBalance("1000000000000");
//   f.setMinimumPayment("1000000000000");
//   f.setInterestRate("1000");
//   f.setIncome("1000000000000");
//   f.setTotalPeriods("2000");
//   expect(f.getBalanceValue()).toBe(0.0);
//   expect(f.getMinimumPaymentValue()).toBe(0.0);
//   expect(f.getInterestRateValue()).toBe(1.0);
//   expect(f.getIncomeValue()).toBe(0.0);
//   expect(f.getTotalPeriods()).toBe(1);
// });

// test("testInvalidInputs2Investment", () => {
//   const f = new AccountForm();
//   f.setBalance("-1");
//   f.setMinimumPayment("-1");
//   f.setInterestRate("-1");
//   f.setIncome("-1");
//   f.setTotalPeriods("-1");
//   expect(f.getBalanceValue()).toBe(0.0);
//   expect(f.getMinimumPaymentValue()).toBe(0.0);
//   expect(f.getInterestRateValue()).toBe(1.0);
//   expect(f.getIncomeValue()).toBe(0.0);
//   expect(f.getTotalPeriods()).toBe(1);
// });

// test("testInvalidInputs2Loan", () => {
//   const f = new AccountForm();
//   f.setType(Loan.class);
//   f.setBalance("-1");
//   f.setMinimumPayment("-1");
//   f.setInterestRate("-1");
//   f.setIncome("-1");
//   f.setTotalPeriods("-1");
//   expect(f.getBalanceValue()).toBe(-1.0);
//   expect(f.getMinimumPaymentValue()).toBe(0.0);
//   expect(f.getInterestRateValue()).toBe(1.0);
//   expect(f.getIncomeValue()).toBe(0.0);
//   expect(f.getTotalPeriods()).toBe(1);
// });

// test("testInvalidInputs3", () => {
//   const f = new AccountForm();
//   f.setBalance("0");
//   f.setMinimumPayment("0");
//   f.setInterestRate("0");
//   f.setIncome("0");
//   f.setTotalPeriods("0");
//   expect(f.getBalanceValue()).toBe(0.0);
//   expect(f.getMinimumPaymentValue()).toBe(0.0);
//   expect(f.getInterestRateValue()).toBe(1.0);
//   expect(f.getIncomeValue()).toBe(0.0);
//   expect(f.getTotalPeriods()).toBe(1);
// });

// test("testInvalidInputs4", () => {
//   const f = new AccountForm();
//   f.setBalance("number");
//   f.setMinimumPayment("number");
//   f.setInterestRate("number");
//   f.setIncome("number");
//   f.setTotalPeriods("number");
//   expect(f.getBalanceValue()).toBe(0.0);
//   expect(f.getMinimumPaymentValue()).toBe(0.0);
//   expect(f.getInterestRateValue()).toBe(1.0);
//   expect(f.getIncomeValue()).toBe(0.0);
//   expect(f.getTotalPeriods()).toBe(1);
// });

// test("testInvalidInputs5", () => {
//   const f = new AccountForm();
//   f.setBalance("1.5");
//   f.setMinimumPayment("1.5");
//   f.setInterestRate("1.5");
//   f.setIncome("1.5");
//   f.setTotalPeriods("1.5");
//   expect(f.getBalanceValue()).toBe(1.5);
//   expect(f.getMinimumPaymentValue()).toBe(1.5);
//   expect(f.getInterestRateValue()).toBe(1.015);
//   expect(f.getIncomeValue()).toBe(1.5);
//   expect(f.getTotalPeriods()).toBe(1);
// });

// test("testInvalidInputs6", () => {
//   const f = new AccountForm();
//   f.setType(Loan.class);
//   f.setBalance("1.5");
//   f.setMinimumPayment("1.5");
//   f.setInterestRate("1.5");
//   f.setIncome("1.5");
//   f.setTotalPeriods("1.5");
//   expect(f.getBalanceValue()).toBe(-1.5);
//   expect(f.getMinimumPaymentValue()).toBe(1.5);
//   expect(f.getInterestRateValue()).toBe(1.015);
//   expect(f.getIncomeValue()).toBe(1.5);
//   expect(f.getTotalPeriods()).toBe(1);
// });


test("allLoansPaidOffEarly", () => {
  const p = new AccountsController();
  const m = p.getAccountsModel();
  m.addStartingAccount(new Loan("Loan 1", 1.05, currency(-500), currency(100)));
  m.addStartingAccount(new Loan("Loan 2", 1.05, currency(-500), currency(100)));
  p.run(10, currency(500));
  expect(m.getHistory().size()).toBe(4);
});

// test("validatingNumbers", () => {
//   expect(Utilities.validateNumber("0", 1)).toBe(true);
//   expect(Utilities.validateNumber("-100", 10)).toBe(false);
//   expect(Utilities.validateNumber("100000000000000000000", 10)).toBe(false);
//   expect(Utilities.validateNumber("ten", 10)).toBe(false);
// });

// test("stringFormatting", () => {
//   expect(Utilities.convertToDollarFormat(1234.5678)).toBe("$1,234.57");
//   expect(Utilities.convertToPercentageFormat(12.345678)).toBe("12.35%");
// });

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

test("ensureNewLoanBalanceAlwaysNegative", () => {
  expect(() => {
    new Loan("i", 1, currency(1), currency(1));
  }).toThrowError();
});

test("ensureLoanBalanceAlwaysNegative2", () => {
  const loan = new Loan("i", 1, currency(-1), currency(1));
  expect(() => {
    loan.setBalance(currency(100));
  }).toThrowError();
});





