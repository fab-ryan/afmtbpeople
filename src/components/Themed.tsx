import {
  View as DefaultViews,
  ImageBackground,
  Text as DefaultText,
} from 'react-native';
import layouts from '@assets/images/layouts.png';
import { lightTheme } from '@constants/Colors';
type ViewProps = DefaultViews['props'];

type TextProps = DefaultText['props'];

export const View: React.FC<ViewProps> = (props) => {
  return <DefaultViews {...props} />;
};

export const LayoutView: React.FC<ViewProps> = (props) => {
  return (
    <ImageBackground
      source={layouts}
      style={{ flex: 1, width: '100%', height: '100%', marginTop: 0 }}
      blurRadius={0}
    >
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
      style={{ fontSize: 20, fontWeight: 'bold', color: lightTheme.text }}
      accessibilityLabel={props.children?.toString()}
      accessibilityRole='text'

    />
  );
};
