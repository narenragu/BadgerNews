import { useEffect, useState, useRef } from "react";
import { View, Text, Image, Animated, Linking, Pressable } from "react-native";

function BadgerArticleScreen(props) {
  const [article, setArticle] = useState();

  const fadeRef = useRef(new Animated.Value(0));

  const animation = useEffect(() => {
    fetch(
      `https://cs571api.cs.wisc.edu/rest/f24/hw8/article?id=${props.route.params.fullArticleId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-CS571-ID":
            "bid_b5fb8b05a3872d97da95bcdf2efe216b70eee6facd3f6bb900581bdae9cf040b",
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setArticle(res);
        Animated.timing(fadeRef.current, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      });
  }, []);

  return (
    <View>
      {article ? (
        <Animated.ScrollView style={{ opacity: fadeRef.current }}>
          <Image
            source={{
              uri: `https://raw.githubusercontent.com/CS571-F24/hw8-api-static-content/main/${article.img}`,
            }}
            style={{ height: 200 }}
          />
          <View style={{ padding: 10 }}>
            <Text
              style={{
                marginTop: 10,
                marginBottom: 20,
                fontSize: 25,
                fontWeight: 500,
              }}
            >
              {article.title}
            </Text>
            <Text style={{ marginBottom: 5, fontSize: 17, fontWeight: 400 }}>
              {"Posted " + article.posted + " by " + article.author}
            </Text>
            <Pressable onPress={() => Linking.openURL(article.url)}>
              <Text
                style={{
                  marginBottom: 25,
                  fontSize: 17,
                  fontWeight: 400,
                  color: "dodgerblue",
                }}
              >
                {"Read full article here"}
              </Text>
            </Pressable>
            {article.body.map((paragraph) => (
              <Text key={paragraph} style={{ fontSize: 15, fontWeight: 300 }}>
                {paragraph + "\n"}
              </Text>
            ))}
          </View>
        </Animated.ScrollView>
      ) : (
        <Text
          style={{
            textAlign: "center",
            fontSize: 30,
            fontWeight: 200,
            marginVertical: 30,
          }}
        >
          Content loading...
        </Text>
      )}
    </View>
  );
}

export default BadgerArticleScreen;
