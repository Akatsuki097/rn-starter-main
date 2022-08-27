import { useContext, useEffect, useState } from "react";
import { Text } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpenseContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";
import Loader from "./Components/Loader";
import ErrorOverlay from "./Components/ErrorOverlay";

function RecentExpenses() {
  const expensesCtx = useContext(ExpenseContext);
  // const [error, setError] = useState(null);
  // const [isFetching, setIsFetching] = useState(true);
  // useEffect(() => {
  //   async function getExpenses() {
  //     setIsFetching(true);
  //     try {
  //       const expenses = await fetchExpenses();
  //       expensesCtx.setExpenses(expenses);
  //     } catch (error) {
  //       setError("Error fetching expenses");
  //     }

  //     setIsFetching(false);
  //     //console.log(expenses);
  //   }
  //   getExpenses();
  // }, []);

  // if (error && !isFetching) {
  //   return <ErrorOverlay message={error} />;
  // }

  // if (isFetching) {
  //   return <Loader loading={isFetching} />;
  // }

  const RecentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    //console.log(today);
    //console.log(expense.date);
    const date7daysAgo = getDateMinusDays(today, 7);
    //console.log(" " + date7daysAgo);

    return expense.date >= date7daysAgo;
  });

  return (
    <ExpensesOutput
      expenses={RecentExpenses}
      expensesPeriod="Last 7 days"
      fallbackText="No expenses registered for the last 7 days"
    />
  );
}

export default RecentExpenses;
