import { Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BadgerNewsStack from "../screens/BadgerNewsStack";
import BadgerPreferencesScreen from "../screens/BadgerPreferencesScreen";
import PreferencesContext from "./PreferencesContext";
import { useState } from "react";

function BadgerTabs(props) {
  const Tabs = createBottomTabNavigator();

  const [preferences, setPreferences] = useState({});

  return (
    <PreferencesContext.Provider value={[preferences, setPreferences]}>
      <Tabs.Navigator>
        <Tabs.Screen
          name="News"
          component={BadgerNewsStack}
          options={{ headerShown: false }}
        ></Tabs.Screen>
        <Tabs.Screen
          name="Preferences"
          component={BadgerPreferencesScreen}
        ></Tabs.Screen>
      </Tabs.Navigator>
    </PreferencesContext.Provider>
  );
}

export default BadgerTabs;
