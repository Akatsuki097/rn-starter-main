import { useContext, useEffect, useState } from "react";
import { Text } from "react-native";
import IncomesOutput from "../components/IncomesOutput/IncomesOutput";
import { IncomeContext } from "../store/incomes-context";
import { getDateMinusDays } from "../util/date";
import { fetchIncomes } from "../util/http_income";
import Loader from "./Components/Loader";
import ErrorOverlay from "./Components/ErrorOverlay";

function RecentIncomes() {
  const incomesCtx = useContext(IncomeContext);
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  useEffect(() => {
    async function getIncomes() {
      setIsFetching(true);
      try {
        const incomes = await fetchIncomes();
        incomesCtx.setIncomes(incomes);
      } catch (error) {
        setError("Error fetching incomes");
      }

      setIsFetching(false);
      //console.log(incomes);
    }
    getIncomes();
  }, []);

  if (error && !isFetching) {
    return <ErrorOverlay message={error} />;
  }

  if (isFetching) {
    return <Loader loading={isFetching} />;
  }

  const RecentIncomes = incomesCtx.incomes.filter((income) => {
    const today = new Date();
    //console.log(today);
    //console.log(income.date);
    const date7daysAgo = getDateMinusDays(today, 7);
    //console.log(" " + date7daysAgo);

    return income.date >= date7daysAgo;
  });

  return (
    <IncomesOutput
      incomes={RecentIncomes}
      incomesPeriod="Last 7 days"
      fallbackText="No incomes registered for the last 7 days"
    />
  );
}

export default RecentIncomes;
