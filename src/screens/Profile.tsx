import { Button, HeaderText, LayoutView, View } from '@components';
import { lightTheme } from '@constants/Colors';
import { SafeAreaView, Text, StyleSheet, FlatList } from 'react-native';
import { StackScreenProps } from '@utils/types';
import { useActions } from '@hooks';
import { useNavigation } from '@react-navigation/native';

export default function Profile(): JSX.Element {
  const { removeAuthUser } = useActions();
  const navigation = useNavigation<StackScreenProps>();
  const handleLogout = () => {
    removeAuthUser();
    navigation.navigate('Login');
  };
  return (
    <LayoutView>
      <View style={styles.container}>
        <HeaderText style={{ textAlign: 'center' }}>Profile</HeaderText>
        <View style={styles.content}>
          <View style={styles.avatarContainer}>
            <Text>Avatar</Text>
          </View>
          {/* <FlatList
            data={[{ title: 'Name', value: 'John Doe' }]}
            renderItem={({ item }) => (
              <View>
                <Text>{item.title}</Text>
                <Text>{item.value}</Text>
              </View>
            )}
            keyExtractor={(item) => item.title}
          /> */}
          <Button title="Logout" onPress={handleLogout} />
        </View>
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
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  avatarContainer: {},
});
