import React from 'react';
import {View, StyleSheet} from 'react-native';

const Circle = () => {
  return (
    <View style={styles.circle}>
      <View style={styles.innerCircle} />
    </View>
  );
};
const styles = StyleSheet.create({
  circle: {
    width: 75,
    height: 75,
    margin: 10,
    borderRadius: 48,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    width: 55,
    height: 55,
    borderRadius: 48,

    backgroundColor: '#242d34',
  },
});
export default Circle;
