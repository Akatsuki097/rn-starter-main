import { Pressable } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import { useContext, useEffect, useState } from "react";

import { GlobalStyles } from "../../constants/styles";
import { getFomattedDate } from "../../util/date";
import { useNavigation } from "@react-navigation/native";
import ProgressBar from "react-native-progress/Bar";
import Button from "../UI/Button";
import { IncomeContext } from "../../store/incomes-context";
import { GoalContext } from "../../store/goals-context";
import { ExpenseContext } from "../../store/expenses-context";
import { getFormatedDate } from "react-native-modern-datepicker";
import { storeExpense } from "../../util/http";

function GoalItem({ id, description, amount, date, isCompleted }) {
  const navigation = useNavigation();
  function goalpressHandler() {
    navigation.navigate("ManageGoal", {
      goalId: id,
    });
  }

  const incomesCtx = useContext(IncomeContext);
  const goalsCtx = useContext(GoalContext);
  const expenseCtx = useContext(ExpenseContext);
  const today = new Date();
  const [completeStatus, setCompleteStatus] = useState(false);

  // console.log(incomesCtx.incomes.entries.length);
  const incomesSum = incomesCtx.incomes.reduce((sum, income) => {
    return sum + income.amount;
  }, 0);
  const expensesSum = expenseCtx.expenses.reduce((sum, expense) => {
    return sum + expense.amount;
  }, 0);
  let progress = (incomesSum - expensesSum) / amount;

  if (progress < 0) {
    progress = 0;
  }

  async function goalCompleteHandler() {
    // expenseCtx.addExpense(description, amount, getFormatedDate(today));
    const expenseData = {
      amount: amount,
      date: today,
      description: description,
    };
    // expenseCtx.addExpense(expenseData);
    // console.log(expenseData);
    const id2 = storeExpense(expenseData);

    expenseCtx.addExpense({ ...expenseData, id: id2 });
    // console.log(id + "gaol itameee");
    goalsCtx.completeGoal(id);
  }

  function goalshowHandler() {}

  // date.setDate(date.getDate() + 1);

  return (
    <Pressable
      onPress={isCompleted ? goalshowHandler : goalpressHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.goalItem}>
        <View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={[styles.textBase, styles.description]}>
              {description}
            </Text>
            {progress >= 1 && !isCompleted && (
              <Button
                style={styles.button}
                mode="flat"
                onPress={goalCompleteHandler}
              >
                Complete Your Goal
              </Button>
            )}
          </View>

          {!isCompleted && (
            <Text style={styles.textBase}>
              {Math.floor((date - new Date()) / (1000 * 60 * 60 * 24))} days
              left
            </Text>
          )}

          {!isCompleted && (
            <ProgressBar progress={progress} width={200}>
              {progress < 1 && (
                <Text>Progress {(progress * 100).toFixed(3)}% </Text>
              )}
              {progress >= 1 && <Text>Progress 100% </Text>}
            </ProgressBar>
          )}

          {isCompleted && (
            <Text style={styles.textBase}>
              Completed on {getFomattedDate(today)}
            </Text>
          )}
        </View>
        <View style={styles.amountcontainer}>
          <Text style={styles.amount}>{amount.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
}
export default GoalItem;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  goalItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary50,
    flexDirection: "row",
    justifyContent: "space-between",
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

  textBase: {
    color: GlobalStyles.colors.primary400,
  },
  description: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  amountcontainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    minWidth: 80,
  },
  amount: {
    color: GlobalStyles.colors.primary500,
    fontWeight: "bold",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
    backgroundColor: "white",
  },
});
