import { FlatList, Text } from "react-native";
import IncomesContextProvider from "../../store/incomes-context";
import GoalItem from "./GoalItem";

function renderGoal(itemData, progress) {
  return <GoalItem {...itemData.item} />;
}

function GoalsList({ goals }) {
  return (
    <FlatList
      data={goals}
      renderItem={renderGoal}
      keyExtractor={(item) => item.id}
    />
  );
}

export default GoalsList;
