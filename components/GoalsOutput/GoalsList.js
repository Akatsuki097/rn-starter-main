import { FlatList, Text } from "react-native";
import GoalItem from "./GoalItem";

function renderGoal(itemData) {
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
