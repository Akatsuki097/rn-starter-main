import { useContext, useLayoutEffect } from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import Button from "../components/UI/Button";
import { ExpenseContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { StatusBar } from "expo-status-bar";

function ManageExpense({ route, navigation }) {
  const expensesCtx = useContext(ExpenseContext);
  const editedExpenseId = route.params?.expenseId;

  const isEditing = !!editedExpenseId;
  const selectedExpense = expensesCtx.expenses.find(
    (expense) => expense.id == editedExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  function deleteExpenseHandler() {
    expensesCtx.deleteExpense(editedExpenseId);
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  function confirmHandler(expenseData) {
    if (isEditing) {
      expensesCtx.updateExpense(editedExpenseId, expenseData);
    } else {
      expensesCtx.addExpense(expenseData);
    }
    navigation.goBack();
  }

  return (
    <>
      <View style={styles.container}>
        <ExpenseForm
          submitButtonLabel={isEditing ? "Update" : "Add"}
          onSubmit={confirmHandler}
          onCancel={cancelHandler}
          defaultValues={selectedExpense}
        />

        {isEditing && (
          <View style={styles.deleteContainer}>
            <IconButton
              icon="trash"
              color={GlobalStyles.colors.error500}
              size={36}
              onPress={deleteExpenseHandler}
            />
          </View>
        )}
      </View>
    </>
  );
}

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "skyblue",
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: "grey",
    alignItems: "center",
  },
});