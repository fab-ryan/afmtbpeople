import { Text, StyleSheet ,Pressable} from 'react-native';
import { ArrowRightIcon, View } from './Themed';
import { RootTabParamList } from '@utils/types';
import { lightTheme } from '@constants/Colors';
import { useNavigation } from '@react-navigation/native';

interface IHomeCardProps {
  icon: React.ReactNode;
  title: string;
  counts: number;
  navigateTo: string;
}

const HomeCard = ({ title, counts, navigateTo, icon }: IHomeCardProps) => {
  const navigation = useNavigation();

  const handleNavigation = () => {
    console.log(navigateTo);
    navigation.navigate(navigateTo as never);
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>{title}</Text>
        <Text style={styles.text}>{counts}</Text>
      </View>

      <View style={styles.content}>
        {icon}
        <Pressable onPress={handleNavigation}>
          <ArrowRightIcon color='' />
        </Pressable>
      </View>
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
});
