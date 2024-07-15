import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Login: undefined;
  Register: undefined;
  Income: undefined;
  NewIncome: undefined;
  Expense: undefined;
  NewExpense: undefined;
  Deposit: undefined;
  NewDeposit: undefined;
  Withdraw: undefined;
  NewWithdraw: undefined;
};
export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type StackScreenProps = StackNavigationProp<RootStackParamList>;

export type RootTabParamList = {
  Home: undefined;
  Reports: undefined;
  Profile: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;
/* eslint-disable @typescript-eslint/no-namespace */
import {
  FontAwesome,
  Feather,
  MaterialCommunityIcons,
  Ionicons,
  AntDesign,
  Entypo,
} from '@expo/vector-icons';
import * as React from 'react';
import { StyleProp, TextStyle } from 'react-native';

export enum IconsEnum {
  fa = 'fa',
  feather = 'feather',
  material = 'material',
  ionicon = 'ionicon',
  antdesign = 'antdesign',
  entypo = 'entypo',
}

export type IconProps<T extends IconsEnum> = {
  name: ComponentProps[T]['name'];
  color?: string;
  size?: number;
  type?: T;
  style?: StyleProp<TextStyle>;
} & ThemeProps;

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

interface ComponentProps {
  fa: React.ComponentProps<typeof FontAwesome>;
  feather: React.ComponentProps<typeof Feather>;
  material: React.ComponentProps<typeof MaterialCommunityIcons>;
  ionicon: React.ComponentProps<typeof Ionicons>;
  antdesign: React.ComponentProps<typeof AntDesign>;
  entypo: React.ComponentProps<typeof Entypo>;
}
