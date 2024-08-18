import {
  AddButton,
  Button,
  HeaderText,
  LayoutView,
  View,
  Text,
} from '@components';
import { ListView } from '@components/ListCard';
import { lightTheme } from '@constants/Colors';
import { RootStackScreenProps } from '@utils/types';

import {
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import { useGetIncomesQuery } from '@redux';
import { IncomeInterface } from '@types';
import { useEffect } from 'react';

import Voice from '@react-native-voice/voice';
import Tts from 'react-native-tts';

const ListViewIncome = (
  income: IncomeInterface & {
    count: number;
    accessible: boolean;
    accessibilityLabel: string;
    accessibilityHint: string;
  },
) => {
  return <ListView {...income} />;
};
export default function IncomeScreen({
  navigation,
}: RootStackScreenProps<'Income'>) {
  const { data, error, isLoading } = useGetIncomesQuery(null);

  useEffect(() => {
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechEnd = onSpeechEnd;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechResults = (e: any) => {
    const result = e.value[0].toLowerCase();
    if (result.includes('add income')) {
      handleAddIncome();
    }
  };

  const onSpeechEnd = () => {
    Tts.speak('Command recognized');
  };

  const handleAddIncome = () => {
    Tts.speak('Navigating to add income');
    navigation.navigate('NewIncome');
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
            accessibilityRole='header'
            accessibilityLabel='Incomes'
            accessibilityHint='Heading for the incomes screen'
          >
            Incomes
          </HeaderText>
          <AddButton
            title='Add'
            onPress={handleAddIncome}
            accessible={true}
            accessibilityRole='button'
            accessibilityLabel='Add Income'
            accessibilityHint='Tap to add a new income'
          />
        </View>
        <View>
          <ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={false}
            accessible={true}
            accessibilityLabel='Income list'
            accessibilityHint='Scroll to view incomes'
          >
            {!isLoading &&
              data &&
              data?.data?.incomes.map((income, index) => (
                <ListViewIncome
                  key={income.id}
                  count={index + 1}
                  {...income}
                  accessible={true}
                  accessibilityLabel={`Income ${index + 1}`}
                  accessibilityHint={`Details for income ${index + 1}`}
                />
              ))}
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
  speakButton:{
marginTop:20
  }
});
