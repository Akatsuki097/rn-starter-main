import { createContext, useReducer } from "react";

export const GoalContext = createContext({
  goals: [],
  addGoal: ({ description, amount, date }) => {},
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
    addGoal: addGoal,
    setGoals: setGoals,
    deleteGoal: deleteGoal,
    updateGoal: updateGoal,
  };

  return <GoalContext.Provider value={value}>{children}</GoalContext.Provider>;
}

export default GoalsContextProvider;
