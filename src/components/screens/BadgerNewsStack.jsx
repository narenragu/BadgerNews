import { Text, View, ScrollView } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BadgerNewsScreen from "../screens/BadgerNewsScreen";
import BadgerArticleScreen from "../screens/BadgerArticleScreen";

function BadgerNewsStack(props) {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Articles" component={BadgerNewsScreen} />
      <Stack.Screen name="Article" component={BadgerArticleScreen} />
    </Stack.Navigator>
  );
}

export default BadgerNewsStack;
