import { FlatList, Text } from "react-native";
import IncomeItem from "./IncomesItem";

function renderIncome(itemData) {
  return <IncomeItem {...itemData.item} />;
}

function IncomesList({ incomes }) {
  return (
    <FlatList
      data={incomes}
      renderItem={renderIncome}
      keyExtractor={(item) => item.id}
    />
  );
}

export default IncomesList;
