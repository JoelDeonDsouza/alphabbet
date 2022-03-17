import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View, ScrollView } from "react-native";
import { colors } from "./src/constent";
import Keyboard from "./src/components/Keyboard";

const LIMITEDTRYS = 6;
const copyArray = (arr) => {
  return [...arr.map((rows) => [...rows])];
};

export default function App() {
  const word = "joel";
  const letters = word.split("");

  const [rows, setRows] = useState(
    new Array(LIMITEDTRYS).fill(new Array(letters.length).fill(""))
  );
  const [curRow, setCurRow] = useState(0);
  const [curCol, setCurCol] = useState(0);

  const onKeyPressed = (key) => {
    const reNewedRows = copyArray(rows);
    reNewedRows[curRow][curCol] = key;
    setCurRow(reNewedRows);
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.title}>AlphaBET</Text>
      <ScrollView style={styles.map}>
        {rows.map((row) => (
          <View style={styles.row}>
            {row.map((cell) => (
              <View style={styles.cell}>
                <Text style={styles.text}>{cell.toUpperCase()}</Text>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
      <Keyboard onKeyPressed={onKeyPressed} />
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
  map: {
    padding: 20,
    alignSelf: "stretch",
    height: 100,
  },
  row: {
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "center",
  },
  cell: {
    borderWidth: 3,
    borderColor: colors.lightGrey,
    flex: 1,
    maxWidth: 70,
    aspectRatio: 1,
    margin: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: colors.lightGrey,
    fontWeight: "bold",
    fontSize: 26,
  },
});
