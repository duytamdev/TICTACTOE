import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Circle from './Circle';
import Cross from './Cross';

const Cell = ({cell, ...props}) => {
  return (
    <TouchableOpacity {...props} style={styles.cell}>
      {cell === 'o' && <Circle />}
      {cell === 'x' && <Cross />}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  cell: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
export default Cell;
