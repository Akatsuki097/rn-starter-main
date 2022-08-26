import { View, Text, FlatList, StyleSheet } from "react-native";
import GoalsList from "./GoalsList";
import GoalsSummary from "./GoalsSummary";
import { GlobalStyles } from "../../constants/styles";

function GoalsOutput({ goals, goalsPeriod, fallbackText, progress }) {
  let content = <Text style={styles.infoText}>{fallbackText}</Text>;

  if (goals.length > 0) {
    content = <GoalsList goals={goals} progress={progress} />;
  }

  return (
    <View style={styles.container}>
      {/* <GoalsSummary goals={goals} periodName={goalsPeriod} /> */}
      {content}
    </View>
  );
}

export default GoalsOutput;

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
