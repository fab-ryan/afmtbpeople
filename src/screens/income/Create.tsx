import {
  HeaderText,
  LayoutView,
  Text,
  View,
  TextInput,
  Button,
} from '@components';
import { lightTheme } from '@constants/Colors';
import { SafeAreaView, StyleSheet } from 'react-native';
import { incomeValidationSchema } from '@utils';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RootStackScreenProps } from '@utils/types';

type INewIncome = {
  title: string;
  amount: number;
  date: Date;
  description: string;
};
export default function AddNewIncome({
  navigation,
}: RootStackScreenProps<'NewIncome'>) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<INewIncome>({
    mode: 'onBlur',
    resolver: yupResolver(incomeValidationSchema),
    defaultValues: {
      amount: 0,
      date: new Date(),
      description: '',
      title: '',
    },
  });
  const onSubmit = (data: INewIncome) => {
    console.log(data);
    navigation.navigate('Income');
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
              label='Date'
              placeholder='Enter date'
              control={control}
              name='date'
              error={errors.date?.message}
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
              title='SAVE'
              onPress={handleSubmit(onSubmit)}
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
