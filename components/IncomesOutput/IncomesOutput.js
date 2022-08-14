import { View, Text, FlatList, StyleSheet } from "react-native";
import IncomesList from "./IncomesList";
import IncomesSummary from "./IncomesSummary";
import { GlobalStyles } from "../../constants/styles";

function IncomesOutput({ incomes, incomesPeriod, fallbackText }) {
  let content = <Text style={styles.infoText}>{fallbackText}</Text>;

  if (incomes.length > 0) {
    content = <IncomesList incomes={incomes} />;
  }

  return (
    <View style={styles.container}>
      <IncomesSummary incomes={incomes} periodName={incomesPeriod} />
      {content}
    </View>
  );
}

export default IncomesOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: "skyblue",
  },
  infoText: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
    marginTop: 24,
  },
});
