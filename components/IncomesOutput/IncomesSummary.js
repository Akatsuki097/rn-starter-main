import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function IncomesSummary({ incomes, periodName }) {
  const incomesSum = incomes.reduce((sum, income) => {
    return sum + income.amount;
  }, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.period}> {periodName} </Text>
      <Text style={styles.sum}>{incomesSum.toFixed(2)} </Text>
    </View>
  );
}

export default IncomesSummary;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: "white",
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  period: {
    fontSize: 12,
    color: GlobalStyles.colors.primary400,
  },
  sum: {
    fontSize: 16,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary500,
  },
});
