import { useState } from "react";
import {
  Text,
  TextInput,
  Button,
  View,
  StyleSheet,
  Modal,
  Image,
} from "react-native";

function AddgoalItem(props) {
  const [goal, setgoal] = useState("");

  function InputTextHandler(enteredText) {
    setgoal(enteredText);
  }

  function AddGoalHandler() {
    props.onAddGoal(goal);
    setgoal("");
  }

  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.inputcontainer}>
        <Image style={styles.image} source={require("../../assets/goal.png")} />
        <TextInput
          style={styles.box}
          placeholder="Your Course Goal"
          onChangeText={InputTextHandler}
          value={goal}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button
              color={"#5f9ea0"}
              title="Add Goal"
              onPress={AddGoalHandler}
            />
          </View>
          <View style={styles.button}>
            <Button color={"#5f9ea0"} title="Cancel" onPress={props.onCancel} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

styles = StyleSheet.create({
  inputcontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    padding: 16,
  },

  box: {
    // flex:2,
    borderWidth: 1,
    borderColor: "#cccccc",
    width: "100%",
    padding: 8,
  },

  buttonContainer: {
    flexDirection: "row",
    marginTop: 8,
  },
  button: {
    width: 100,
    marginHorizontal: 8,
  },
  image: {
    width: 100,
    height: 100,
    margin: 20,
  },
});
export default AddgoalItem;
