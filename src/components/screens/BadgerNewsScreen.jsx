import { Text, View, ScrollView } from "react-native";
import { useEffect, useState, useContext } from "react";
import BadgerNewsItemCard from "./BadgerNewsItemCard";
import PreferencesContext from "../navigation/PreferencesContext";

function BadgerNewsScreen(props) {
  const [newsArticles, setNewsArticles] = useState([]);

  const [preferences, setPreferences] = useContext(PreferencesContext);

  useEffect(() => {
    fetch("https://cs571api.cs.wisc.edu/rest/f24/hw8/articles", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-CS571-ID":
          "bid_b5fb8b05a3872d97da95bcdf2efe216b70eee6facd3f6bb900581bdae9cf040b",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setNewsArticles((prev) => res);

        // set preferences
        res.forEach((article) => {
          article.tags.forEach((tag) => {
            if (!preferences[tag]) {
              setPreferences((prev) => {
                let newPrefs = { ...prev };
                newPrefs[tag] = true;
                return newPrefs;
              });
            }
          });
        });
      });
  }, []);

  let filteredArticles = newsArticles.map((article) => {
    for (let i = 0; i < article.tags.length; i++) {
      if (!preferences[article.tags[i]]) {
        return;
      }
    }
    return <BadgerNewsItemCard key={article.id} {...article} />;
  });

  return (
    <ScrollView>
      {filteredArticles && filteredArticles.some((article) => article) ? (
        filteredArticles
      ) : (
        <Text style={{ fontSize: 25, fontWeight: 200, textAlign: "center" }}>
          No articles to show! Visit [Preferences] to adjust your filter
          settings.
        </Text>
      )}
    </ScrollView>
  );
}

export default BadgerNewsScreen;
