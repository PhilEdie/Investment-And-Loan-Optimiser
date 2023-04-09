import { useSelector } from "react-redux";
import { Account } from "../Model/Account";
import { selectHistory } from "../Model/HistorySlice";
import PaymentPeriodTable from "./PaymentPeriodTable";

const ResultsTable = () => {

    const history = useSelector(selectHistory);

    const historyArray = history.history.toArray();
    return (
    <div>
        <h1>------ RESULTS ------</h1>
        {historyArray.map((paymentPeriod: Account[]) => (
            <PaymentPeriodTable paymentPeriod={paymentPeriod}/>
        ))}
    </div>
    );
}

export default ResultsTable;