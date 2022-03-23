import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import { colors } from "./src/constent";
import GameLogic from "./src/components/gameLogic";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.title}>AlphaBET</Text>
      <GameLogic />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    alignItems: "center",
  },
  title: {
    color: colors.lightGrey,
    fontSize: 32,
    fontWeight: "bold",
    letterSpacing: 5,
    marginTop: 50,
  },
});
