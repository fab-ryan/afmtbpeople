import {
  HeaderText,
  LayoutView,
  Text,
  View,
  TextInput,
  Button,
  Select,
} from '@components';

import { lightTheme } from '@constants/Colors';
import { SafeAreaView, StyleSheet } from 'react-native';

import { depositValidationSchema } from '@utils';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RootStackScreenProps } from '@utils/types';
import { useCreateDepositMutation } from '@redux';
import { useEffect, useState } from 'react';
import { useActions } from '@hooks';
import Voice from '@react-native-voice/voice';
import Tts from 'react-native-tts';

type InewDeposite = {
  amount: string;
  description: string;
  source: string;
};

interface ICategory {
  label: string;
  value: string;
}
export default function AddNewExpense({
  navigation,
}: RootStackScreenProps<'NewDeposit'>) {
  const [createDeposit, { data, error, isLoading }] =
    useCreateDepositMutation();

  const { openToast } = useActions();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<InewDeposite>({
    mode: 'onBlur',
    resolver: yupResolver(depositValidationSchema),
    defaultValues: {
      amount: '',
      description: '',
      source: '',
    },
  });

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
    if (result.startsWith('amount')) {
      const amount = result.split('amount')[1].trim();
      setValue('amount', amount);
      Tts.speak(`Amount set to ${amount}`);
    } else if (result.startsWith('description')) {
      const description = result.split('description')[1].trim();
      setValue('description', description);
      Tts.speak(`Description set to ${description}`);
    } else if (result.startsWith('source')) {
      const source = result.split('source')[1].trim();
      setValue('source', source);
      Tts.speak(`Source set to ${source}`);
    }
  };

  const readFormLabels = () => {
    Tts.speak('New Deposit. Please enter source, amount, and description');
  };

  const onSpeechEnd = async () => {
    try {
      Tts.speak(
        'All fields are filled. Please say "Submit" to create the deposit.',
      );
      await Voice.start('en-US');
    } catch (e) {
      console.error(e);
    }
  };

  const onSubmit = (data: InewDeposite) => {
    if (isLoading) return;
    createDeposit({
      amount: parseFloat(data.amount),
      description: data.description,
      source: data.source,
    })
      .unwrap()
      .then((res) => {
        if (res.status) {
          openToast({
            message: res?.message,
            type: 'Success',
          });
          navigation.navigate('Deposit');
          Tts.speak('Deposit created successfully');
        } else {
          openToast({
            message: res?.message,
            type: 'Failed',
          });
        }
      })
      .catch((e) => {
        console.log(e);
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
            New Deposit
          </HeaderText>
        </View>

        <View>
          <View style={styles.content}>
            <TextInput
              label='Source'
              placeholder='Enter source'
              control={control}
              name='source'
              error={errors.source?.message}
            />
            <TextInput
              label='Amount'
              placeholder='Enter amount'
              control={control}
              name='amount'
              error={errors.amount?.message}
              keyboardType='numeric'
            />
            <TextInput
              label='Description'
              placeholder='Enter description'
              control={control}
              name='description'
              error={errors.description?.message}
              multiline={true}
              numberOfLines={4}
              style={{ height: 100 }}
            />

            <Button
              title='Submit'
              onPress={handleSubmit(onSubmit)}
              disabled={isLoading}
              accessible={true}
              accessibilityLabel='Submit button'
              accessibilityRole='button'
              accessibilityHint='Tap to submit the deposit'
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
  content: {
    height: '100%',
    marginTop: 20,
    gap: 10,
    padding: 5,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
});
