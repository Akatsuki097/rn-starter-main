import { createContext, useReducer, useState, useEffect } from "react";
import { updateGoal } from "../util/http_goal";

export const GoalContext = createContext({
  goals: [],
  addGoal: ({ description, amount, date, isCompleted }) => {},
  deleteGoal: (id) => {},
  updateGoal: (id, { description, amount, date }) => {},
});

function GoalsReducer(state, action) {
  switch (action.type) {
    case "ADD":
      //console.log(action.payload);
      return [action.payload, ...state];

    case "SET":
      const inverted = action.payload.reverse();
      return inverted;

    case "COMPLETE":
      const completeableGoalIndex = state.findIndex(
        (goal) => goal.id === action.id
      );
      const completeableGoal = state[completeableGoalIndex];
      const completedItem = {
        ...completeableGoal,
        isCompleted: true,
      };
      try {
        // console.log(completedItem);
        updateGoal(action.id, completedItem);
      } catch (error) {
        // setError("Error submitting goal - try again");
        console.log(error);
      }

      const completedGoals = [...state];
      completedGoals[completeableGoalIndex] = completedItem;
      // console.log(completedIte);
      return completedGoals;

    case "DELETE":
      return state.filter((goal) => goal.id !== action.payload);
    case "UPDATE":
      const updateableGoalIndex = state.findIndex(
        (goal) => goal.id === action.payload.id
      );
      const updateableGoal = state[updateableGoalIndex];
      const updatedItem = {
        ...updateableGoal,
        ...action.payload.data,
      };
      const updatedGoals = [...state];
      updatedGoals[updateableGoalIndex] = updatedItem;
      return updatedGoals;
    default:
      return state;
  }
}

function GoalsContextProvider({ children }) {
  const [goalsState, dispatch] = useReducer(GoalsReducer, []);
  // const [IsCompleted, setIsCompleted] = useState(false);

  const [pendingGoals, setPendingGoals] = useState(null);
  const [completedGoals, setCompletedGoals] = useState(null);

  useEffect(() => {
    const tempGoals = goalsState.filter((goal) => {
      return !goal.isCompleted;
    });
    setPendingGoals(tempGoals);

    const tempCompleteGoals = goalsState.filter((goal) => {
      return goal.isCompleted;
    });
    setCompletedGoals(tempCompleteGoals);
  }, [goalsState]);

  function addGoal(goalData) {
    dispatch({
      type: "ADD",
      payload: goalData,
    });
  }

  function deleteGoal(id) {
    dispatch({
      type: "DELETE",
      payload: id,
    });
  }
  function setGoals(goals) {
    dispatch({
      type: "SET",
      payload: goals,
    });
  }
  function completeGoal(id) {
    // console.log(id);
    dispatch({
      type: "COMPLETE",
      id: id,
    });
  }

  function updateGoal(id, goalData) {
    dispatch({
      type: "UPDATE",
      payload: {
        id: id,
        data: goalData,
      },
    });
  }

  const value = {
    goals: goalsState,
    //goalIsCompleted: setIsCompleted,
    addGoal: addGoal,
    setGoals: setGoals,
    deleteGoal: deleteGoal,
    updateGoal: updateGoal,
    completeGoal: completeGoal,
    pendingGoals: pendingGoals,
    completedGoals: completedGoals,
  };

  return <GoalContext.Provider value={value}>{children}</GoalContext.Provider>;
}

export default GoalsContextProvider;
