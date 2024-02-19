import { SafeAreaView, StyleSheet } from 'react-native';
import { LayoutView, View, Text, HeaderText, TextInput } from '@components';
import { lightTheme } from '@constants/Colors';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginValidationSchema } from '@utils';

type ILoginForm = {
  email: string;
  password: string;
};
export default function LoginScreen() {
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

  return (
    <LayoutView>
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
  },

  content: {
    marginTop: 10,
    gap: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
