import { StatusBar, View, StyleSheet, Text } from "react-native";

export default function HomeScreen() {
  return (
    <View style={style.container}>
      <Text>Home Screen</Text>
      <StatusBar barStyle="default" />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});