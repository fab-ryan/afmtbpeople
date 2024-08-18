import { Button, HeaderText, LayoutView, View, Loader } from '@components';
import { lightTheme } from '@constants/Colors';
import { SafeAreaView, Text, StyleSheet, FlatList } from 'react-native';
import { StackScreenProps } from '@utils/types';
import { useActions } from '@hooks';
import { useNavigation } from '@react-navigation/native';
import { removeToken } from '@utils';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { useUserInfoQuery } from '@redux';
import { useEffect } from 'react';
import { useSelector } from '@hooks';
import Voice from '@react-native-voice/voice'; // Import Voice for speech recognition
import Tts from 'react-native-tts';

export default function Profile(): JSX.Element {
  const { removeAuthUser } = useActions();
  const { data, isLoading, isError } = useUserInfoQuery(null);
  const { isLogged } = useSelector((state) => state.userInfo);
  const navigation = useNavigation<StackScreenProps>();

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechResults = onSpeechResults;

    speakProfileDetails();

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStart = () => {
    console.log('Speech has started');
  };

  const onSpeechEnd = () => {
    console.log('Speech has ended');
  };

  const onSpeechResults = (result:any) => {};

  const startListening = async () => {
    try {
      await Voice.start('en-US');
    } catch (e) {
      console.error('Error starting voice recognition:', e);
    }
  };

  const stopListening = async () => {
    try {
      await Voice.stop();
    } catch (e) {
      console.error('Error stopping voice recognition:', e);
    }
  };

  const speak = (text:string) => {
    Tts.speak(text);
  };


  const speakProfileDetails = () => {
    const { first_name, last_name, email, phone, account, status } = data?.data || {};

    const profileDetails = [
      `Name: ${first_name} ${last_name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Account Type: Personal`,
      `Account Number: ${account?.account_number}`,
      `Balance: ${amountFormat(account?.balance)}`,
      `Currency: RWF`,
      `Status: ${status}`,
      `Date Created: ${formatDate(account?.createdAt)}`,
    ];

    profileDetails.forEach(detail => speak(detail));
  };

  const amountFormat = (amount: string | undefined) => {
    return Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'FWR',
    }).format(Number(amount) ?? 0);
  };

  const formatDate = (data: string | undefined) => {
    return new Date(data as string).toDateString();
  };
  const getFirstLetter = (name: string) => {
    return name?.charAt(0) ?? 'S';
  };
  useEffect(() => {
    if (isError) {
      removeAuthUser();
      navigation.navigate('Login');
    }
  }, [isError]);
  const handleLogout = async () => {
    await removeToken();
    removeAuthUser();
    navigation.navigate('Login');
  };
  return (
    <LayoutView>
      <View style={styles.container}>
        <HeaderText
          style={{ textAlign: 'center' }}
          accessible={true}
          accessibilityRole='header'
          accessibilityLabel='Profile Information Header'
        >
          Profile Information
        </HeaderText>
        <View style={styles.content}>
          <View style={styles.avatarInfoContainer}>
            <View
              style={styles.avatarContainer}
              accessible={true}
              accessibilityRole='image'
              accessibilityLabel='User Avatar'
            >
              <Text
                style={styles.avatarImage}
                accessible={true}
                accessibilityLabel={`User Initial ${getFirstLetter(
                  data?.data?.last_name as string,
                )}`}
              >
                {getFirstLetter(data?.data?.last_name as string)}
              </Text>
            </View>

            <View style={styles.userInfo}>
              <UserInfoItem
                title='Name'
                value={
                  ((data?.data?.first_name as string) +
                    ' ' +
                    data?.data?.last_name) as string
                }
                accessible={true}
                accessibilityLabel='User Name'
              />
              <View style={{ marginTop: 10 }} />
              <UserInfoItem
                title='Email'
                value={data?.data?.email as string}
                accessible={true}
                accessibilityLabel='User Email'
              />
              <View style={{ marginTop: 10 }} />
              <UserInfoItem
                title='Phone'
                value={data?.data?.phone as string}
                accessible={true}
                accessibilityLabel='User Phone Number'
              />
              <View style={{ marginTop: 10 }} />
            </View>
          </View>
          <View style={{ marginTop: 20 }} />
          <HeaderText
            style={{ textAlign: 'center' }}
            accessibilityRole='header'
            accessibilityLabel='Account Information Header'
            accessible={false}
          >
            Account Information
          </HeaderText>
          <View
            style={{
              width: '100%',
              borderBottomWidth: 0.8,
              borderBottomColor: lightTheme.text,
            }}
          />

          <UserInfoItem
            title='Account Type'
            value='Personal'
          />
          <UserInfoItem
            title='Account Number'
            value={data?.data?.account?.account_number as string}
            accessible={true}
            accessibilityLabel={`Account Number: ${
              data?.data?.account?.account_number as string
            }`}
          />
          <UserInfoItem
            title='Balance'
            value={amountFormat(data?.data?.account?.balance) as string}
            accessible={true}
            accessibilityLabel={`Account Balance: ${amountFormat(
              data?.data?.account?.balance,
            )}`}
          />
          <UserInfoItem
            title='Currency'
            value='RWF'
            accessible={true}
            accessibilityLabel='Currency: RWF'
          />
          <UserInfoItem
            title='Status'
            value={data?.data?.status as string}
            accessible={true}
            accessibilityLabel={`Account Status: ${
              data?.data?.status as string
            }`}
          />
          <UserInfoItem
            title='Date Created'
            value={formatDate(data?.data?.account?.createdAt) as string}
            accessible={true}
            accessibilityLabel={`Account Creation Date: ${formatDate(
              data?.data?.account?.createdAt,
            )}`}
          />
          <View style={{ marginTop: 20 }} />
          <Button
            title='Logout'
            onPress={handleLogout}
            accessible={true}
            accessibilityRole='button'
            accessibilityLabel='Logout Button'
          />
          <Button
            title='Stop Listening'
            onPress={stopListening}
            accessible={true}
            accessibilityRole='button'
            accessibilityLabel='Stop Voice Recognition'
          />
          <Button
            title='Speak'
            onPress={() => speak('This is your profile information.')}
            accessible={true}
            accessibilityRole='button'
            accessibilityLabel='Text to Speech Button'
          />
        </View>
      </View>
    </LayoutView>
  );
}

