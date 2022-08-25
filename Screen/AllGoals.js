import { useContext } from "react";
import { Text } from "react-native";
import GoalsOutput from "../components/GoalsOutput/GoalsOutput";
import { GoalContext } from "../store/goals-context";

function AllGoals() {
  const goalCtx = useContext(GoalContext);
  return (
    <GoalsOutput
      goals={goalCtx.goals}
      goalsPeriod="Total"
      fallbackText="No registered goal found!"
    />
  );
}

export default AllGoals;
