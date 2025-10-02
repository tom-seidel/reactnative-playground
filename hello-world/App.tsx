import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const str = new String("Hello, World!");

const HelloWorld = () => {
  return (
  <View style={styles.hello}>
    <Text>{str}</Text>
  </View>
  );
}

export default HelloWorld;

const styles = StyleSheet.create({
  hello: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});