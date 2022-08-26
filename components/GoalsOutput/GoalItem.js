import { Pressable } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import { useContext, useEffect, useState } from "react";

import { GlobalStyles } from "../../constants/styles";
import { getFomattedDate } from "../../util/date";
import { useNavigation } from "@react-navigation/native";
import ProgressBar from "react-native-progress/Bar";
import IncomesContextProvider, {
  IncomeContext,
} from "../../store/incomes-context";

function GoalItem({ id, description, amount, date, progress }) {
  const navigation = useNavigation();
  function goalpressHandler() {
    navigation.navigate("ManageGoal", {
      goalId: id,
    });
  }

  const incomesCtx = useContext(IncomeContext);

  // console.log(incomesCtx.incomes.entries.length);
  const incomesSum = incomesCtx.incomes.reduce((sum, income) => {
    return sum + income.amount;
  }, 0);
  console.log(amount / incomesSum);
  console.log(incomesSum);

  return (
    <Pressable
      onPress={goalpressHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.goalItem}>
        <View>
          <Text style={[styles.textBase, styles.description]}>
            {description}
          </Text>
          <Text style={styles.textBase}>
            {Math.floor((date - new Date()) / (1000 * 60 * 60 * 24))} days left
          </Text>
          <ProgressBar progress={amount / incomesSum} width={200}>
            {<Text>Progress {(amount / incomesSum).toFixed(5) * 100}% </Text>}
          </ProgressBar>
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
});
