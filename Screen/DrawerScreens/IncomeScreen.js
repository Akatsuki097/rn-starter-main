import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Ionicons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

import AllIncomes from "../AllIncomes";
import RecentIncomes from "../RecentIncomes";
import ManageIncome from "../ManageIncome";
import { GlobalStyles } from "../../constants/styles";
import IconButton from "../../components/UI/IconButton";
import IncomesContextProvider from "../../store/incomes-context";

function IncomeOverview() {
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
              navigation.navigate("ManageIncome");
            }}
          />
        ),
      })}
    >
      <Stack.Screen
        name="RecentIncomes"
        component={RecentIncomes}
        options={{
          title: "Recent Incomes",
          tabBarLabel: "Recent Incomes",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" color={color} size={size} />
          ),
        }}
      />

      <Stack.Screen
        name="AllIncomes"
        component={AllIncomes}
        options={{
          title: "All Incomes",
          tabBarLabel: "All Incomes",
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
      {/* <IncomesContextProvider> */}
      <NavigationContainer independent={true}>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: "#5f9ea0" },
            headerTintColor: "white",
          }}
        >
          <Stack.Screen
            name="IncomeOverview"
            component={IncomeOverview}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="ManageIncome"
            component={ManageIncome}
            options={{
              presentation: "modal",
              //headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      {/* </IncomesContextProvider> */}
    </>
  );
}
