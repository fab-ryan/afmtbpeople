import { HeaderText, LayoutView, View } from '@components';
import { lightTheme } from '@constants/Colors';
import { SafeAreaView, Text, StyleSheet, FlatList } from 'react-native';
import { dummyData } from '@utils';
import HomeCard from '@components/HomeCard';

export default function Home() {
  return (
    <LayoutView>
      <View style={styles.container}>
        <HeaderText accessible={true}
          accessibilityRole='header'
          accessibilityValue={{
            text: 'Welcome',
            now: 1,
          }}
          accessibilityHint='Welcome'
        
        >Welcome </HeaderText>
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
