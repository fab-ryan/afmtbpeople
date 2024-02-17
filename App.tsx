import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from '@navigations';

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar
        animated={true}
        backgroundColor='transparent'
        style='auto'
      />
      <Navigation firstTime={false} />
    </SafeAreaProvider>
  );
}
