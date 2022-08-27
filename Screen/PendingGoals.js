import { useContext, useEffect, useState } from "react";
import { Text } from "react-native";
import GoalsOutput from "../components/GoalsOutput/GoalsOutput";
import { GoalContext } from "../store/goals-context";
import { getDateMinusDays } from "../util/date";
import { fetchGoals } from "../util/http_goal";
import Loader from "./Components/Loader";
import ErrorOverlay from "./Components/ErrorOverlay";

function PendingGoals() {
  const goalsCtx = useContext(GoalContext);
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  useEffect(() => {
    async function getGoals() {
      setIsFetching(true);
      try {
        const goals = await fetchGoals();
        goalsCtx.setGoals(goals);
        // console.log(goals);
      } catch (error) {
        setError("Error fetching goals");
      }

      setIsFetching(false);
      //console.log(goals);
    }
    getGoals();
  }, []);

  if (error && !isFetching) {
    return <ErrorOverlay message={error} />;
  }

  if (isFetching) {
    return <Loader loading={isFetching} />;
  }

  return (
    <GoalsOutput
      goals={goalsCtx.pendingGoals}
      goalsPeriod="Last 7 days"
      fallbackText="No goals registered for the last 7 days"
    />
  );
}

export default PendingGoals;
