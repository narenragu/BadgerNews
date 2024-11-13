import { useState, useEffect, useContext } from "react";
import { Text, View, Switch, ScrollView } from "react-native";
import PreferencesContext from "../navigation/PreferencesContext";
import Card from "./Card";

function BadgerPreferencesScreen(props) {
  const [newsArticles, setNewsArticles] = useState([]);
  const [preferences, setPreferences] = useContext(PreferencesContext);

  return (
    <ScrollView>
      {preferences
        ? Object.keys(preferences).map((tag) => (
            <Card key={tag}>
              <Text
                style={{ fontSize: 20, fontWeight: 300, textAlign: "center" }}
              >
                {`Currently${
                  preferences[tag] ? "" : " NOT"
                } showing ${tag.toUpperCase()} articles\n`}
              </Text>
              <Switch
                style={{ alignSelf: "center" }}
                value={preferences[tag] ?? true}
                onValueChange={() => {
                  setPreferences((prev) => {
                    let newPrefs = { ...prev };
                    newPrefs[tag] = !newPrefs[tag];
                    return newPrefs;
                  });
                }}
              />
            </Card>
          ))
        : ""}
    </ScrollView>
  );
}

export default BadgerPreferencesScreen;
