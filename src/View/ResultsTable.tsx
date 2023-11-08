import { useSelector } from "react-redux";
import { Account } from "../Model/Account";
import { selectHistory } from "../Model/HistorySlice";
import PaymentPeriodTable from "./PaymentPeriodTable";

const ResultsTable = () => {

    const history = useSelector(selectHistory);
    const historyArray = history.history.toArray();

    return (
    <>
        {historyArray.length != 0 && 
            <><h3>Results</h3><br /></>
        }
        
        {historyArray.slice(1).map((paymentPeriod: Account[], index: number) => (
            <>
            <h3>Year {index + 1}</h3>
            <PaymentPeriodTable paymentPeriod={paymentPeriod}/>
            </>
        ))}
    </>
    );
}

export default ResultsTable;