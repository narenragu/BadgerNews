import { Pressable, StyleSheet, View, Image, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Card from "./Card";

export default function BadgerNewsItemCard(props) {
  const navigation = useNavigation();

  const openArticle = () => {
    navigation.push("Article", { fullArticleId: props.fullArticleId });
  };

  return (
    <View>
      <Card onPress={openArticle}>
        <Image
          source={{
            uri: `https://raw.githubusercontent.com/CS571-F24/hw8-api-static-content/main/${props.img}`,
          }}
          style={{ height: 200 }}
        />
        <Text style={{ fontSize: 20, fontWeight: 300, marginTop: 10 }}>
          {props.title}
        </Text>
      </Card>
    </View>
  );
}
