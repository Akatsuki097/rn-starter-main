import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  FlatList,
} from "react-native";

import { StatusBar } from "expo-status-bar";

import GoalItem from "../Components/GoalItem";
import InputGoalItem from "../Components/InputGoalItem";
export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [goalList, setgoalList] = useState([]);

  function startAddGoalHandler() {
    setModalIsVisible(true);
  }

  function ButtonHandler(goal) {
    setgoalList([...goalList, { text: goal, key: Math.random().toString() }]);
    endAddGoalHandler();
    //console.log(goal);
  }

  function DeleteGoalHandler(key) {
    setgoalList(goalList.filter((item) => item.key !== key));
    //console.log(key);
  }

  function endAddGoalHandler() {
    setModalIsVisible(false);
  }

  return (
    <>
      <StatusBar />
      <View style={styles.container}>
        <Button
          title="Add New Goal"
          color="green"
          onPress={startAddGoalHandler}
        />
        <InputGoalItem
          visible={modalIsVisible}
          onAddGoal={ButtonHandler}
          onCancel={endAddGoalHandler}
        />
        <View style={styles.list}>
          <FlatList
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => item.key}
            data={goalList}
            renderItem={(goal) => {
              //console.log(goal.item.text);
              return (
                <GoalItem
                  text={goal.item.text}
                  id={goal.item.key}
                  onDeleteItem={DeleteGoalHandler}
                />
              );
            }}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 50,
  },

  list: {
    flex: 5,
  },
});