import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import React from 'react';
import { AppProvider } from './context/AppProvider';
import Route from './Route';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  return (
    <React.Fragment>
      <AppProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <Route />
          <StatusBar style='auto' />
        </SafeAreaView>
      </AppProvider>
    </React.Fragment>
  );
}

