import { useContext } from "react";
import { Text } from "react-native";
import GoalsOutput from "../components/GoalsOutput/GoalsOutput";
import { GoalContext } from "../store/goals-context";
import { IncomeContext } from "../store/incomes-context";

function CompletedGoals() {
  const goalCtx = useContext(GoalContext);

  return (
    <GoalsOutput
      goals={goalCtx.completedGoals}
      goalsPeriod="Total"
      fallbackText="No registered goal found!"
    />
  );
}

export default CompletedGoals;
