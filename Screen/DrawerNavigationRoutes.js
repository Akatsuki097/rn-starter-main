// Import React
import React from "react";

// Import Navigators from React Navigation

import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Import Screens
import HomeScreen from "./DrawerScreens/HomeScreen";
import SettingsScreen from "./DrawerScreens/SettingsScreen";
import CustomSidebarMenu from "./Components/CustomSidebarMenu";
import NavigationDrawerHeader from "./Components/NavigationDrawerHeader";
import GoalScreen from "./DrawerScreens/GoalScreen";
import ExpenseScreen from "./DrawerScreens/ExpenseScreen";
import IncomeScreen from "./DrawerScreens/IncomeScreen";
import IncomesContextProvider from "../store/incomes-context";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const HomeScreenStack = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: "Dashboard", //Set Header Title
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: "#5f9ea0", //Set Header color
          },
          headerTintColor: "#fff", //Set Header text color
          headerTitleStyle: {
            fontWeight: "bold", //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};

const GoalScreenStack = ({ navigation }) => {
  return (
    // <IncomesContextProvider>
    <Stack.Navigator initialRouteName="GoalScreen">
      <Stack.Screen
        name="GoalScreen"
        component={GoalScreen}
        options={{
          title: "Goal", //Set Header Title
          headerShown: false,
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: "#307ecc", //Set Header color
          },
          headerTintColor: "#fff", //Set Header text color
          headerTitleStyle: {
            fontWeight: "bold", //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
    // </IncomesContextProvider>
  );
};

const IncomeScreenStack = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="IncomeScreen">
      <Stack.Screen
        name="IncomeScreen"
        component={IncomeScreen}
        options={{
          title: "Income", //Set Header Title
          headerShown: false,
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: "#307ecc", //Set Header color
          },
          headerTintColor: "#fff", //Set Header text color
          headerTitleStyle: {
            fontWeight: "bold", //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};

const ExpenseScreenStack = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="ExpenseScreen">
      <Stack.Screen
        name="ExpenseScreen"
        component={ExpenseScreen}
        options={{
          title: "Expense", //Set Header Title
          headerShown: false,
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: "#307ecc", //Set Header color
          },
          headerTintColor: "#fff", //Set Header text color
          headerTitleStyle: {
            fontWeight: "bold", //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};

const SettingScreenStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName="SettingsScreen"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: "#307ecc", //Set Header color
        },
        headerTintColor: "#fff", //Set Header text color
        headerTitleStyle: {
          fontWeight: "bold", //Set Header text style
        },
      }}
    >
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          title: "Settings", //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};

const DrawerNavigatorRoutes = (props) => {
  return (
    <Drawer.Navigator
      drawerContentOptions={{
        activeTintColor: "#cee1f2",
        color: "#cee1f2",
        itemStyle: { marginVertical: 5, color: "white" },
        labelStyle: {
          color: "#d8d8d8",
        },
      }}
      screenOptions={{ headerShown: false }}
      drawerContent={CustomSidebarMenu}
    >
      <Drawer.Screen
        name="HomeScreenStack"
        options={{
          drawerLabel: "Dashboard",
          drawerActiveTintColor: "#fff",
          drawerInactiveTintColor: "#fff",
        }}
        component={HomeScreenStack}
      />
      <Drawer.Screen
        name="IncomeScreenStack"
        options={{
          drawerLabel: "Income ",
          drawerActiveTintColor: "#fff",
          drawerInactiveTintColor: "#fff",
        }}
        component={IncomeScreenStack}
      />

      <Drawer.Screen
        name="ExpenseScreenStack"
        options={{
          drawerLabel: "Expense ",
          drawerActiveTintColor: "#fff",
          drawerInactiveTintColor: "#fff",
        }}
        component={ExpenseScreenStack}
      />

      <Drawer.Screen
        name="GoalScreenStack"
        options={{
          drawerLabel: "Goal ",
          drawerActiveTintColor: "#fff",
          drawerInactiveTintColor: "#fff",
        }}
        component={GoalScreenStack}
      />

      <Drawer.Screen
        name="SettingScreenStack"
        options={{
          drawerLabel: "Setting ",
          drawerActiveTintColor: "#fff",
          drawerInactiveTintColor: "#fff",
        }}
        component={SettingScreenStack}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigatorRoutes;
