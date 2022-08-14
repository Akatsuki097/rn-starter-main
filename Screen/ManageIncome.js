import { useContext, useLayoutEffect, useState } from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import Button from "../components/UI/Button";
import { IncomeContext } from "../store/incomes-context";
import IncomeForm from "../components/ManageIncome/IncomeForm";
import { StatusBar } from "expo-status-bar";
import { deleteIncome, storeIncome, updateIncome } from "../util/http_income";
import Loader from "./Components/Loader";
import ErrorOverlay from "./Components/ErrorOverlay";

function ManageIncome({ route, navigation }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const incomesCtx = useContext(IncomeContext);
  const editedIncomeId = route.params?.incomeId;

  const isEditing = !!editedIncomeId;
  const selectedIncome = incomesCtx.incomes.find(
    (income) => income.id == editedIncomeId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Income" : "Add Income",
    });
  }, [navigation, isEditing]);

  async function deleteIncomeHandler() {
    setIsSubmitting(true);

    try {
      await deleteIncome(editedIncomeId);
      incomesCtx.deleteIncome(editedIncomeId);
      navigation.goBack();
    } catch (error) {
      setError("Error deleting income - try again");
    }
    setIsSubmitting(false);
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(incomeData) {
    setIsSubmitting(true);

    try {
      if (isEditing) {
        incomesCtx.updateIncome(editedIncomeId, incomeData);
        await updateIncome(editedIncomeId, incomeData);
      } else {
        const id = await storeIncome(incomeData);
        incomesCtx.addIncome({ ...incomeData, id: id });
      }
      navigation.goBack();
    } catch (error) {
      setError("Error submitting income - try again");
      setIsSubmitting(false);
    }
  }

  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} />;
  }

  if (isSubmitting) {
    return <Loader loading={isSubmitting} />;
  }

  return (
    <>
      <View style={styles.container}>
        <IncomeForm
          submitButtonLabel={isEditing ? "Update" : "Add"}
          onSubmit={confirmHandler}
          onCancel={cancelHandler}
          defaultValues={selectedIncome}
        />

        {isEditing && (
          <View style={styles.deleteContainer}>
            <IconButton
              icon="trash"
              color={GlobalStyles.colors.error500}
              size={36}
              onPress={deleteIncomeHandler}
            />
          </View>
        )}
      </View>
    </>
  );
}

export default ManageIncome;

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