const CardMenu = () => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardContent}>
        <View style={styles.cardLeftContent}>
          <View style={styles.cardIcon}>
            <MaterialIcon
              name='arrow-forward-ios'
              size={30}
              color={lightTheme.text}
            />
          </View>
          <Text
            style={{
              color: lightTheme.text,
              fontSize: 17,
              marginLeft: 10,
              marginRight: 10,
            }}
          >
            Name
          </Text>
        </View>
      </View>
    </View>
  );
};

const UserInfoItem = ({
  title,
  value,
  accessible,
  accessibilityLabel,
}: {
  title: string;
  value: string;
  accessible?: boolean;
  accessibilityLabel?: string;
}) => (
  <View
    style={styles.infoContainer}
    accessible={accessible}
    accessibilityLabel={accessibilityLabel}
  >
    <Text
      style={{
        color: lightTheme.text,
        fontSize: 17,
        fontWeight: '600',
      }}
    >
      {title}:
    </Text>
    <Text
      style={{
        color: lightTheme.text,
        fontSize: 17,
        marginLeft: 10,
        marginRight: 10,
      }}
    >
      {value}
    </Text>
  </View>
);

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
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  avatarInfoContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
    width: '100%',
    borderRadius: 20,
  },
  avatarContainer: {
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: lightTheme.background,
    shadowColor: lightTheme.text,
    shadowOffset: {
      width: 1,
      height: 3,
    },
    shadowOpacity: 1.02,
    shadowRadius: 5.27,
    elevation: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarImage: {
    fontSize: 30,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: lightTheme.text,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
  },
  userInfo: {
    marginLeft: 20,
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  cardContainer: {
    width: '100%',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
    shadowColor: lightTheme.text,
    shadowOffset: {
      width: 1,
      height: 3,
    },
    shadowOpacity: 1.02,
    shadowRadius: 5.27,
    elevation: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardLeftContent: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  cardIcon: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: lightTheme.primary,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
