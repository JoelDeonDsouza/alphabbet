import { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Alert } from "react-native";
import { colors, CLEAR, ENTER } from "../../constent";
import Keyboard from "../Keyboard";

const LIMITEDTRYS = 6;
const copyArray = (arr) => {
  return [...arr.map((rows) => [...rows])];
};

const GameLogic = () => {
  const word = "joel";
  const letters = word.split("");

  const [rows, setRows] = useState(
    new Array(LIMITEDTRYS).fill(new Array(letters.length).fill(""))
  );
  const [curRow, setCurRow] = useState(0);
  const [curCol, setCurCol] = useState(0);
  const [letGameState, setLetGameState] = useState("playing");

  useEffect(() => {
    if (curRow > 0) {
      gameState();
    }
  }, [curRow]);

  const gameState = () => {
    if (ifWon()) {
      Alert.alert("You won!"); //[{ text: "Share", onPress: shareGame }]
      setLetGameState("won");
    } else if (ifLost()) {
      Alert.alert("You Lost!");
      setLetGameState("lost");
    }
  };

  // const shareGame = () => {
  //   const textShare = rows.map((row, r) =>
  //     row.map((cell, j) => getCellColor(r, j))
  //   );
  //   console.log(textShare);
  // };

  const ifWon = () => {
    const row = rows[curRow - 1];
    return row.every((letter, r) => letter === letters[r]);
  };
  const ifLost = () => {
    return curRow === rows.length;
  };

  const onKeyPressed = (key) => {
    if (letGameState !== "playing") {
      return;
    }
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
  const getCellColor = (row, col) => {
    const letter = rows[row][col];
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

  const getAllLettersColor = (color) => {
    return rows.flatMap((row, r) =>
      row.filter((cell, j) => getCellColor(r, j) === color)
    );
  };

  const greenKeys = getAllLettersColor(colors.primary);
  const yellowKeys = getAllLettersColor(colors.secondary);
  const greyKeys = getAllLettersColor(colors.darkGrey);

  return (
    <>
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
                    backgroundColor: getCellColor(r, j),
                  },
                ]}
              >
                <Text style={styles.text}>{letter.toUpperCase()}</Text>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
      <Keyboard
        onKeyPressed={onKeyPressed}
        greenCaps={greenKeys}
        yellowCaps={yellowKeys}
        greyCaps={greyKeys}
      />
    </>
  );
};

const styles = StyleSheet.create({
  map: {
    padding: 20,
    alignSelf: "stretch",
    // height: 100,
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

export default GameLogic;
