import React from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";

const LoginScreen = ({ goRegister }: { goRegister: () => void }) => {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24, fontWeight: '600' }}>Login</Text>
      <TextInput style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={''} // placeholder for now (value for state)
        //onChangeText={'setEmail'}
      />
      <TextInput style={styles.input}
        placeholder="Passwort"
        secureTextEntry
        value={''} // placeholder for now (value for state)
        //onChangeText={'setPassword'} 
      />
      <Button title="Login" onPress={() => { }} />
      <Button title="No Account? Register" onPress={goRegister} />
    </View>
  );
}

export default LoginScreen;

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
