import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { lightTheme } from '@constants/Colors';
import { RootStackParamList, RootTabParamList } from '@utils/types';
import LoginScreen from '@screens/Login';

export default function Navigation({ firstTime }: { firstTime: boolean }) {
  const light = lightTheme;
  const DefaultThemes = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: light.background,
      card: light.background,
      border: '#0177BB',
      primary: light.tint,
      text: light.text,
      notification: light.tint,
    },
    dark: false,
  };
  return (
    <SafeAreaProvider>
      <NavigationContainer theme={DefaultThemes}>
        <RootNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();
function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name='Login'
        component={LoginScreen}
      />
      <Stack.Screen
        name='Root'
        component={BottomTabNavigator}
      />
    </Stack.Navigator>
  );
}

const bottomTab = createBottomTabNavigator<RootTabParamList>();
function BottomTabNavigator() {
  return (
    <SafeAreaView
      edges={['right', 'bottom', 'left']}
      style={{ flex: 1 }}
    >
      <bottomTab.Navigator
        initialRouteName='Home'
        screenOptions={{ headerShown: false }}
      >
        <bottomTab.Screen
          name='Home'
          component={LoginScreen}
        />
      </bottomTab.Navigator>
    </SafeAreaView>
  );
}
