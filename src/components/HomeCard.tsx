import { Text, StyleSheet ,Pressable} from 'react-native';
import { ArrowRightIcon, View } from './Themed';
import { RootTabParamList } from '@utils/types';
import { lightTheme } from '@constants/Colors';
import { useNavigation } from '@react-navigation/native';
import Tts from 'react-native-tts';
import Voice from '@react-native-voice/voice';
import { useEffect } from 'react';

interface IHomeCardProps {
  icon: React.ReactNode;
  title: string;
  counts: number;
  navigateTo: string;
}

const HomeCard = ({ title, counts, navigateTo, icon }: IHomeCardProps) => {
  const navigation = useNavigation();

  useEffect(() => {
    Tts.speak(`You are on ${title} card. Tap to navigate.`);
  }, [title]);

  const handleNavigation = () => {
    Tts.speak(`Navigating to ${title}`);
    navigation.navigate(navigateTo as never);
  };
 
  const onSpeechResults = (e:any) => {
    const result = e.value[0].toLowerCase();
    if (result.includes('navigate to')) {
      const navigateToCommand = result.replace('navigate to ', '');
      if (navigateToCommand === title.toLowerCase()) {
        handleNavigation();
      } else {
        Tts.speak('Sorry, I could not find the destination.');
      }
    }
  };
  useEffect(() => {
    Voice.onSpeechResults = onSpeechResults;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const handleVoiceCommand = async () => {
    try {
      await Voice.start('en-US');
    } catch (e) {
      console.error(e);
    }
  };

  const handlePress = () => {
    Tts.speak(`you have ${counts} ${title}`);
  };

  return (
    <View style={styles.container} accessible={true} accessibilityLabel={`${title} card`} accessibilityHint="Tap to navigate">
      <Pressable onPress={handlePress}>
      <View style={styles.header}>
        <Text style={styles.text}>{title}</Text>
        <Text style={styles.text}>{counts}</Text>
      </View>
      </Pressable>

      <View style={styles.content}>
        {icon}
        <Pressable onPress={handleNavigation} accessible={true} accessibilityRole="button" accessibilityLabel={`Navigate to ${title}`} accessibilityHint="Tap to navigate">
          <ArrowRightIcon color='' />
        </Pressable>
      </View>
      <Pressable onPress={handleVoiceCommand} accessible={true} accessibilityRole="button" accessibilityLabel="Voice Command" accessibilityHint="Tap to start voice command">
        <Text style={styles.voiceCommandText}>Voice Command</Text>
      </Pressable>
    </View>
  );
};

export default HomeCard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 25,
    backgroundColor: lightTheme.primary,
    borderRadius: 15,
    marginBottom: 20,
  },

  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
  },

  textLink: {
    color: lightTheme.secondary,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '400',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  content: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  voiceCommandText: {
    color: '#007AFF',
    marginTop: 10,
  },
});
