import { IStack } from "../DataStructures/IStack";
import { Account } from "../Model/Account";
import PaymentPeriodTable from "./PaymentPeriodTable";

export interface ResultsTableProps {
    history: IStack<Account[]>;
}

const ResultsTable = ({ history }: ResultsTableProps) => {

    let historyArray = history.toArray();
    historyArray = historyArray.reverse();

    return (
    <>
        {historyArray.map((paymentPeriod: Account[]) => {
            <PaymentPeriodTable paymentPeriod={paymentPeriod}/>
        })}
    </>
    );
}

export default ResultsTable;