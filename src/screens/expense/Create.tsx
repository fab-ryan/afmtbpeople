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

import { expenseValidationSchema } from '@utils';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RootStackScreenProps } from '@utils/types';

type INewExpense = {
  amount: string;
  description: string;
  category_id: string;
};
export default function AddNewExpense({
  navigation,
}: RootStackScreenProps<'NewExpense'>) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<INewExpense>({
    mode: 'onBlur',
    resolver: yupResolver(expenseValidationSchema),
    defaultValues: {
      amount: '0',
      description: '',
      category_id: '',
    },
  });
  const onSubmit = (data: INewExpense) => {
    console.log(data);
    navigation.navigate('Expense');
  };
  return (
    <LayoutView backbtn={true}>
      <View style={styles.container}>
        <View style={styles.headerContent}>
          <HeaderText
            accessible={true}
            style={{ fontWeight: '600' }}
          >
            New Expenses
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
            <TextInput
              label='Category'
              placeholder='Enter category'
              control={control}
              name='category_id'
              error={errors.category_id?.message}
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
