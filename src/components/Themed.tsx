import {
  View as DefaultViews,
  ImageBackground,
  StyleSheet,
  Text as DefaultText,
  SafeAreaView,
} from 'react-native';

import { FontAwesome } from '@expo/vector-icons';
import layouts from '@assets/images/layouts.png';
import { lightTheme } from '@constants/Colors';
import React from 'react';
import Svg, { Circle, Path, Rect } from 'react-native-svg';
import { BackButton } from './Button';
import { useNavigation } from '@react-navigation/native';
type ViewProps = DefaultViews['props'];

type TextProps = DefaultText['props'];

export const View: React.FC<ViewProps> = (props) => {
  return <DefaultViews {...props} />;
};

type LayoutViewProps = {
  backbtn?: boolean;
};
export const LayoutView = (props: LayoutViewProps & ViewProps) => {
  const navigation = useNavigation();
  return (
    <ImageBackground
      source={layouts}
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
        marginTop: 0,
        flexDirection: 'column',
        justifyContent: 'flex-start',
      }}
      blurRadius={0}
    >
      {props.backbtn && (
        <SafeAreaView style={styles.headerButtonContainer}>
          <BackButton
            title='back'
            onPress={() => {
              navigation.goBack();
            }}
          />
        </SafeAreaView>
      )}

      {props.children}
    </ImageBackground>
  );
};

export const Text: React.FC<TextProps> = (props) => {
  return <DefaultText {...props} />;
};

export const HeaderText: React.FC<TextProps> = (props) => {
  return (
    <DefaultText
      {...props}
      style={{ fontSize: 25, fontWeight: '600', color: lightTheme.text }}
      accessibilityLabel={props.children?.toString()}
      accessibilityRole='text'
    />
  );
};

export const HomeIcon = ({ color }: { color: string }) => {
  return (
    <Svg
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
    >
      <Rect
        width='20'
        height='20'
        fill='white'
      />
      <Path
        d='M8.6325 0.829991C9.02033 0.5193 9.50244 0.350006 9.99937 0.350006C10.4963 0.350006 10.9784 0.5193 11.3663 0.829991L17.9288 6.07999C18.4475 6.49499 18.75 7.12374 18.75 7.78874V16.5625C18.75 17.1427 18.5195 17.6991 18.1093 18.1093C17.6991 18.5195 17.1427 18.75 16.5625 18.75H12.1875C11.9389 18.75 11.7004 18.6512 11.5246 18.4754C11.3488 18.2996 11.25 18.0611 11.25 17.8125V11.25H8.75V17.8125C8.75 18.0611 8.65123 18.2996 8.47541 18.4754C8.2996 18.6512 8.06114 18.75 7.8125 18.75H3.4375C2.85734 18.75 2.30094 18.5195 1.8907 18.1093C1.48047 17.6991 1.25 17.1427 1.25 16.5625V7.78749C1.25 7.12374 1.5525 6.49499 2.07125 6.07999L8.6325 0.829991ZM10.195 2.29374C10.1396 2.24952 10.0709 2.22544 10 2.22544C9.92914 2.22544 9.86038 2.24952 9.805 2.29374L3.2425 7.54374C3.20574 7.5731 3.17607 7.61038 3.15573 7.6528C3.13538 7.69522 3.12488 7.74169 3.125 7.78874V16.5625C3.125 16.735 3.265 16.875 3.4375 16.875H6.875V10.3125C6.875 10.0639 6.97377 9.82539 7.14959 9.64958C7.3254 9.47376 7.56386 9.37499 7.8125 9.37499H12.1875C12.4361 9.37499 12.6746 9.47376 12.8504 9.64958C13.0262 9.82539 13.125 10.0639 13.125 10.3125V16.875H16.5625C16.6454 16.875 16.7249 16.8421 16.7835 16.7835C16.8421 16.7249 16.875 16.6454 16.875 16.5625V7.78749C16.8749 7.74065 16.8643 7.69443 16.844 7.65224C16.8237 7.61005 16.7941 7.57297 16.7575 7.54374L10.195 2.29374Z'
        fill={color}
      />
    </Svg>
  );
};

export const ListIcon = () => {};

export const ArrowRightIcon = ({ color }: { color: string }) => {
  return (
    <Svg
      width='32'
      height='32'
      viewBox='0 0 32 32'
      fill='none'
    >
      <Circle
        cx='16'
        cy='16'
        r='16'
        fill='white'
      />
      <Path
        d='M23.5245 16.9925C24.0726 16.3713 24.0133 15.4234 23.3921 14.8753L13.2693 5.94337C12.6481 5.39527 11.7002 5.45451 11.1521 6.0757C10.604 6.69688 10.6633 7.64478 11.2845 8.19289L20.2825 16.1323L12.343 25.1304C11.7949 25.7516 11.8542 26.6995 12.4754 27.2476C13.0966 27.7957 14.0445 27.7365 14.5926 27.1153L23.5245 16.9925ZM9.69354 18.2971L22.4933 17.4971L22.3061 14.5029L9.50641 15.3029L9.69354 18.2971Z'
        fill='#468BF1'
      />
    </Svg>
  );
};

type IconProps = {
  color: string;
  name: keyof typeof FontAwesome.glyphMap;
  size?: number;
};

export const Icon = ({ name, color, size = 24 }: IconProps) => {
  return (
    <FontAwesome
      name={name}
      size={size}
      color={color}
      style={{
        fontWeight:'300'
      }}
    />
  );
};

const styles = StyleSheet.create({
  headerButtonContainer: {
    marginTop: 70,
    marginLeft: 20,
  },
});
