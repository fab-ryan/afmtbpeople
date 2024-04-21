import { AddButton, Button, HeaderText, LayoutView, View } from '@components';
import { ListView } from '@components/ListCard';
import { lightTheme } from '@constants/Colors';
import { RootStackScreenProps } from '@utils/types';

import { StyleSheet, ScrollView } from 'react-native';

export default function IncomeScreen({
  navigation,
}: RootStackScreenProps<'Withdraw'>) {
  return (
    <LayoutView backbtn={true}>
      <View style={styles.container}>
        <View style={styles.headerContent}>
          <HeaderText
            accessible={true}
            style={{ fontWeight: '600' }}
          >
            WithDraws
          </HeaderText>
          <AddButton
            title='Add'
            onPress={() => navigation.navigate('NewWithdraw')}
          />
        </View>
        <View>
          <ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={false}
          >
            <ListView />
            <ListView />
            <ListView />
            <ListView />
            <ListView />
            <ListView />
            <ListView />
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
