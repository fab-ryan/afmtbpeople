import {
  HeaderText,
  LayoutView,
  Text,
  View,
  TextInput,
  Button,
} from '@components';
import { lightTheme } from '@constants/Colors';
import { SafeAreaView, StyleSheet,AccessibilityInfo } from 'react-native';
import { incomeValidationSchema } from '@utils';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RootStackScreenProps } from '@utils/types';
import { useCreateIncomeMutation } from '@redux';
import { useActions } from '@hooks';

import Voice from '@react-native-voice/voice';
import Tts from 'react-native-tts';
import { useEffect } from 'react';

type INewIncome = {
  title: string;
  amount: string;
  description: string;
};
export default function AddNewIncome({
  navigation,
}: RootStackScreenProps<'NewIncome'>) {
  const [createIncome, createIncomeStates] = useCreateIncomeMutation();
  const { openToast } = useActions();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<INewIncome>({
    mode: 'onBlur',
    resolver: yupResolver(incomeValidationSchema),
    defaultValues: {
      amount: '0',
      description: '',
      title: '',
    },
  });

  useEffect(() => {
    // Initialize voice recognition
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechEnd = onSpeechEnd;
    // startVoiceRecognition();

    // Read form field labels when component mounts
    readFormLabels();

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);
  
  const onSpeechResults = (e:any) => {
    const result = e.value[0].toLowerCase();
    // Handle voice input for form fields
    if (result.startsWith('title')) {
      const title = result.replace('title', '').trim();
      setValue('title', title);
    } else if (result.startsWith('amount')) {
      const amount = result.replace('amount', '').trim();
      setValue('amount', amount);
    } else if (result.startsWith('description')) {
      const description = result.replace('description', '').trim();
      setValue('description', description);
    }
  };

  const readFormLabels = () => {
    Tts.speak('New Incomes. Please enter title, amount, and description.');
  };

  const onSpeechEnd = () => {
    // Optionally, you can restart voice recognition here if needed
    startVoiceRecognition();
  };

  const startVoiceRecognition = async () => {
    try {
      await Voice.start('en-US');
    } catch (e) {
      console.error(e);
    }
  };

  const onSubmit = (data: INewIncome) => {
    if (createIncomeStates.isLoading) return;
    const payload = {
      source: data.title,
      amount: data.amount.toString(),
      description: data.description,
    };
    createIncome(payload)
      .unwrap()
      .then((value) => {
        if (value.status) {
          openToast({
            message: value?.message,
            type: 'Success',
          });
          navigation.goBack();
        }
      })
      .catch((err) => {
        openToast({
          message: err.data?.message || 'An error occurred',
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
            New Incomes
          </HeaderText>
        </View>

        <View>
          <View style={styles.content}>
            <TextInput
              label='Title'
              placeholder='Enter title'
              control={control}
              name='title'
              error={errors.title?.message}
              accessible={true}
              accessibilityLabel='Title input'
              accessibilityHint='Enter the title of the income'
            />
            <TextInput
              label='Amount'
              placeholder='Enter amount'
              control={control}
              name='amount'
              error={errors.amount?.message}
              keyboardType='numeric'
              accessible={true}
              accessibilityLabel='Amount input'
              accessibilityHint='Enter the amount of the income'
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
              accessible={true}
              accessibilityLabel='Description input'
              accessibilityHint='Enter the description of the income'
            />
            <Button
              title='SAVE'
              onPress={handleSubmit(onSubmit)}
              disabled={createIncomeStates.isLoading}
              accessible={true}
              accessibilityRole='button'
              accessibilityLabel='Save button'
              accessibilityHint='Tap to save the income'
              
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
