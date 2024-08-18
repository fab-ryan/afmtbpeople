import {
  AddButton,
  Button,
  HeaderText,
  LayoutView,
  View,
  Loader,
} from '@components';
import { ExpenseListView, ListView } from '@components/ListCard';
import { lightTheme } from '@constants/Colors';
import { RootStackScreenProps } from '@utils/types';

import { StyleSheet, ScrollView } from 'react-native';

import { useGetExpensesQuery } from '@redux';
import { ExpenseInterface } from '@types';

const ListViewIncome = (expense: ExpenseInterface & { count: number }) => {
  return <ExpenseListView {...expense} />;
};

export default function ExpenseScreen({
  navigation,
}: RootStackScreenProps<'Expense'>) {
  const { data, error, isLoading } = useGetExpensesQuery(undefined,{
    refetchOnMountOrArgChange: true,
  });
  
  return (
    <LayoutView backbtn={true}>
      <View style={styles.container}>
        <View style={styles.headerContent}>
          <HeaderText
            accessible={true}
            style={{ fontWeight: '600' }}
          >
            Expenses
          </HeaderText>
          <AddButton
            title='Add'
            onPress={() => navigation.navigate('NewExpense')}
          />
        </View>
        <View>
          <View style={styles.content}>
            <ScrollView
              style={{
                height: '100%',
                marginTop: 20,
                gap: 10,
                padding: 5,
              }}
            >
              {!isLoading &&
                data &&
                data?.data?.map((expense, index) => (
                  <ListViewIncome
                    key={expense.id}
                    count={index + 1}
                    {...expense}
                  />
                ))}
              {/* {isLoading && <Loader loading={isLoading} />} */}
              {!isLoading && data?.data && data?.data?.length === 0 && (
                <View
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 20,
                  }}
                >
                  <HeaderText
                    style={{
                      textAlign: 'center',
                      marginTop: 20,
                      fontSize: 20,
                      color: lightTheme.secondary,
                    }}
                  >
                    No expenses yet
                  </HeaderText>
                </View>
              )}
            </ScrollView>
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
  },
});
