import { useContext, useLayoutEffect, useState } from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import Button from "../components/UI/Button";
import { GoalContext } from "../store/goals-context";
import GoalForm from "../components/ManageGoal/GoalForm";
import { StatusBar } from "expo-status-bar";
import { deleteGoal, storeGoal, updateGoal } from "../util/http_goal";
import Loader from "./Components/Loader";
import ErrorOverlay from "./Components/ErrorOverlay";

function ManageGoal({ route, navigation }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const goalsCtx = useContext(GoalContext);
  const editedGoalId = route.params?.goalId;

  const isEditing = !!editedGoalId;
  const selectedGoal = goalsCtx.goals.find((goal) => goal.id == editedGoalId);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Goal" : "Add Goal",
    });
  }, [navigation, isEditing]);

  async function deleteGoalHandler() {
    setIsSubmitting(true);

    try {
      await deleteGoal(editedGoalId);
      goalsCtx.deleteGoal(editedGoalId);
      navigation.goBack();
    } catch (error) {
      setError("Error deleting goal - try again");
    }
    setIsSubmitting(false);
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(goalData) {
    setIsSubmitting(true);

    try {
      if (isEditing) {
        await updateGoal(editedGoalId, goalData);
        goalsCtx.updateGoal(editedGoalId, goalData);
        //console.log("submit done1");
      } else {
        const id = await storeGoal(goalData);
        goalsCtx.addGoal({ ...goalData, id: id });
      }
      navigation.goBack();
    } catch (error) {
      setError("Error submitting goal - try again");
      setIsSubmitting(false);
    }
    goalsCtx.progress = 0.5;
  }

  if (isSubmitting) {
    return <Loader loading={isSubmitting} />;
    console.log("submit done");
  }

  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} />;
  }

  // console.log("submit done" + isSubmitting);

  return (
    <>
      <View style={styles.container}>
        <GoalForm
          submitButtonLabel={isEditing ? "Update" : "Add"}
          onSubmit={confirmHandler}
          onCancel={cancelHandler}
          defaultValues={selectedGoal}
        />

        {isEditing && (
          <View style={styles.deleteContainer}>
            <IconButton
              icon="trash"
              color={GlobalStyles.colors.error500}
              size={36}
              onPress={deleteGoalHandler}
            />
          </View>
        )}
      </View>
    </>
  );
}

export default ManageGoal;

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
