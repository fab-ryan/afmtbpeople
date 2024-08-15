import { Button, HeaderText, LayoutView, View } from '@components';
import { lightTheme } from '@constants/Colors';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  FlatList,
  AccessibilityInfo,
} from 'react-native';
import { dummyData } from '@utils';
import HomeCard from '@components/HomeCard';
import { useGetStatisticsQuery } from '@redux';
import Voice from '@react-native-voice/voice';
import Tts from 'react-native-tts';
import { useEffect, useState } from 'react';

export default function Home() {
  const { data, error } = useGetStatisticsQuery(null);

  const [voiceCommand, setVoiceCommand] = useState('');

  useEffect(() => {
    Tts.speak('Welcome to the home screen.');
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechEnd = onSpeechEnd;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechResults = (e:any) => {
    const result = e.value[0].toLowerCase();
    setVoiceCommand(result);
  };


  const onSpeechEnd = () => {
    if (voiceCommand.includes('navigate to')) {
      const navigateTo = voiceCommand.replace('navigate to ', '');
      const item = dummyData.find(d => d.title.toLowerCase() === navigateTo);
      if (item) {
        Tts.speak(`Navigating to ${item.title}`);
        // Add your navigation logic here
      } else {
        Tts.speak('Sorry, I could not find the destination.');
      }
    }
  };

  const handleVoiceCommand = async () => {
    try {
      await Voice.start('en-US');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <LayoutView>
      <View style={styles.container}>
        <HeaderText
          accessible={true}
          accessibilityRole='header'
          accessibilityValue={{
            text: 'Welcome',
            now: 1,
          }}
          accessibilityHint='Welcome'
        >
          Welcome{' '}
        </HeaderText>
        <View>
          <View style={styles.content}>
            <FlatList
              data={dummyData}
              keyExtractor={(item) => item.id.toString()}
              style={styles.flatListContainer}
              renderItem={({ item }) => (
                <HomeCard
                  title={item.title}
                  counts={item.counts}
                  navigateTo={item.navigateTo}
                  icon={item.icon}
                />
              )}
            />
          </View>
        </View>
        <Button
          title="Use Voice Command"
          onPress={handleVoiceCommand}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Use Voice Command button"
          accessibilityHint="Tap to start voice input"
        />
      </View>
    </LayoutView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    backgroundColor: lightTheme.background,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  content: {
    height: '100%',
    marginTop: 20,
    gap: 20,
  },
  flatListContainer: {
    width: '100%',
    marginBottom: 20,
    gap: 20,
    height: '100%',
  },
});
