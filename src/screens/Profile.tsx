import { HeaderText, LayoutView, View } from '@components';
import { lightTheme } from '@constants/Colors';
import { SafeAreaView, Text, StyleSheet, FlatList } from 'react-native';

export default function Profile(): JSX.Element {
  return (
    <LayoutView>
      <View style={styles.container}>
         
       
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
    justifyContent: 'center',
    alignItems: 'center',
  },
 

});
