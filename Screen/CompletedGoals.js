import { useContext } from "react";
import { Text } from "react-native";
import GoalsOutput from "../components/GoalsOutput/GoalsOutput";
import { GoalContext } from "../store/goals-context";
import { IncomeContext } from "../store/incomes-context";

function CompletedGoals() {
  const goalCtx = useContext(GoalContext);
  const incomesCtx = useContext(IncomeContext);

  const incomesSum = incomesCtx.incomes.reduce((sum, income) => {
    return sum + income.amount;
  }, 0);
  //console.log(incomesSum);
  return (
    <GoalsOutput
      goals={goalCtx.goals}
      progress={0.5}
      goalsPeriod="Total"
      fallbackText="No registered goal found!"
    />
  );
}

export default CompletedGoals;
