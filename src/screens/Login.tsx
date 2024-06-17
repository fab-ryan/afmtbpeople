import { SafeAreaView, StyleSheet } from 'react-native';
import {
  LayoutView,
  View,
  Text,
  HeaderText,
  TextInput,
  Button,
  ButtonLink,
} from '@components';
import { lightTheme } from '@constants/Colors';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginValidationSchema } from '@utils';
import React, { useEffect } from 'react';
import { StackScreenProps } from '@utils/types';
import { useLoginMutation } from '@redux';
import { useActions } from '@hooks';
import { useNavigation } from '@react-navigation/native';

type ILoginForm = {
  username: string;
  password: string;
};
export default function LoginScreen() {
  const { openToast, setAuthUser } = useActions();
  const navigation = useNavigation<StackScreenProps>();
  const [login, loginStates] = useLoginMutation();

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
    if (loginStates.isSuccess && loginStates.data.status) {
      navigation.navigate('Root', {
        screen: 'Home',
      });
    }
  }, [loginStates.isSuccess]);

  // navigation.navigate('Root');
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
        } else {
          openToast({
            message: e.message,
            type: 'Failed',
          });
        }
      })

      .catch((e) => {
        openToast({
          message: e.data?.message ?? e.message,
          type: 'Failed',
        });
      });
  };

  return (
    <LayoutView backbtn={false}>
      <SafeAreaView>
        <View style={styles.container}>
          <HeaderText
            accessible={true}
            accessibilityRole='header'
            accessibilityValue={{
              text: 'User Login',
              now: 1,
            }}
            accessibilityHint='User Login'
          >
            User Login
          </HeaderText>
          <View>
            <View style={styles.content}>
              <TextInput
                label='Email'
                placeholder='Enter your username'
                control={control}
                name='username'
                error={errors.username?.message}
              />
              <TextInput
                label='Password'
                placeholder='Enter your password'
                secureTextEntry={true}
                control={control}
                name='password'
                error={errors.password?.message}
              />

              <Button
                title='LOGIN'
                onPress={handleSubmit(onSubmit)}
                disabled={loginStates.isLoading}
              />
              <View style={styles.or}>
                <Text>Don’t have an account yet? </Text>
                <ButtonLink
                  title='Sign Up'
                  onPress={() => {
                    navigation.navigate('Register');
                  }}
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
