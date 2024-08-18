import {
  HeaderText,
  LayoutView,
  View,
  TextInput,
  Button,
} from '@components';
import { lightTheme } from '@constants/Colors';
import { SafeAreaView, StyleSheet } from 'react-native';
import { withdrawalValidationSchema } from '@utils';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RootStackScreenProps } from '@utils/types';
import { useActions } from '@hooks';

import Voice from '@react-native-voice/voice';
import Tts from 'react-native-tts';
import { useEffect } from 'react';
import { useCreateWithdrawMutation } from '@redux';

type INewWithdraw = {
  amount: string;
};
export default function AddNewIncome({
  navigation,
}: RootStackScreenProps<'NewWithdraw'>) {
  const { openToast } = useActions();
  const [createWithdraw, { isLoading, isError, error }] =
    useCreateWithdrawMutation();

  useEffect(() => {
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechEnd = onSpeechEnd;

    readFormLabels();

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechResults = (e: any) => {
    const result = e.value[0].toLowerCase();
    if (result.includes('amount')) {
      setValue('amount', result.split('amount')[1].trim());
    }
  };

  const readFormLabels = async () => {
    Tts.speak('Enter the amount for the new withdrawal');
  };

  const onSpeechEnd = async () => {
    try {
      Tts.speak(
        'All fields are filled. Please say "Submit" to create the withdraw.',
      );
      await Voice.start('en-US');
    } catch (e) {
      console.error(e);
    }
  };

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<INewWithdraw>({
    mode: 'onBlur',
    resolver: yupResolver(withdrawalValidationSchema),
    defaultValues: {
      amount: '',
    },
  });
  const onSubmit = (data: INewWithdraw) => {
    if (data.amount === '') {
      openToast({
        message: 'Amount is required',
        type: 'Failed',
      });
      Tts.speak('Amount is required');
      return;
    }
    if (isLoading) return;
    createWithdraw({
      amount: data.amount,
    })
      .unwrap()
      .then((res) => {
        if (res.status) {
          openToast({
            message: res.message,
            type: 'Success',
          });
          Tts.speak(res.message);
          navigation.navigate('Withdraw');
        }
      })
      .catch((err) => {
        openToast({
          message: 'Failed to create withdrawal',
          type: 'Failed',
        });
      });
  };
  return (
    <LayoutView backbtn={true}>
      <View style={styles.container}>
        <View style={styles.headerContent}>
          <HeaderText
            accessible={true}
            style={{ fontWeight: '600' }}
          >
            New Withdraw
          </HeaderText>
        </View>

        <View>
          <View style={styles.content}>
            <TextInput
              label='Amount'
              placeholder='Enter amount'
              control={control}
              name='amount'
              error={errors.amount?.message}
              keyboardType='numeric'
            />
            <Button
              title='Submit'
              onPress={handleSubmit(onSubmit)}
              accessible={true}
              accessibilityLabel='Save button'
              accessibilityRole='button'
              accessibilityHint='Tap to save the new withdrawal'
            />
          </View>
        </View>
      </View>
    </LayoutView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    backgroundColor: lightTheme.background,

    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    top: 0,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
