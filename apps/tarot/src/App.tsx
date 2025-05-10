import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default function App() {
  return (
    <View style={styles.container}>
      <Text>
        Open up App.tsx to start working on your tarot app!
      </Text>

      <StatusBar style="auto" />
    </View>
  );
}


