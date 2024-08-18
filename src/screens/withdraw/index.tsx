import { AddButton, Button, HeaderText, LayoutView, View } from '@components';
import { ListView, WithdrawListView } from '@components/ListCard';
import { lightTheme } from '@constants/Colors';
import { RootStackScreenProps } from '@utils/types';

import { StyleSheet, ScrollView } from 'react-native';
import Voice from '@react-native-voice/voice';
import Tts from 'react-native-tts';
import { useEffect } from 'react';
import { useGetWithdrawsQuery } from '@redux';
import { WithdrawInterface } from '@types';

const ListViewWithdraw = (
  withdraw: WithdrawInterface & {
    count: number;
    accessible: boolean;
    accessibilityLabel: string;
    accessibilityHint: string;
  },
) => {
  return <WithdrawListView {...withdraw} />;
};

export default function IncomeScreen({
  navigation,
}: RootStackScreenProps<'Withdraw'>) {
  const {
    data: withdraws,
    isLoading,
    isError,
    error,
  } = useGetWithdrawsQuery(undefined);
  useEffect(() => {
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechEnd = onSpeechEnd;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechResults = (e: any) => {
    const result = e.value[0].toLowerCase();
    if (result.includes('add Withdraw')) {
      handleWithdraw();
    }
  };
  const onSpeechEnd = () => {
    Tts.speak('Command recognized');
  };

  const handleWithdraw = () => {
    Tts.speak('Navigating to add Withdraw');
    navigation.navigate('NewWithdraw');
  };

  const handleVoiceCommand = async () => {
    try {
      await Voice.start('en-US');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <LayoutView backbtn={true}>
      <View style={styles.container}>
        <View style={styles.headerContent}>
          <HeaderText
            accessible={true}
            style={{ fontWeight: '600' }}
            accessibilityLabel='Withdraws'
            accessibilityRole='text'
            accessibilityHint='List of Withdraws'
          >
            WithDraws
          </HeaderText>
          <AddButton
            title='Add'
            onPress={() => navigation.navigate('NewWithdraw')}
            accessible={true}
            accessibilityRole='button'
            accessibilityLabel='Add Withdraw'
            accessibilityHint='Navigate to add Withdraw'
          />
        </View>
        <View>
          <ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={false}
          >
            {withdraws?.data &&
              withdraws.data.map((withdraw, index) => (
                <ListViewWithdraw
                  key={index}
                  {...withdraw}
                  count={index + 1}
                  accessible={true}
                  accessibilityLabel={withdraw.amount}
                  accessibilityHint='Withdraw amount'
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
