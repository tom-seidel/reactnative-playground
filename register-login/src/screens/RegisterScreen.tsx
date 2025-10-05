import React from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";

const RegisterScreen = ({ goLogin }: { goLogin: () => void }) => {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24, fontWeight: '600' }}>Register</Text>
      <TextInput style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={''}
        // onChangeText={'setEmail'}
      />
      <TextInput style={styles.input}
        placeholder="Passwort"
        secureTextEntry
        value={''}
        // onChangeText={'setPassword'}
      />
      <Button title="Create Account" onPress={() => { }} />
      <Button title="Already have an account? Login" onPress={goLogin} />
    </View>
  );
}

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    gap: 12,
  },
  input: {
    borderWidth: 1,
    padding: 8,
    borderRadius: 4,
  }
});
