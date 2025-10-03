import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import carList from './data.json';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/*<ScrollView>
        {carList.map((car) => (
          <View key={car.model} style={{ margin: 10, padding: 10, borderWidth: 2, borderRadius: 10, borderColor: '#999' }}>
            <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Car Model: {car.model}</Text>
            <Text style={{ fontWeight: 'bold' }}>HP: {car.hp ? car.hp >= 200 ? <Text style={{ color: 'red' }}>{car.hp}</Text> : car.hp >= 100 ? <Text style={{ color: 'orange' }}>{car.hp}</Text> : <Text style={{ color: 'green' }}>{car.hp}</Text> : 'Unknown'}</Text>
          </View>
        ))}
      </ScrollView>*/}
      <FlatList
        data={carList}
        keyExtractor={(item) => item.model}
        renderItem={({ item }) => (
          <View style={{ margin: 10, padding: 10, borderWidth: 2, borderRadius: 10, borderColor: '#999' }}>
            <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Car Model: {item.model}</Text>
            <Text style={{ fontWeight: 'bold' }}>HP: {item.hp ? item.hp >= 200 ? <Text style={{ color: 'red' }}>{item.hp}</Text> : item.hp >= 100 ? <Text style={{ color: 'orange' }}>{item.hp}</Text> : <Text style={{ color: 'green' }}>{item.hp}</Text> : 'Unknown'}</Text>
          </View>
        )}
      />
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
