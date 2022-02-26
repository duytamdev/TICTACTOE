import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Alert} from 'react-native';
import {ImageBackground} from 'react-native';
import Cell from '../components/Cell';

const HomeScreen = () => {
  const [map, setMap] = useState([
    ['', '', ''], // 1st row
    ['', '', ''], // 2nt row
    ['', '', ''], // 3rt row
  ]);

  const [currentTurn, setCurrentTurn] = useState('x');
  useEffect(() => {
    if (currentTurn === 'o') {
      botTurn();
    }
  }, [currentTurn]);
  const onPress = (rowIndex, columnIndex) => {
    const winner = getWinner();
    if (winner) {
      gameWon(winner);
    } else {
      checkTieState();
    }
    if (map[rowIndex][columnIndex] !== '') {
      return;
    }
    setMap(existingMap => {
      const updatedMap = [...existingMap];
      updatedMap[rowIndex][columnIndex] = currentTurn;
      return updatedMap;
    });
    setCurrentTurn(currentTurn === 'x' ? 'o' : 'x');
  };
  const checkTieState = () => {
    if (!map.some(row => row.some(cell => cell === ''))) {
      Alert.alert('It a tie', 'tie', [
        {
          text: 'Reset',
          onPress: resetGame,
        },
      ]);
    }
  };
  const getWinner = () => {
    for (let i = 0; i < 3; i++) {
      const isRowXWinning = map[i].every(cell => cell === 'x');
      const isRowOWinning = map[i].every(cell => cell === 'o');

      if (isRowXWinning) {
        return 'X';
      }
      if (isRowOWinning) {
        return 'O';
      }
    }
    for (let column = 0; column < 3; column++) {
      let isColumnXWinner = true;
      let isColumnYOWinner = true;
      for (let row = 0; row < 3; row++) {
        if (map[row][column] !== 'x') {
          isColumnXWinner = false;
        }
        if (map[row][column] !== 'o') {
          isColumnYOWinner = false;
        }
      }
      if (isColumnXWinner) {
        return 'X';
      }
      if (isColumnYOWinner) {
        return 'O';
      }
    }
    let isDiagonal1XWinning = true;
    let isDiagonal1OWinning = true;
    let isDiagonal2XWinning = true;
    let isDiagonal2OWinning = true;
    for (let i = 0; i < 3; i++) {
      if (map[i][i] !== 'o') {
        isDiagonal1OWinning = false;
      }
      if (map[i][i] !== 'x') {
        isDiagonal1XWinning = false;
      }
      if (map[i][2 - i] !== 'o') {
        isDiagonal2OWinning = false;
      }
      if (map[i][2 - i] !== 'x') {
        isDiagonal2XWinning = false;
      }
    }
    if (isDiagonal1XWinning || isDiagonal2XWinning) {
      return 'X';
    }
    if (isDiagonal1OWinning || isDiagonal2OWinning) {
      return 'O';
    }
  };
  const gameWon = player => {
    Alert.alert('Yahhhh', `${player} won`, [
      {
        text: 'Reset',
        onPress: resetGame,
      },
    ]);
  };
  const resetGame = () => {
    setMap([
      ['', '', ''], // 1st row
      ['', '', ''], // 2st row
      ['', '', ''], // 3st row
    ]);
    setCurrentTurn('x');
  };
  const botTurn = () => {
    const possiblePositions = [];
    map.forEach((row, rowIndex) => {
      row.forEach((cell, columnIndex) => {
        if (cell === '') {
          possiblePositions.push({row: rowIndex, col: columnIndex});
        }
      });
    });
    try {
      if (possiblePositions.length > 0) {
        const chosenOptions =
          possiblePositions[
            Math.floor(Math.random() * possiblePositions.length)
          ];
        onPress(chosenOptions.row, chosenOptions.col);
      }
    } catch (e) {}
  };
  return (
    <ImageBackground
      resizeMode={'contain'}
      source={require('../images/bg.jpeg')}
      style={styles.container}>
      <Text
        style={styles.textCurrentTurn}>{`Current turn: ${currentTurn}`}</Text>
      <View style={styles.map}>
        {map.map((row, rowIndex) => (
          <View key={`row-${rowIndex}`} style={styles.row}>
            {row.map((cell, columnIndex) => (
              <Cell
                cell={cell}
                key={`column-${columnIndex}-row-${rowIndex}`}
                onPress={() => onPress(rowIndex, columnIndex)}
              />
            ))}
          </View>
        ))}
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  textCurrentTurn: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    position: 'absolute',
    top: 20,
  },

  row: {
    flex: 1,
    flexDirection: 'row',
  },

  map: {
    width: '80%',
    aspectRatio: 1,
  },

  container: {
    flex: 1,
    backgroundColor: '#242d34',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 35,
  },
});
export default HomeScreen;
