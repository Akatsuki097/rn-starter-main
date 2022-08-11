import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Ionicons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

import AllExpenses from "../AllExpenses";
import RecentExpenses from "../RecentExpenses";
import ManageExpense from "../ManageExpense";
import { GlobalStyles } from "../../constants/styles";
import IconButton from "../../components/UI/IconButton";
import ExpensesContextProvider from "../../store/expenses-context";

function ExpenseOverview() {
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
              navigation.navigate("ManageExpense");
            }}
          />
        ),
      })}
    >
      <Stack.Screen
        name="RecentExpenses"
        component={RecentExpenses}
        options={{
          title: "Recent Expenses",
          tabBarLabel: "Recent Expenses",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" color={color} size={size} />
          ),
        }}
      />

      <Stack.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{
          title: "All Expenses",
          tabBarLabel: "All Expenses",
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
      <ExpensesContextProvider>
        <NavigationContainer independent={true}>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: "#5f9ea0" },
              headerTintColor: "white",
            }}
          >
            <Stack.Screen
              name="ExpenseOverview"
              component={ExpenseOverview}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="ManageExpense"
              component={ManageExpense}
              options={{
                presentation: "modal",
                //headerShown: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}
