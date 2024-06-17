import { Pressable, PressableProps, Text, StyleSheet } from 'react-native';
import { Icon, View } from './Themed';
import { lightTheme } from '@constants/Colors';
import Svg, { Circle, Path } from 'react-native-svg';

interface IButtonProps extends PressableProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}

const CustomButton = (props: IButtonProps) => {
  return (
    <Pressable
      style={styles.container}
      {...props}
    >
      <View>
        <Text style={styles.text}>{props.title}</Text>
      </View>
    </Pressable>
  );
};

const AddButton = (props: IButtonProps) => {
  return (
    <Pressable
      style={styles.addContainer}
      {...props}
    >
      <View>
        <Text style={styles.addText}>{props.title}</Text>
      </View>
    </Pressable>
  );
};

const TextLink = (props: IButtonProps) => {
  return (
    <Pressable {...props}>
      <View>
        <Text style={styles.textLink}>{props.title}</Text>
      </View>
    </Pressable>
  );
};

export const ArrowLeftIcon = ({ color }: { color: string }) => {
  return (
    <Svg
      width='34'
      height='34'
      viewBox='0 0 24 24'
      fill='none'
    >
      <Circle
        cx='16'
        cy='16'
        r='16'
      />
      <Path
        d='M11.2903 6.29006L6.29026 11.2901C6.19922 11.3852 6.12786 11.4973 6.08026 11.6201C5.98024 11.8635 5.98024 12.1366 6.08026 12.3801C6.12786 12.5028 6.19922 12.615 6.29026 12.7101L11.2903 17.7101C11.3835 17.8033 11.4942 17.8773 11.616 17.9277C11.7378 17.9782 11.8684 18.0042 12.0003 18.0042C12.2666 18.0042 12.522 17.8984 12.7103 17.7101C12.8986 17.5218 13.0044 17.2664 13.0044 17.0001C13.0044 16.7338 12.8986 16.4784 12.7103 16.2901L9.41026 13.0001H17.0003C17.2655 13.0001 17.5198 12.8947 17.7074 12.7072C17.8949 12.5196 18.0003 12.2653 18.0003 12.0001C18.0003 11.7348 17.8949 11.4805 17.7074 11.293C17.5198 11.1054 17.2655 11.0001 17.0003 11.0001H9.41026L12.7103 7.71006C12.804 7.61709 12.8784 7.5065 12.9292 7.38464C12.9799 7.26278 13.0061 7.13207 13.0061 7.00006C13.0061 6.86805 12.9799 6.73734 12.9292 6.61548C12.8784 6.49362 12.804 6.38302 12.7103 6.29006C12.6173 6.19633 12.5067 6.12194 12.3848 6.07117C12.263 6.0204 12.1323 5.99426 12.0003 5.99426C11.8683 5.99426 11.7375 6.0204 11.6157 6.07117C11.4938 6.12194 11.3832 6.19633 11.2903 6.29006Z'
        fill='#699BF7'
      />
    </Svg>
  );
};

const BackButton = (props: IButtonProps) => {
  return (
    <Pressable {...props}>
      <View style={styles.headerButton}>
        <ArrowLeftIcon color={lightTheme.primary} />
      </View>
    </Pressable>
  );
};
const IconButton = (props: IButtonProps) => {
  return <Pressable {...props}>{props.children}</Pressable>;
};

export {
  CustomButton as Button,
  TextLink as ButtonLink,
  BackButton as BackButton,
  AddButton as AddButton,
  IconButton as IconButton,
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 15,
    backgroundColor: lightTheme.primary,
    borderRadius: 15,
  },

  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
  },

  textLink: {
    color: lightTheme.primary,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '400',
  },

  headerButton: {
    width: 50,
    height: 50,
    borderRadius: 15,
    backgroundColor: lightTheme.background,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addContainer: {
    borderRadius: 30,
    backgroundColor: '#fff',
    shadowColor: lightTheme.tint,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    paddingHorizontal: 20,
    paddingVertical: 8,
    shadowOpacity: 0.54,
    shadowRadius: 6.27,
    elevation: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addText: {
    color: lightTheme.primary,
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '500',
  },
});
