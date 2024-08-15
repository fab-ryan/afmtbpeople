import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import Navigation from '@navigations';
import { Provider } from 'react-redux';
import { store } from '@redux/config';
import { CustomToast } from '@components';

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <PaperProvider>
          <CustomToast />
          <StatusBar
            animated={true}
            backgroundColor='transparent'
            style='auto'
          />
          <Navigation firstTime={false} />
        </PaperProvider>
      </SafeAreaProvider>
    </Provider>
  );
}
