import { createContext, useReducer } from "react";

export const IncomeContext = createContext({
  incomes: [],
  addIncome: ({ description, amount, date }) => {},
  deleteIncome: (id) => {},
  updateIncome: (id, { description, amount, date }) => {},
});

function IncomesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      //console.log(action.payload);
      return [action.payload, ...state];

    case "SET":
      const inverted = action.payload.reverse();
      return inverted;

    case "DELETE":
      return state.filter((income) => income.id !== action.payload);
    case "UPDATE":
      const updateableIncomeIndex = state.findIndex(
        (Income) => Income.id === action.payload.id
      );
      const updateableIncome = state[updateableIncomeIndex];
      const updatedItem = {
        ...updateableIncome,
        ...action.payload.IncomeData,
      };
      const updatedIncomes = [...state];
      updatedIncomes[updateableIncomeIndex] = updatedItem;
      return updatedIncomes;
    default:
      return state;
  }
}

function IncomesContextProvider({ children }) {
  const [IncomesState, dispatch] = useReducer(IncomesReducer, []);

  function addIncome(incomeData) {
    dispatch({
      type: "ADD",
      payload: incomeData,
    });
  }

  function deleteIncome(id) {
    dispatch({
      type: "DELETE",
      payload: id,
    });
  }
  function setIncomes(incomes) {
    dispatch({
      type: "SET",
      payload: incomes,
    });
  }

  function updateIncome(id, incomeData) {
    dispatch({
      type: "UPDATE",
      payload: {
        id: id,
        data: incomeData,
      },
    });
  }

  const value = {
    incomes: IncomesState,
    addIncome: addIncome,
    setIncomes: setIncomes,
    deleteIncome: deleteIncome,
    updateIncome: updateIncome,
  };

  return (
    <IncomeContext.Provider value={value}>{children}</IncomeContext.Provider>
  );
}

export default IncomesContextProvider;
