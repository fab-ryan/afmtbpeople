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
import { registerValidationSchema } from '@utils';
import React, { useEffect } from 'react';
import { RootStackScreenProps } from '@utils/types';
import { useActions } from '@hooks';
import { useRegisterMutation } from '@redux';

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

  const {
    control,
    handleSubmit,
    formState: { errors, submitCount },
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
    if (registerStates.isSuccess && registerStates.data.status) {
      navigation.navigate('Login');
    }
  }, [registerStates.isSuccess]);

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
    <LayoutView>
      <SafeAreaView>
        <View style={styles.container}>
          <HeaderText>Register</HeaderText>
          <View style={styles.content}>
            <TextInput
              control={control}
              name='first_name'
              label='First Name'
              placeholder='First Name'
              error={errors.first_name?.message}
            />
            <TextInput
              control={control}
              name='last_name'
              label='Last Name'
              placeholder='Last Name'
              error={errors.last_name?.message}
            />
            <TextInput
              control={control}
              name='phone'
              label='Phone'
              placeholder='Phone'
              error={errors.phone?.message}
            />
            <TextInput
              control={control}
              name='email'
              label='Email'
              placeholder='Email'
              error={errors.email?.message}
            />
            <TextInput
              control={control}
              name='password'
              label='Password'
              placeholder='Password'
              error={errors.password?.message}
              secureTextEntry
            />
            <Button
              onPress={handleSubmit(onSubmit)}
              title='Register'
            />
            <ButtonLink
              onPress={() => navigation.navigate('Login')}
              title='Already have an account? Login'
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
