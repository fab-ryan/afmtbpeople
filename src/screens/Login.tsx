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
import React from 'react';
import { RootStackScreenProps } from '@utils/types';

type ILoginForm = {
  email: string;
  password: string;
};
export default function LoginScreen({
  navigation,
}: RootStackScreenProps<'Login'>) {
  const {
    control,
    handleSubmit,
    formState: { errors, submitCount },
  } = useForm<ILoginForm>({
    mode: 'onBlur',
    resolver: yupResolver(loginValidationSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: ILoginForm) => {
    navigation.navigate('Root');
  };

  return (
    <LayoutView backbtn={false}>
      <SafeAreaView>
        <View style={styles.container}>
          <HeaderText accessible={true}>User Login</HeaderText>
          <View>
            <View style={styles.content}>
              <TextInput
                label='Email'
                placeholder='Enter your email'
                control={control}
                name='email'
                error={errors.email?.message}
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
              />
              <View style={styles.or}>
                <Text>Don’t have an account yet? </Text>
                <ButtonLink
                  title='Sign Up'
                  onPress={() => {
                    console.log('Register');
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
