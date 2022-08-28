// Import React and Component
import React, { useEffect, useContext, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ExpenseContext } from "../../store/expenses-context";
import { IncomeContext } from "../../store/incomes-context";
import { GoalContext } from "../../store/goals-context";
import { GlobalStyles } from "../../constants/styles";
import Loader from "../Components/Loader";
import ErrorOverlay from "../Components/ErrorOverlay";
import { fetchExpenses } from "../../util/http";
import { fetchIncomes } from "../../util/http_income";
import { fetchGoals } from "../../util/http_goal";

const HomeScreen = () => {
  const [currMonthExpenses, setCurrMonthExpenses] = useState(0);
  const [currYearExpenses, setCurrYearExpenses] = useState(0);
  const [currMonthIncomes, setCurrMonthIncomes] = useState(0);
  const [currYearIncomes, setCurrYearIncomes] = useState(0);
  // let totalGoals = 0;
  // let totalCompletedGoals = 0;
  const [totalGoals, settotalGoals] = useState(0);
  const [totalCompletedGoals, settotalCompletedGoals] = useState(0);

  const expenseCtx = useContext(ExpenseContext);
  const incomeCtx = useContext(IncomeContext);
  const goalCtx = useContext(GoalContext);

  //fetch expenses and incomes from the server
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true);
      try {
        const expenses = await fetchExpenses();
        expenseCtx.setExpenses(expenses);
        const incomes = await fetchIncomes();
        incomeCtx.setIncomes(incomes);
        const goals = await fetchGoals();
        goalCtx.setGoals(goals);
      } catch (error) {
        setError("Error fetching expenses");
      }

      setIsFetching(false);
      //console.log(expenses);
    }
    getExpenses();
  }, []);

  useEffect(() => {
    const allMonthlyExpenses = expenseCtx.expenses.filter((expense) => {
      const expenseDate = new Date(expense.date);
      const expenseMonth = expenseDate.getMonth();
      const currDate = new Date();
      const currMonth = currDate.getMonth();
      return expenseMonth === currMonth;
    });
    const expenseSum = allMonthlyExpenses.reduce((sum, expense) => {
      return sum + expense.amount;
    }, 0);
    setCurrMonthExpenses(expenseSum);

    const allYearlyExpenses = expenseCtx.expenses.filter((expense) => {
      const expenseDate = new Date(expense.date);
      const expenseYear = expenseDate.getFullYear();
      const currDate = new Date();
      const currYear = currDate.getFullYear();
      return expenseYear === currYear;
    });
    const expenseSum2 = allYearlyExpenses.reduce((sum, expense) => {
      return sum + expense.amount;
    }, 0);
    setCurrYearExpenses(expenseSum2);

    const allMonthlyIncomes = incomeCtx.incomes.filter((income) => {
      const incomeDate = new Date(income.date);
      const incomeMonth = incomeDate.getMonth();
      const currDate = new Date();
      const currMonth = currDate.getMonth();
      return incomeMonth === currMonth;
    });

    const incomeSum = allMonthlyIncomes.reduce((sum, income) => {
      return sum + income.amount;
    }, 0);
    setCurrMonthIncomes(incomeSum);

    const allYearlyIncomes = incomeCtx.incomes.filter((income) => {
      const incomeDate = new Date(income.date);
      const incomeYear = incomeDate.getFullYear();
      const currDate = new Date();
      const currYear = currDate.getFullYear();
      return incomeYear === currYear;
    });
    const incomeSum2 = allYearlyIncomes.reduce((sum, income) => {
      return sum + income.amount;
    }, 0);
    setCurrYearIncomes(incomeSum2);
    let totalGoalValue = 0;
    let totalCompletedGoalValue = 0;
    goalCtx.goals.forEach((goal) => {
      if (goal.isCompleted) {
        totalCompletedGoalValue += 1;
      }
      totalGoalValue += 1;
    });
    settotalCompletedGoals(totalCompletedGoalValue);
    settotalGoals(totalGoalValue);
  }, [expenseCtx.expenses, incomeCtx.incomes, goalCtx.goals]);

  if (error && !isFetching) {
    return <ErrorOverlay message={error} />;
  }

  if (isFetching) {
    return <Loader loading={isFetching} />;
  }
  // , incomeCtx.incomes, goalCtx.goals

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Income </Text>
      <View style={styles.boxes}>
        <View style={styles.box}>
          <Text style={{ color: "blue" }}>{currMonthIncomes}</Text>
          <Text style={{ fontWeight: "bold", color: "brown" }}>
            Monthly Incomes{" "}
          </Text>
        </View>
        <View style={styles.box}>
          <Text style={{ color: "blue" }}>{currYearIncomes}</Text>
          <Text style={{ fontWeight: "bold", color: "brown" }}>
            Yearly Incomes{" "}
          </Text>
        </View>
      </View>

      <Text style={styles.title}>Expense </Text>
      <View style={styles.boxes}>
        <View style={styles.box}>
          <Text style={{ color: "blue" }}>{currMonthExpenses}</Text>
          <Text style={{ fontWeight: "bold", color: "brown" }}>
            Monthly Expenses{" "}
          </Text>
        </View>
        <View style={styles.box}>
          <Text style={{ color: "blue" }}>{currYearExpenses}</Text>
          <Text style={{ fontWeight: "bold", color: "brown" }}>
            Yearly Expenses{" "}
          </Text>
        </View>
      </View>

      <Text style={styles.title}>Goal </Text>
      <View style={styles.boxes2}>
        <View style={styles.box}>
          <Text style={{ color: "blue" }}>{totalGoals}</Text>
          <Text style={{ fontWeight: "bold", color: "brown" }}>
            Total Goals{" "}
          </Text>
        </View>
        <View style={styles.box}>
          <Text style={{ color: "blue" }}>{totalCompletedGoals}</Text>
          <Text style={{ fontWeight: "bold", color: "brown" }}>
            Completed Goals{" "}
          </Text>
        </View>
        <View style={styles.box}>
          <Text style={{ color: "blue" }}>
            {totalGoals - totalCompletedGoals}
          </Text>
          <Text style={{ fontWeight: "bold", color: "brown" }}>
            Pending Goals{" "}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: "skyblue",
  },
  box: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary50,
    flexDirection: "column",
    justifyContent: "space-evenly",
    borderRadius: 6,
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray500,
    shadowRadius: 4,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.4,
  },
  boxes: {
    // padding: 5,
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingRight: 80,
  },
  boxes2: {
    // padding: 5,
    flexDirection: "row",
    justifyContent: "space-evenly",
    // paddingRight: 80,
  },
  title: {
    fontSize: 24,
    color: "black",
    fontWeight: "bold",
    paddingLeft: 10,
    marginTop: 10,
    // marginVertical: 24,
    // textAlign: ce,
  },
});

{
  /* <View style={{ flex: 1, padding: 16 }}>
  <View
    style={{
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Text
      style={{
        fontSize: 20,
        textAlign: "center",
        marginBottom: 16,
      }}
    >
      Fintech
      {"\n\n"}
      This is the Home Screen
    </Text>
  </View>
</View>; */
}
