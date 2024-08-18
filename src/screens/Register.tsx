import { AccessibilityInfo, SafeAreaView, StyleSheet } from 'react-native';
import {
  LayoutView,
  View,
  HeaderText,
  TextInput,
  Button,
  ButtonLink,
} from '@components';
import { lightTheme } from '@constants/Colors';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerValidationSchema } from '@utils';
import React, { useEffect, useState } from 'react';
import { RootStackScreenProps } from '@utils/types';
import { useActions } from '@hooks';
import { useRegisterMutation } from '@redux';

import Voice from '@react-native-voice/voice';
import Tts from 'react-native-tts';

type IRegisterForm = {
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  password: string;
};
export default function RegisterScreen({
  navigation,
}: RootStackScreenProps<'Register'>) {
  const { openToast, setAuthUser } = useActions();
  const [register, registerStates] = useRegisterMutation();
  const [fieldIndex, setFieldIndex] = useState(0);

  const fields = ['first_name', 'last_name', 'phone', 'email', 'password'];
  const {
    control,
    handleSubmit,
    formState: { errors, submitCount },
    setValue,
  } = useForm<IRegisterForm>({
    mode: 'onBlur',
    resolver: yupResolver(registerValidationSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      phone: '',
      email: '',
      password: '',
    },
  });
  useEffect(() => {
    Tts.speak(
      'Welcome to the registration screen. Please enter your first name.',
    );
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechEnd = onSpeechEnd;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechResults = (e: any) => {
    const result = e.value[0];

    const currentField:
      | 'password'
      | 'first_name'
      | 'last_name'
      | 'phone'
      | 'email' = fields[fieldIndex];
    setValue(currentField, result);
    if (fieldIndex < fields.length - 1) {
      setFieldIndex(fieldIndex + 1);
      const nextField = fields[fieldIndex + 1];
      Tts.speak(`Please enter your ${nextField.replace('_', ' ')}`);
    } else {
      Tts.speak(
        'All fields are filled. Please say "Register" to submit the form.',
      );
    }
  };

  useEffect(() => {
    if (registerStates.isSuccess && registerStates.data.status) {
      navigation.navigate('Login');
      AccessibilityInfo.announceForAccessibility(
        'Registration successful, navigating to login screen',
      );
    }
  }, [registerStates.isSuccess]);

  const onSpeechEnd = () => {
    if (fieldIndex >= fields.length) {
      handleSubmit(onSubmit)();
    }
  };

  const handleVoiceInput = async () => {
    try {
      await Voice.start('en-US');
    } catch (e) {
      console.error(e);
    }
  };

  const onSubmit = (data: IRegisterForm) => {
    if (registerStates.isLoading) return;
    const payload = {
      first_name: data.first_name,
      last_name: data.last_name,
      phone: data.phone,
      email: data.email,
      password: data.password,
    };
    register(payload)
      .unwrap()
      .then((e) => {
        if (e.status) {
          setAuthUser(e);
          openToast({
            message: e?.message,
            type: 'Success',
          });
          Tts.speak('Registration successful');
          AccessibilityInfo.announceForAccessibility('Registration successful');
        } else {
          openToast({
            message: e.message,
            type: 'Failed',
          });

          AccessibilityInfo.announceForAccessibility(
            'Registration failed: ' + e.message,
          );
        }
      })
      .catch((e) => {
        openToast({
          message: e.data?.data?.message ?? 'An error occurred',
          type: 'Failed',
        });
        AccessibilityInfo.announceForAccessibility(
          'Registration failed: ' + e.message,
        );
      });
  };

  return (
    <LayoutView>
      <SafeAreaView accessible={true}>
        <View
          style={styles.container}
          accessible={true}
          accessibilityLabel='Register Screen'
        >
          <HeaderText
            accessible={true}
            accessibilityRole='header'
            accessibilityLabel='Register'
            accessibilityHint='Heading for the registration screen'
          >
            Register
          </HeaderText>
          <View
            style={styles.content}
            accessible={true}
            accessibilityLabel='Registration Form'
          >
            <TextInput
              control={control}
              name='first_name'
              label='First Name'
              placeholder='Enter your first name'
              error={errors.first_name?.message}
              accessible={true}
              accessibilityLabel='First name input'
              accessibilityHint='Enter your first name'
            />
            <TextInput
              control={control}
              name='last_name'
              label='Last Name'
              placeholder='Enter your last name'
              error={errors.last_name?.message}
              accessible={true}
              accessibilityLabel='Last name input'
              accessibilityHint='Enter your last name'
            />
            <TextInput
              control={control}
              name='phone'
              label='Phone'
              placeholder='Enter your phone number'
              error={errors.phone?.message}
              accessible={true}
              accessibilityLabel='Phone number input'
              accessibilityHint='Enter your phone number'
            />
            <TextInput
              control={control}
              name='email'
              label='Email'
              placeholder='Enter your email'
              error={errors.email?.message}
              accessible={true}
              accessibilityLabel='Email input'
              accessibilityHint='Enter your email'
            />
            <TextInput
              control={control}
              name='password'
              label='Password'
              placeholder='Enter your password'
              error={errors.password?.message}
              secureTextEntry={true}
              accessible={true}
              accessibilityLabel='Password input'
              accessibilityHint='Enter your password'
            />
            <Button
              onPress={handleSubmit(onSubmit)}
              title='Register'
              accessible={true}
              accessibilityRole='button'
              accessibilityLabel='Register button'
              accessibilityHint='Tap to register'
            />
            <Button
              title='Use Voice Input'
              onPress={handleVoiceInput}
              accessible={true}
              accessibilityRole='button'
              accessibilityLabel='Use Voice Input button'
              accessibilityHint='Tap to start voice input'
            />
            <ButtonLink
              onPress={() => navigation.navigate('Login')}
              title='Already have an account? Login'
              accessible={true}
              accessibilityRole='link'
              accessibilityLabel='Login link'
              accessibilityHint='Tap to go to the login screen'
            />
          </View>
        </View>
      </SafeAreaView>
    </LayoutView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    backgroundColor: lightTheme.background,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
  },
  content: {
    marginTop: 40,
    gap: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
