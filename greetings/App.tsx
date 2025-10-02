import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react';

const greetingList: string[] = [
  "Hello!",
  "Hi there!",
  "Greetings!",
  "Salutations!",
  "Howdy!",
  "Hey!",
  "Good day!",
  "What's up?",
  "Yo!",
  "Ahoy!"
];

const GreetingsApp = () => {

  const [currentGreeting, setCurrentGreeting] = useState("Press the button for a greeting!");

  const handlePress = () => {
    let newGreeting;
    do {
      newGreeting = greetingList[Math.floor(Math.random() * greetingList.length)];
    } while (newGreeting === currentGreeting);
    setCurrentGreeting(newGreeting);
  }

  return (
    <View style={styles.greetings}>
      <Text style={styles.current}>{currentGreeting}</Text>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>New Greeting</Text>
      </TouchableOpacity>
    </View>

  );
}

export default GreetingsApp;

const styles = StyleSheet.create({
  greetings: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  current: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  button: {
    width: 150,
    height: 50,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
