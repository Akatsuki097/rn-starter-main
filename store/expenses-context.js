import { createContext, useReducer } from "react";

const DUMMY_EXpENSES = [
  {
    id: "e1",
    description: "Rent",
    amount: 950.44,
    date: new Date("2020-01-01"),
  },

  {
    id: "e2",
    description: "Pair of trousers",
    amount: 50.44,
    date: new Date("2021-12-01"),
  },
  {
    id: "e3",
    description: "Laptop",
    amount: 50000.44,
    date: new Date("2022-10-11"),
  },
  {
    id: "e4",
    description: "book",
    amount: 6.44,
    date: new Date("2022-12-01"),
  },
  {
    id: "e5",
    description: "Another",
    amount: 5.44,
    date: new Date("2021-12-01"),
  },
  {
    id: "e6",
    description: "Rent",
    amount: 950.44,
    date: new Date("2020-01-01"),
  },

  {
    id: "e7",
    description: "Pair of trousers",
    amount: 50.44,
    date: new Date("2021-12-01"),
  },
  {
    id: "e8",
    description: "Laptop",
    amount: 50000.44,
    date: new Date("2022-10-11"),
  },
  {
    id: "e9",
    description: "book",
    amount: 6.44,
    date: new Date("2022-12-01"),
  },
  {
    id: "e10",
    description: "Another",
    amount: 5.44,
    date: new Date("2021-12-01"),
  },
];

export const ExpenseContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

function ExpensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      //console.log(action.payload);
      return [{ ...action.payload, id: id }, ...state];

    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    case "UPDATE":
      const updateableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updateableExpense = state[updateableExpenseIndex];
      const updatedItem = {
        ...updateableExpense,
        ...action.payload.expenseData,
      };
      const updatedExpenses = [...state];
      updatedExpenses[updateableExpenseIndex] = updatedItem;
      return updatedExpenses;
    default:
      return state;
  }
}

function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(ExpensesReducer, DUMMY_EXpENSES);

  function addExpense(expenseData) {
    dispatch({
      type: "ADD",
      payload: expenseData,
    });
  }

  function deleteExpense(id) {
    dispatch({
      type: "DELETE",
      payload: id,
    });
  }

  function updateExpense(id, expenseData) {
    dispatch({
      type: "UPDATE",
      payload: {
        id,
        expenseData,
      },
    });
  }

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };

  return (
    <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
  );
}

export default ExpensesContextProvider;
