import { Button, HeaderText, LayoutView, View ,Loader} from '@components';
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


export default function Profile(): JSX.Element {
  const { removeAuthUser } = useActions();
  const { data, isLoading, isError,  } = useUserInfoQuery(null);
  const {isLogged} = useSelector((state) => state.userInfo);
    const navigation = useNavigation<StackScreenProps>();


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
    navigation.navigate('Login');
  };
  return (
    <LayoutView>
    {isLogged &&  <Loader loading={isLogged}/> }
      <View style={styles.container}>
        <HeaderText style={{ textAlign: 'center' }}>
          Profile Information
        </HeaderText>
        <View style={styles.content}>
          <View style={styles.avatarInfoContainer}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarImage}>
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
              />
              <View style={{ marginTop: 10 }} />
              <UserInfoItem
                title='Email'
                value={data?.data?.email as string}
              />
              <View style={{ marginTop: 10 }} />
              <UserInfoItem
                title='Phone'
                value={data?.data?.phone as string}
              />
              <View style={{ marginTop: 10 }} />
            </View>
          </View>
          <View style={{ marginTop: 20 }} />
          <HeaderText style={{ textAlign: 'center' }}>
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
          />
          <UserInfoItem
            title='Balance'
            value={amountFormat(data?.data?.account?.balance) as string}
          />
          <UserInfoItem
            title='Currency'
            value='RWF'
          />
          <UserInfoItem
            title='Status'
            value={data?.data?.status as string}
          />
          <UserInfoItem
            title='Date Created'
            value={formatDate(data?.data?.account?.createdAt) as string}
          />
          <View style={{ marginTop: 20 }} />
          <Button
            title='Logout'
            onPress={handleLogout}
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

const UserInfoItem = ({ title, value }: { title: string; value: string }) => (
  <View style={styles.infoContainer}>
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
