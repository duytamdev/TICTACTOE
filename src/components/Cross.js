import React from 'react';
import { View, StyleSheet} from 'react-native';

const Cross = () => {
  return (
    <View style={styles.cross}>
      <View style={styles.crossLine} />
      <View style={[styles.crossLine, styles.crossLineRevers]} />
    </View>
  );
};
const styles = StyleSheet.create({
  crossLine: {
    borderRadius: 8,
    marginLeft: 32.5,
    position: 'absolute',
    width: 10,
    height: 70,
    backgroundColor: '#fff',
    transform: [
      {
        rotate: '45deg',
      },
    ],
  },
  crossLineRevers: {
    transform: [
      {
        rotate: '-45deg',
      },
    ],
  },
  cross: {
    width: 75,
    height: 75,
  },
});
export default Cross;
