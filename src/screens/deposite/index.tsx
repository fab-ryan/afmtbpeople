import {
  AddButton,
  Button,
  HeaderText,
  LayoutView,
  View,
  Text,
} from '@components';
import { DepositListView } from '@components/ListCard';
import { lightTheme } from '@constants/Colors';
import { RootStackScreenProps } from '@utils/types';

import { StyleSheet, ScrollView, Pressable } from 'react-native';

import { useGetDepositsQuery } from '@redux';
import Voice from '@react-native-voice/voice';
import Tts from 'react-native-tts';
import { useEffect } from 'react';
import { DepositInterface } from '@types';

const ListViewDeposit = (
  deposit: DepositInterface & {
    accessible: boolean;
    accessibilityLabel: string;
    accessibilityHint: string;
    count: number;
  },
) => {
  return (
    <DepositListView
      {...deposit}
      accessible={deposit.accessible}
      accessibilityLabel={deposit.accessibilityLabel}
      accessibilityHint={deposit.accessibilityHint}
      count={deposit.count}
    />
  );
};
export default function DepositScreen({
  navigation,
}: RootStackScreenProps<'Deposit'>) {
  const { data, error, isLoading } = useGetDepositsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechEnd = onSpeechEnd;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechResults = (e: any) => {
    const result = e.value[0].toLowerCase();
    if (result.includes('add Deposit')) {
      handleAddDeposite();
    }
  };

  const onSpeechEnd = () => {
    Tts.speak('Command recognized');
  };

  const handleAddDeposite = () => {
    Tts.speak('Navigating to add Deposit');
    navigation.navigate('NewDeposit');
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
          >
            Deposits
          </HeaderText>
          <AddButton
            title='Add'
            onPress={() => navigation.navigate('NewDeposit')}
            accessible={true}
            accessibilityRole='button'
            accessibilityLabel='Add Deposit'
            accessibilityHint='Tap to add a new deposit'
          />
        </View>
        <View>
          <View style={styles.content}>
            <ScrollView>
              {!isLoading && data?.data && data?.data?.length > 0 ? (
                data?.data?.map((deposit, index) => (
                  <ListViewDeposit
                    key={index}
                    {...deposit}
                    accessible={true}
                    accessibilityLabel={`Deposit ${index + 1}`}
                    accessibilityHint='Tap to view deposit details'
                    count={index + 1}
                  />
                ))
              ) : (
                <Text>No data</Text>
              )}
            </ScrollView>
          </View>

          <Pressable
            onPress={handleVoiceCommand}
            accessible={true}
            accessibilityRole='button'
            accessibilityLabel='Voice command for adding income'
            accessibilityHint='Tap to start voice command for adding income'
            style={styles.speakButton}
          >
            <Text>Voice Command</Text>
          </Pressable>
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
  speakButton: {
    marginTop: 20,
  },
});
