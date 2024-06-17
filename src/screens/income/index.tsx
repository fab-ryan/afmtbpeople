import { AddButton, Button, HeaderText, LayoutView, View } from '@components';
import { ListView } from '@components/ListCard';
import { lightTheme } from '@constants/Colors';
import { RootStackScreenProps } from '@utils/types';

import { StyleSheet, ScrollView } from 'react-native';
import { useGetIncomesQuery } from '@redux';
import { IncomeInterface } from '@types';

const ListViewIncome = (income: IncomeInterface & { count: number }) => {
  return <ListView {...income} />;
};
export default function IncomeScreen({
  navigation,
}: RootStackScreenProps<'Income'>) {
  const { data, error, isLoading } = useGetIncomesQuery(null);
  return (
    <LayoutView backbtn={true}>
      <View style={styles.container}>
        <View style={styles.headerContent}>
          <HeaderText
            accessible={true}
            style={{ fontWeight: '600' }}
          >
            Incomes
          </HeaderText>
          <AddButton
            title='Add'
            onPress={() => navigation.navigate('NewIncome')}
          />
        </View>
        <View>
          <ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={false}
          >
            {!isLoading &&
              data &&
              data?.data?.incomes.map((income, index) => (
                <ListViewIncome
                  key={income.id}
                  count={index + 1}
                  {...income}
                />
              ))}
          </ScrollView>
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
