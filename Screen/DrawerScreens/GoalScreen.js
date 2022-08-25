import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Ionicons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

import AllGoals from "../AllGoals";
import PendingGoals from "../PendingGoals";
import ManageGoal from "../ManageGoal";
import { GlobalStyles } from "../../constants/styles";
import IconButton from "../../components/UI/IconButton";
import GoalsContextProvider from "../../store/goals-context";

function GoalOverview() {
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: "#5f9ea0" },
        headerTintColor: "white",
        headerTitleStyle: { fontWeight: "bold" },
        tabBarStyle: { backgroundColor: "#5f9ea0" },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        tabBarInactiveTintColor: "white",
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="add"
            size={24}
            color={tintColor}
            onPress={() => {
              navigation.navigate("ManageGoal");
            }}
          />
        ),
      })}
    >
      <Stack.Screen
        name="PendingGoals"
        component={PendingGoals}
        options={{
          title: "Pending Goals",
          tabBarLabel: "Pending Goals",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" color={color} size={size} />
          ),
        }}
      />

      <Stack.Screen
        name="AllGoals"
        component={AllGoals}
        options={{
          title: "All Goals",
          tabBarLabel: "All Goals",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" color={color} size={size} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <GoalsContextProvider>
        <NavigationContainer independent={true}>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: "#5f9ea0" },
              headerTintColor: "white",
            }}
          >
            <Stack.Screen
              name="GoalOverview"
              component={GoalOverview}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="ManageGoal"
              component={ManageGoal}
              options={{
                presentation: "modal",
                //headerShown: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </GoalsContextProvider>
    </>
  );
}
