import { FlatList, Text } from "react-native";
import ExpenseItem from "./ExpenseItem";

function renderExpense(itemData) {
  return <ExpenseItem {...itemData.item} />;
}

function ExpensesList({ expenses }) {
  return (
    <FlatList
      data={expenses}
      renderItem={renderExpense}
      keyExtractor={(item) => item.id}
    />
  );
}

export default ExpensesList;
