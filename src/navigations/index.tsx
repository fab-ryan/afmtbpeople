import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { lightTheme } from '@constants/Colors';
import { RootStackParamList, RootTabParamList } from '@utils/types';
import LoginScreen from '@screens/Login';
import HomeScreen from '@screens/Home';
import IncomeScreen from '@screens/Income';

import { HomeIcon, ListIcon } from '@components';
import { Dimensions } from 'react-native';

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
      <Stack.Screen
        name='Income'
        component={IncomeScreen}
      />
    </Stack.Navigator>
  );
}

const bottomTab = createBottomTabNavigator<RootTabParamList>();
function BottomTabNavigator() {
  const DEVICE_WIDTH = Dimensions.get('window').width;
  return (
    <SafeAreaView
      edges={['right', 'bottom', 'left']}
      style={{ flex: 1, borderTopColor: lightTheme.primary, borderTopWidth: 1 }}
    >
      <bottomTab.Navigator
        initialRouteName='Home'
        screenOptions={{
          tabBarActiveTintColor: lightTheme.text,
          tabBarInactiveTintColor: lightTheme.text,
          tabBarStyle: {
            height: 50,
            paddingBottom: 5,
            paddingTop: 5,
            borderTopColor: lightTheme.text,
            position: 'absolute',
            width: DEVICE_WIDTH,
            zIndex: 100,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            backgroundColor: 'white',
          },

          headerShown: false,
        }}
      >
        <bottomTab.Screen
          name='Home'
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color }) => <HomeIcon color={color} />,
          }}
        />
      </bottomTab.Navigator>
    </SafeAreaView>
  );
}
