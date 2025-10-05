import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';



export default function App() {

  const [screen, currentScreen] = React.useState<'login' | 'register'>('login');
  const goRegister = React.useCallback(() => currentScreen('register'), []);
  const goLogin = React.useCallback(() => currentScreen('login'), []);

  return (
    <SafeAreaView style={styles.container}>
      {screen === 'login' ? (
        <LoginScreen goRegister={goRegister} />
      ) : (
        <RegisterScreen goLogin={goLogin} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
