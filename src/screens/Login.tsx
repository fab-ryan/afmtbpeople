import { SafeAreaView, StyleSheet, AccessibilityInfo } from 'react-native';
import {
  LayoutView,
  View,
  Text,
  HeaderText,
  TextInput,
  Button,
  ButtonLink,
  Loader,
} from '@components';
import { lightTheme } from '@constants/Colors';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginValidationSchema } from '@utils';
import React, { useEffect, useState } from 'react';
import { StackScreenProps } from '@utils/types';
import { useLoginMutation } from '@redux';
import { useActions } from '@hooks';
import { useNavigation } from '@react-navigation/native';
import Voice from '@react-native-voice/voice';
import Tts from 'react-native-tts';

type ILoginForm = {
  username: string;
  password: string;
};

export default function LoginScreen() {
  const { openToast, setAuthUser } = useActions();
  const navigation = useNavigation<StackScreenProps>();
  const [login, loginStates] = useLoginMutation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const {
    control,
    handleSubmit,
    formState: { errors, submitCount },
  } = useForm<ILoginForm>({
    mode: 'onBlur',
    resolver: yupResolver(loginValidationSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  useEffect(() => {
    Tts.speak(
      'Welcome to the login screen. Please enter your username and password.',
    );
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechEnd = onSpeechEnd;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  useEffect(() => {
    if (loginStates.isSuccess && loginStates.data.status) {
      navigation.navigate('Root', {
        screen: 'Home',
      });
      AccessibilityInfo.announceForAccessibility(
        'Login successful, navigating to home screen',
      );
    }
  }, [loginStates.isSuccess]);

  // ts-engore
  const onSpeechResults = (e: any) => {
    const result = e.value[0];
    if (!username) {
      setUsername(result);
      Tts.speak('Username received. Please say your password.');
    } else if (!password) {
      setPassword(result);
      Tts.speak('Password received. Please say "Login" to proceed.');
    }
  };

  const onSpeechEnd = () => {
    if (username && password) {
      // handleLogin();
      console.log(username);
    }
  };

  const handleVoiceInput = async () => {
    try {
      await Voice.start('en-US');
    } catch (e) {
      console.error(e);
    }
  };

  const onSubmit = (data: ILoginForm) => {
    if (loginStates.isLoading) return;
    const payload = {
      username: data.username,
      password: data.password,
    };
    login(payload)
      .unwrap()
      .then((e) => {
        if (e.status) {
          setAuthUser(e);
          openToast({
            message: e.message,
            type: 'Success',
          });
          AccessibilityInfo.announceForAccessibility('Login successful');
        } else {
          openToast({
            message: e.message,
            type: 'Failed',
          });
          AccessibilityInfo.announceForAccessibility(
            'Login failed: ' + e.message,
          );
        }
      })
      .catch((e) => {
        openToast({
          message: e.data?.message ?? e.message,
          type: 'Failed',
        });
        AccessibilityInfo.announceForAccessibility(
          'Login failed: ' + e.message,
        );
      });
  };

  return (
    <LayoutView backbtn={false}>
      <SafeAreaView accessible={true}>
       
        <View
          style={styles.container}
          accessible={true}
          accessibilityLabel='Login Screen'
        >
          <HeaderText
            accessible={true}
            accessibilityRole='header'
            accessibilityLabel='User Login'
            accessibilityHint='Heading for the user login screen'
          >
            User Login
          </HeaderText>
          <View
            accessible={true}
            accessibilityLabel='Login Form'
          >
            <View
              style={styles.content}
              accessible={true}
            >
              <TextInput
                label='Email'
                placeholder='Enter your username'
                control={control}
                name='username'
                error={errors.username?.message}
                accessible={true}
                accessibilityLabel='Username input'
                accessibilityHint='Enter your username'
                value={username}
                onChangeText={setUsername}
              />
              <TextInput
                label='Password'
                placeholder='Enter your password'
                secureTextEntry={true}
                control={control}
                name='password'
                error={errors.password?.message}
                accessible={true}
                accessibilityLabel='Password input'
                accessibilityHint='Enter your password'
                value={password}
                onChangeText={setPassword}
              />
              <Button
                title='LOGIN'
                onPress={handleSubmit(onSubmit)}
                disabled={loginStates.isLoading}
                accessible={true}
                accessibilityRole='button'
                accessibilityLabel='Login button'
                accessibilityHint='Tap to log in'
              />
              <Button
                title='Use Voice Input'
                onPress={handleVoiceInput}
                accessible={true}
                accessibilityRole='button'
                accessibilityLabel='Use Voice Input button'
                accessibilityHint='Tap to start voice input'
              />
              <View
                style={styles.or}
                accessible={true}
                accessibilityRole='text'
              >
                <Text>Don’t have an account yet? </Text>
                <ButtonLink
                  title='Sign Up'
                  onPress={() => {
                    navigation.navigate('Register');
                  }}
                  accessible={true}
                  accessibilityRole='link'
                  accessibilityLabel='Sign up link'
                  accessibilityHint='Tap to sign up for a new account'
                />
              </View>
            </View>
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
  or: {
    marginTop: 20,
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
  },
});
