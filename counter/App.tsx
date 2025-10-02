import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const CounterApp = () => {

const [counter, setCounter] = useState(0);

  return (
    <View style={styles.view}>
      <Text style={counter < 0 ? styles.errorText : styles.text}>Counter: {counter < 0 ? "should not go below zero" : counter}</Text>
      <Button title="Increment" onPress={() => setCounter(counter + 1)} />
      <Button title="Decrement" onPress={() => setCounter(counter - 1)} disabled={counter < 0} />
      <Button title="Reset" onPress={() => setCounter(0)} disabled={counter === 0} />
    </View>
  );
}

export default CounterApp;

const styles = StyleSheet.create({
    view: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#000',
      marginBottom: 20,
    },
    errorText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'red',
      marginBottom: 20,
    },
  });