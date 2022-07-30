import { useContext } from "react";
import { Text } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpenseContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";

function RecentExpenses() {
  const expensesCtx = useContext(ExpenseContext);
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
