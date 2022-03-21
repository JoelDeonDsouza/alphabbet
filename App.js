import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View, ScrollView } from "react-native";
import { colors, CLEAR, ENTER } from "./src/constent";
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
    //Clear cell
    const reNewedRows = copyArray(rows);
    if (key === CLEAR) {
      const beforeCol = curCol - 1;
      if (beforeCol >= 0) {
        reNewedRows[curRow][beforeCol] = "";
        setRows(reNewedRows);
        setCurCol(beforeCol);
      }
      return;
    }
    //Center to new Colum
    if (key === ENTER) {
      if (curCol === rows[0].length) {
        setCurRow(curRow + 1);
        setCurCol(0);
      }
      return;
    }

    //Add to the cell
    if (curCol < rows[0].length) {
      reNewedRows[curRow][curCol] = key;
      setRows(reNewedRows);
      setCurCol(curCol + 1);
    }
  };

  const isCellActive = (row, col) => {
    return row === curRow && col === curCol;
  };
  const getCellColor = (letter, row, col) => {
    if (row >= curRow) {
      return colors.black;
    } else if (letter === letters[col]) {
      return colors.primary;
    } else if (letters.includes(letter)) {
      return colors.secondary;
    } else {
      return colors.darkGrey;
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.title}>AlphaBET</Text>
      <ScrollView style={styles.map}>
        {rows.map((row, r) => (
          <View key={`row-${r}`} style={styles.row}>
            {row.map((letter, j) => (
              <View
                key={`cell-${r}-${j}`}
                style={[
                  styles.cell,
                  {
                    borderColor: isCellActive(r, j)
                      ? colors.darkGrey
                      : colors.lightGrey,
                    backgroundColor: getCellColor(letter, r, j),
                  },
                ]}
              >
                <Text style={styles.text}>{letter.toUpperCase()}</Text>
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
