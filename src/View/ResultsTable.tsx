import { useSelector } from "react-redux";
import { Account } from "../Model/Account";
import { selectHistory } from "../Model/HistorySlice";
import PaymentPeriodTable from "./PaymentPeriodTable";

const ResultsTable = () => {

    const history = useSelector(selectHistory);
    const historyArray = history.history.toArray();

    return (
    <div>
        {historyArray.length != 0 && 
            <h2>Results</h2>
        }
        
        {historyArray.slice(1).map((paymentPeriod: Account[], index: number) => (
            <>
            <h3>Year {index + 1}</h3>
            <PaymentPeriodTable paymentPeriod={paymentPeriod}/>
            </>
        ))}
    </div>
    );
}

export default ResultsTable;