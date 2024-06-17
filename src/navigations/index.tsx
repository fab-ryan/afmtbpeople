import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { lightTheme } from '@constants/Colors';
import { RootStackParamList, RootTabParamList } from '@utils/types';
import LoginScreen from '@screens/Login';
import HomeScreen from '@screens/Home';
import IncomeScreen from '@screens/income';
import AddNewIncome from '@screens/income/Create';
import ExpenseScreen from '@screens/expense';
import AddNewExpense from '@screens/expense/Create';

import DepositScreen from '@screens/deposite';
import AddNewDeposit from '@screens/deposite/Create';

import WithdrawScreen from '@screens/withdraw';
import AddNewWithdraw from '@screens/withdraw/Create';
import RegisterScreen from '@screens/Register';

import { HomeIcon, Icon, ListIcon, ProfileIcon } from '@components';
import { Dimensions } from 'react-native';
import ProfileScreen from '@screens/Profile';
import { getToken, checkTokenExpired } from '@utils';
import { useEffect, useState } from 'react';

export default function Navigation({ firstTime }: { firstTime: boolean }) {
  const [isLogin, setIsLogin] = useState(false);
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
  const token = new Promise((resolve, reject) => {
    getToken((value) => {
      if (value) {
        resolve(value);
      } else {
        reject(new Error('Token not found'));
      }
    });
  });

  useEffect(() => {
    token.then((value) => {
      if (value) setIsLogin(true);
    });
  }, [token]);

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={DefaultThemes}>
        <RootNavigator isLogin={isLogin} />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();
function RootNavigator({ isLogin }: { isLogin: boolean }) {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={isLogin ? 'Root' : 'Login'}
    >
      {isLogin && (
        <>
          <Stack.Screen
            name='Root'
            component={BottomTabNavigator}
          />
          <Stack.Screen
            name='Income'
            component={IncomeScreen}
          />
          <Stack.Screen
            name='NewIncome'
            component={AddNewIncome}
          />

          <Stack.Screen
            name='Expense'
            component={ExpenseScreen}
          />
          <Stack.Screen
            name='NewExpense'
            component={AddNewExpense}
          />

          <Stack.Screen
            name='Deposit'
            component={DepositScreen}
          />

          <Stack.Screen
            name='NewDeposit'
            component={AddNewDeposit}
          />

          <Stack.Screen
            name='Withdraw'
            component={WithdrawScreen}
          />
          <Stack.Screen
            name='NewWithdraw'
            component={AddNewWithdraw}
          />
        </>
      )}
      {
        !isLogin && (

        <>
          <Stack.Screen
            name='Login'
            component={LoginScreen}
          />
          <Stack.Screen
            name='Register'
            component={RegisterScreen}
          />
        </>
        )
      }
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
            overflow: 'hidden',
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
        <bottomTab.Screen
          name='Profile'
          component={ProfileScreen}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color }) => <ProfileIcon color={color} />,
          }}
        />
      </bottomTab.Navigator>
    </SafeAreaView>
  );
}
