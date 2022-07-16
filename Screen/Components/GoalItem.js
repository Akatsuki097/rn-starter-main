import { Text, StyleSheet, Pressable, View } from "react-native";

function GoalItem(props) {
  function DeleteGoalHandler() {
    props.onDeleteItem(props.id);
    //console.log(props.text);
  }

  return (
    <View style={styles.goalItem}>
      <Pressable
        android_ripple={{ color: "#ddddd" }}
        onPress={DeleteGoalHandler}
      >
        <Text style={styles.goaltext}>{props.text}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  goalItem: {
    margin: 8,
    borderRadius: 6,
    backgroundColor: "#5f9ea0",
    color: "white",
  },
  goaltext: {
    color: "white",
    padding: 8,
  },
});
export default GoalItem;
