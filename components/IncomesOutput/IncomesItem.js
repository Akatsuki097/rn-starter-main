import { Pressable } from "react-native";
import { View, Text, StyleSheet } from "react-native";

import { GlobalStyles } from "../../constants/styles";
import { getFomattedDate } from "../../util/date";
import { useNavigation } from "@react-navigation/native";

function IncomeItem({ id, description, amount, date }) {
  const navigation = useNavigation();
  function incomepressHandler() {
    navigation.navigate("ManageIncome", {
      incomeId: id,
    });
  }

  return (
    <Pressable
      onPress={incomepressHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.incomeItem}>
        <View>
          <Text style={[styles.textBase, styles.description]}>
            {description}
          </Text>
          <Text style={styles.textBase}>{getFomattedDate(date)}</Text>
        </View>
        <View style={styles.amountcontainer}>
          <Text style={styles.amount}>{amount.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
}
export default IncomeItem;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  incomeItem: {
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
