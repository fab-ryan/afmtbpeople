import { Text, TouchableWithoutFeedback } from 'react-native';
import { BlurView } from 'expo-blur';
import { Portal } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from './Image';
import { width } from '@constants';
import { useSelector, useActions } from '@hooks';
import { ForbiddenIcon, InfoIcon, VerifyIcon } from './Icon';
import { View } from './Themed';

import Animated, {
  FadeInUp,
  FadeOutUp,
  runOnJS,
} from 'react-native-reanimated';

export const CustomToast = () => {
  const { closeToast } = useActions();
  const toastState = useSelector((state) => state.toast);

  const handleClose = () => {
    closeToast();
  };

  function callback() {
    'worklet';
    runOnJS(handleClose)();
  }

  const renderIcon = (): JSX.Element => {
    if (toastState.type === 'Failed') {
      return (
        <ForbiddenIcon
          size={20}
          color={'white' ?? getColor({ type: toastState.type })}
        />
      );
    } else if (toastState.type === 'Success') {
      return (
        <VerifyIcon
          size={20}
          color={'white' ?? getColor({ type: toastState.type })}
        />
      );
    } else if (toastState.type === 'Info') {
      return (
        <InfoIcon
          size={20}
          color={'white' ?? getColor({ type: toastState.type })}
        />
      );
    } else if (toastState.type === 'Message') {
      return (
        <Image
          style={{ height: 20, width: 20, borderRadius: 999 }}
          source={{ uri: toastState.imageUri }}
        />
      );
    } else {
      return (
        <InfoIcon
          size={20}
          color={'white' ?? getColor({ type: toastState.type })}
        />
      );
    }
  };

  const insets = useSafeAreaInsets();

  return (
    <Portal>
      {toastState.open && (
        <TouchableWithoutFeedback onPress={handleClose}>
          <Animated.View
            style={{
              height: 60 + insets.top,
              width: width,
              // backgroundColor:
              //   toastState.type === 'Failed'
              //     ? '#D8000061'
              //     : toastState.type === 'Success'
              //     ? '#4CF10062'
              //     : '#00000058',

              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
            entering={FadeInUp.springify().withCallback(callback)}
            exiting={FadeOutUp.springify().delay(1000)}
          >
            <BlurView
              intensity={50}
              tint='dark'
              style={{
                height: 66 + insets.top,
                width,
                position: 'absolute',
              }}
            />
            <View
              style={{
                width: width - 40,
                backgroundColor: getColor({ type: toastState.type }),
                borderRadius: 10,
                padding: 10,
                flexDirection: 'row',
                marginBottom: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {renderIcon()}
              <Text
                style={{
                  color: 'white',
                  marginLeft: 10,
                  flex: 1,
                  textAlign: 'center',
                }}
              >
                {toastState.message}
              </Text>
            </View>
          </Animated.View>
        </TouchableWithoutFeedback>
      )}
    </Portal>
  );
};

type ColorType = {
  type?: 'Failed' | 'Success' | 'Info' | 'Message' | null;
};
const getColor = ({ type }: ColorType): string => {
  if (type === 'Failed') {
    return '#D8000061';
  } else if (type === 'Success') {
    return '#4CF10062';
  } else if (type === 'Info') {
    return '#00000058';
  } else if (type === 'Message') {
    return '#00000058';
  }

  return '#00000058';
};
