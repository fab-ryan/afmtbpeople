import {
  View as DefaultViews,
  ImageBackground,
  StyleSheet,
  Text as DefaultText,
  SafeAreaView,
  NativeModules,
  LayoutAnimation,
} from 'react-native';

import { FontAwesome } from '@expo/vector-icons';
import layouts from '@assets/images/layouts.png';
import { lightTheme } from '@constants/Colors';
import React from 'react';
import Svg, {
  Circle,
  Defs,
  G,
  Path,
  Rect,
  SvgXml,
  ClipPath,
  Filter,
  FeColorMatrix,
} from 'react-native-svg';
import { BackButton } from './Button';
import { useNavigation } from '@react-navigation/native';

import ProfileIconSvg from '@assets/images/profile.svg';

type ViewProps = DefaultViews['props'];

type TextProps = DefaultText['props'];

export const View: React.FC<ViewProps> = (props) => {
  return <DefaultViews {...props} />;
};

type LayoutViewProps = {
  backbtn?: boolean;
};

const { UIManager } = NativeModules;
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

export const LayoutView = (props: LayoutViewProps & ViewProps) => {
  const navigation = useNavigation();
  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

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
      accessibilityState={{ selected: true }}
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

export const ProfileIcon = ({ color }: { color: string }) => {
  return (
    <FontAwesome
      name='user-o'
      color={color}
      size={24}
      style={{
        fontWeight: '300',
      }}
      />

    )
};

export const ListIcon = () => {};

export const ClockIcon = ({ color }: { color: string }) => {
  return (
    <Svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
    >
      <G>
        <Path
          d='M6.57 5.56304C6.42949 5.67547 6.31606 5.81805 6.23811 5.98025C6.16016 6.14244 6.11969 6.32009 6.11969 6.50004C6.11969 6.67999 6.16016 6.85764 6.23811 7.01984C6.31606 7.18203 6.42949 7.32462 6.57 7.43704L11.05 11.021C11.836 11.649 13 11.091 13 10.084V8.50004C13.0002 8.24148 12.9002 7.99291 12.721 7.80649C12.5418 7.62007 12.2974 7.51029 12.039 7.5002C11.7807 7.49011 11.5284 7.58049 11.3353 7.75236C11.1421 7.92424 11.023 8.16425 11.003 8.42204L8.601 6.50004L11 4.58004V5.00004C11 5.26526 11.1054 5.51961 11.2929 5.70715C11.4804 5.89468 11.7348 6.00004 12 6.00004C13.6835 5.99982 15.3107 6.60624 16.5835 7.70819C17.8562 8.81015 18.6893 10.3338 18.93 12H18C17.7348 12 17.4804 12.1054 17.2929 12.2929C17.1054 12.4805 17 12.7348 17 13C17 13.2653 17.1054 13.5196 17.2929 13.7071C17.4804 13.8947 17.7348 14 18 14H18.93C18.7138 15.496 18.0194 16.8819 16.9506 17.9507C15.8818 19.0194 14.496 19.7138 13 19.93V18C13 17.7348 12.8946 17.4805 12.7071 17.2929C12.5196 17.1054 12.2652 17 12 17C11.7348 17 11.4804 17.1054 11.2929 17.2929C11.1054 17.4805 11 17.7348 11 18V19.93C9.50405 19.7138 8.11818 19.0194 7.04939 17.9507C5.98059 16.8819 5.28623 15.496 5.07 14H6C6.26522 14 6.51957 13.8947 6.70711 13.7071C6.89464 13.5196 7 13.2653 7 13C7 12.7348 6.89464 12.4805 6.70711 12.2929C6.51957 12.1054 6.26522 12 6 12H5.07C5.152 11.433 5.3 10.889 5.508 10.375C5.5621 10.2525 5.59104 10.1204 5.59309 9.98642C5.59513 9.85249 5.57025 9.71951 5.51992 9.59538C5.46959 9.47125 5.39484 9.35849 5.30009 9.26381C5.20535 9.16912 5.09255 9.09443 4.96838 9.04418C4.84422 8.99392 4.71123 8.96913 4.5773 8.97126C4.44337 8.97339 4.31123 9.0024 4.18873 9.05658C4.06623 9.11076 3.95586 9.18899 3.86418 9.28665C3.77249 9.3843 3.70136 9.49937 3.655 9.62504C2.94842 11.3723 2.80819 13.2973 3.2541 15.1285C3.70001 16.9597 4.70955 18.6047 6.14033 19.8315C7.57111 21.0583 9.35092 21.8049 11.2287 21.9662C13.1065 22.1274 14.9876 21.695 16.6065 20.7301C18.2255 19.7651 19.5006 18.3162 20.2521 16.5878C21.0037 14.8594 21.1936 12.9387 20.7952 11.0966C20.3968 9.25448 19.4301 7.58392 18.0315 6.32055C16.6329 5.05718 14.873 4.26475 13 4.05504V2.91604C13 1.91004 11.836 1.35104 11.05 1.97904L6.57 5.56304Z'
          fill='#699BF7'
        />
      </G>
      <Defs>
        <ClipPath id='clip0_534_87'>
          <Rect
            width='24'
            height='24'
            fill='white'
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

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
        fontWeight: '300',
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
