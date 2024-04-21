import { useState } from 'react';
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  TextInputFocusEventData,
  NativeSyntheticEvent,
  TouchableOpacity,
  TextInputProps,
  TextInput as DefaultTextInput,
} from 'react-native';
import { Controller, ControllerProps, FieldValues } from 'react-hook-form';
import DatePicker, { DatePickerProps } from 'react-native-date-picker';

import { Text } from './Themed';
import { lightTheme } from '@constants/Colors';

type InputTextProps = {
  containerStyle?: StyleProp<ViewStyle>;
  label?: string;
  error?: string | boolean;
  placeholder?: string;
  style?: StyleProp<TextStyle>;
  secureTextEntry?: boolean;
};

type DatePickerFieldProps = {
  containerStyle?: StyleProp<ViewStyle>;
  label?: string;
  error?: string | boolean;
  placeholder?: string;
  style?: StyleProp<TextStyle>;
  onChange?: (e: Date) => void;
  value: Date;
};

type ControlledDatePickerProps<T extends FieldValues> = Partial<DatePickerFieldProps> &
  Partial<ControllerProps<T>> & Pick<ControllerProps<T>, 'name'>;

type ControlledTextInputProps<T> = InputTextProps &
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  Partial<ControllerProps<T>> &
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  Pick<ControllerProps<T>, 'name'> &
  TextInputProps;

function TextInputField({
  style,
  placeholder,
  containerStyle,
  secureTextEntry,
  label,
  keyboardType,
  error,
  onBlur = () => {},
  onFocus = () => {},
  ...props
}: InputTextProps & TextInputProps) {
  const [isFocused, setOnFocus] = useState(false);
  const [secure, setSecure] = useState(secureTextEntry);
  const hasPhonePadKeyboard = keyboardType === 'phone-pad';
  const toggleFocus = () => {
    setOnFocus(!isFocused);
  };
  const toggleSecure = () => {
    setSecure(!secure);
  };
  const onBlurhandler = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    onBlur(e);
    toggleFocus();
  };

  const onFocusHandler = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    onFocus(e);
    toggleFocus();
  };

  let _style: StyleProp<TextStyle> = [style];
  if (secureTextEntry) {
    _style = [
      ..._style,
      {
        paddingRight: 40,
      },
    ];
  }

  if (isFocused) {
    _style = [
      ..._style,
      {
        borderColor: lightTheme.tint,
      },
    ];
  }
  if (error) {
    _style = [
      ..._style,
      {
        borderColor: '#F00',
      },
    ];
  }

  if (hasPhonePadKeyboard) {
    _style = [
      ..._style,
      {
        textAlign: 'center',
      },
    ];
  }

  return (
    <View
      style={[
        {
          width: '100%',
        },
      ]}
    >
      <DefaultTextInput
        style={[styles.inputContainer, _style]}
        placeholder={placeholder}
        secureTextEntry={secure}
        keyboardType={keyboardType}
        onBlur={onBlurhandler}
        onFocus={onFocusHandler}
        {...props}
      />
      {error && <Text style={styles.errorMessage}>{error}</Text>}
    </View>
  );
}

export const TextInput = <T extends FieldValues = FieldValues>({
  control,
  name,
  rules,
  ...props
}: ControlledTextInputProps<T>) => {
  return (
    <Controller
      control={control}
      rules={rules}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextInputField
          {...props}
          onChangeText={onChange}
          onBlur={onBlur}
          value={value}
        />
      )}
      name={name}
    />
  );
};

export const DatePickerField = <T extends FieldValues = FieldValues>({
  control,
  name,
  rules,
  ...props
}: ControlledDatePickerProps<T>) => {
  return (
    <Controller
      control={control}
      rules={rules}
      render={({ field: { onChange, onBlur, value } }) => (
        <DatePickerInput
          {...props}
          onChange={onChange}
          value={value}
          date={value}
        />
      )}
      name={name}
    />
  );
};

const DatePickerInput = ({
  style,
  containerStyle,
  error,
  onChange,
  value,
  ...props
}: DatePickerFieldProps & DatePickerProps) => {
  const [isFocused, setOnFocus] = useState(false);
  const toggleFocus = () => {
    setOnFocus(!isFocused);
  };

  let _style: StyleProp<TextStyle> = [style];
  if (isFocused) {
    _style = [
      ..._style,
      {
        borderColor: lightTheme.tint,
      },
    ];
  }
  return (
    <View
      style={[
        {
          width: '100%',
        },
      ]}
    >
      <DatePicker
        mode='date'
        style={[styles.inputContainer, _style]}
        onDateChange={onChange}
        {...props}
        date={value}
      />
      {error && <Text style={styles.errorMessage}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 0.5,
    padding: 15,
    borderRadius: 10,
    width: '100%',
    borderColor: lightTheme.text,
  },
  errorMessage: {
    color: '#F00',
  },
});
