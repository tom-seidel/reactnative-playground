import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Toggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <View style={[styles.view, isDarkMode ? styles.darkMode : styles.lightMode]}>
      <Text style={isDarkMode ? styles.darkText : styles.lightText}>Toggle Dark Mode</Text>
      <Button title={isDarkMode ? "Light Mode" : "Dark Mode"} onPress={() => setIsDarkMode(!isDarkMode)} />
    </View>
  );
}

export default Toggle;

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lightMode: {
    backgroundColor: '#FFFFFF', 
  },
  darkMode: {
    backgroundColor: '#000000',
  },
  lightText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  darkText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
});
