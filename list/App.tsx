import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import titanicList from './data.json';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        {titanicList.map((passenger) => (
          <View key={passenger.PassengerId} style={{ margin: 10, padding: 10, borderWidth: 1 }}>
            <Text>Passenger Name: {passenger.Name}</Text>
            <Text>Age: {passenger.Age ? passenger.Age : 'Unknown'}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
