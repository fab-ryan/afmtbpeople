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

import { expenseValidationSchema } from '@utils';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RootStackScreenProps } from '@utils/types';
import { useEffect, useState } from 'react';
import { useGetCategoriesQuery, useCreateExpenseMutation } from '@redux';
import { useActions } from '@hooks';
interface ICategory {
  label: string;
  value: string;
}

type INewExpense = {
  amount: string;
  description: string;
  category_id: string;
};
export default function AddNewExpense({
  navigation,
}: RootStackScreenProps<'NewExpense'>) {
  const { openToast } = useActions();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const { data, error, isLoading } = useGetCategoriesQuery(undefined);
  const [createExpense, expenseStates] = useCreateExpenseMutation();

  useEffect(() => {
    if (data) {
      setCategories(
        data?.data?.map((category) => ({
          label: category.name,
          value: category.id,
        })),
      );
    }
  }, [data]);

  const {
    control,
    handleSubmit,
    setValue,
    setError,
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
    const payload = {
      amount: data.amount,
      comment: data.description,
      category_id: data.category_id,
    };
    createExpense(payload)
      .unwrap()
      .then((res) => {
        if (res.status) {
          openToast({
            message: res?.message,
            type: 'Success',
          });
          navigation.navigate('Expense');
        }
      })
      .catch((err) => {
        if (err.status === 400) {
          console.log(err.data);
        }
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
            New Expenses
          </HeaderText>
        </View>

        <View>
          <View style={styles.content}>
            <View>
              <Select
                label='Category'
                options={categories}
                onSelect={(option) =>
                  setValue('category_id', option?.value as string)
                }
              />
              {errors.category_id && (
                <Text style={{ color: 'red' }}>
                  {errors.category_id.message}
                </Text>
              )}
            </View>

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
