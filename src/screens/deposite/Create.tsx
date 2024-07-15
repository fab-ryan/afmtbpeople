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
import { useGetCategoriesQuery } from '@redux';
import { useEffect, useState } from 'react';

type INewExpense = {
  amount: string;
  description: string;
  category_id: string;
};

interface ICategory {
  label: string;
  value: string;
}
export default function AddNewExpense({
  navigation,
}: RootStackScreenProps<'NewDeposit'>) {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const { data, error, isLoading } = useGetCategoriesQuery(undefined);

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
    formState: { errors },
  } = useForm<INewExpense>({
    mode: 'onBlur',
    resolver: yupResolver(expenseValidationSchema),
    defaultValues: {
      amount: '',
      description: '',
      category_id: '',
      title: '',
    },
  });
  const onSubmit = (data: INewExpense) => {
    // navigation.navigate('Deposit');
    console.log(data);
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
            {/* <TextInput
              label='Title'
              placeholder='Enter title'
              control={control}
              name='title'
              error={errors.title?.message}
            /> */}
            <View>
              <Select
                label='Category'
                options={categories}
                onSelect={(option) => setValue('category_id', option?.value as string)}
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
